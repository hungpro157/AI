(() => {
  "use strict";

  const config = PROFILE_CONFIG;
  const $ = selector => document.querySelector(selector);

  function render() {
    const { profile, background, theme } = config;
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--bg", theme.background);
    document.title = `${profile.name} — Profile`;
    document.querySelector('meta[name="theme-color"]').content = theme.background;

    $("#name").textContent = profile.name;
    $("#username").textContent = profile.username;
    $("#bio").textContent = profile.bio;
    $("#quote").textContent = `“${profile.quote}”`;
    $("#eyebrow").textContent = profile.eyebrow;
    $("#introTitle").textContent = profile.introText;
    $("#introLogo").textContent = profile.name.trim().charAt(0).toUpperCase();
    $("#footerName").textContent = profile.name;
    $("#year").textContent = new Date().getFullYear();
    $("#avatar").src = profile.avatar;
    $("#avatar").alt = `Ảnh đại diện của ${profile.name}`;
    $("#contact").href = `mailto:${profile.email}`;
    $("#backgroundImage").style.backgroundImage = `url("${background.image}")`;

    if (background.video) {
      const video = $("#backgroundVideo");
      video.src = background.video;
      video.style.display = "block";
      $("#backgroundImage").style.opacity = ".2";
    }

    $("#socials").innerHTML = config.socials.map(item => `
      <a class="social-link" href="${item.url}" target="_blank" rel="noreferrer" aria-label="${item.name}" title="${item.name}">
        <i data-lucide="${item.icon}"></i>
      </a>
    `).join("");

    const musicConfig = config.music || {};
    if (musicConfig.file) $("#backgroundMusic").src = musicConfig.file;
    if (!musicConfig.youtubeId && !musicConfig.file) {
      $("#musicPlayer").classList.add("is-disabled");
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function setupIntroAndMusic() {
    const intro = $("#intro");
    const localMusic = $("#backgroundMusic");
    const button = $("#soundButton");
    const player = $("#musicPlayer");
    const volume = $("#volumeSlider");
    const volumeValue = $("#volumeValue");
    const musicConfig = config.music || {};
    const hasYouTube = Boolean(musicConfig.youtubeId);
    const hasLocalFile = Boolean(musicConfig.file);
    let youtubePlayer = null;
    let youtubeReady = false;
    let wantsToPlay = false;
    let playing = false;
    let audioContext = null;
    let analyser = null;
    let frequencyData = null;
    let visualFrame = 0;
    const equalizerBars = [...document.querySelectorAll(".equalizer span")];

    const bpm = Math.max(1, Number(musicConfig.bpm ?? 135));
    const beatDuration = 60 / bpm;
    const barDuration = beatDuration * 4;
    document.documentElement.style.setProperty("--beat-duration", `${beatDuration}s`);
    document.documentElement.style.setProperty("--bar-duration", `${barDuration}s`);

    const syncVisualPhase = () => {
      let currentTime = 0;
      if (hasYouTube && youtubeReady && youtubePlayer?.getCurrentTime) currentTime = youtubePlayer.getCurrentTime() || 0;
      else if (hasLocalFile) currentTime = localMusic.currentTime || 0;
      document.documentElement.style.setProperty("--beat-offset", `${-(currentTime % barDuration)}s`);
    };

    const averageRange = (data, start, end) => {
      let total = 0;
      const safeEnd = Math.min(end, data.length);
      for (let index = start; index < safeEnd; index += 1) total += data[index];
      return total / Math.max(1, safeEnd - start);
    };

    const renderAudioVisuals = () => {
      if (!playing || !analyser || !frequencyData) return;
      analyser.getByteFrequencyData(frequencyData);

      const ranges = [[1, 5], [5, 12], [12, 24], [24, 45], [45, 80]];
      ranges.forEach((range, index) => {
        const energy = averageRange(frequencyData, range[0], range[1]) / 255;
        equalizerBars[index].style.transform = `scaleY(${.18 + energy * .92})`;
      });

      const bass = averageRange(frequencyData, 1, 12) / 255;
      const overall = averageRange(frequencyData, 2, 70) / 255;
      const ring = $(".avatar-ring");
      const glow = $(".background__glow");
      ring.style.transform = `scale(${1 + bass * .065})`;
      ring.style.opacity = `${.52 + bass * .42}`;
      glow.style.transform = `translate(-50%, -50%) scale(${1 + bass * .16})`;
      glow.style.opacity = `${.55 + overall * .45}`;
      document.documentElement.style.setProperty("--audio-glow", `${22 + bass * 46}px`);
      visualFrame = requestAnimationFrame(renderAudioVisuals);
    };

    const startAudioVisuals = () => {
      cancelAnimationFrame(visualFrame);
      visualFrame = requestAnimationFrame(renderAudioVisuals);
    };

    const stopAudioVisuals = () => {
      cancelAnimationFrame(visualFrame);
      equalizerBars.forEach(bar => { bar.style.transform = "scaleY(.25)"; });
      $(".avatar-ring").style.transform = "";
      $(".avatar-ring").style.opacity = "";
      $(".background__glow").style.transform = "";
      $(".background__glow").style.opacity = "";
    };

    const initializeAudioAnalyzer = async () => {
      if (!hasLocalFile) return;
      if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioContext = new AudioContextClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.minDecibels = -85;
        analyser.maxDecibels = -18;
        analyser.smoothingTimeConstant = .82;
        const source = audioContext.createMediaElementSource(localMusic);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
        document.body.classList.add("audio-reactive");
      }
      if (audioContext.state === "suspended") await audioContext.resume();
    };

    const updateIcon = () => {
      button.innerHTML = `<i data-lucide="${playing ? "pause" : "play"}"></i>`;
      button.setAttribute("aria-label", playing ? "Tạm dừng nhạc" : "Phát nhạc");
      player.classList.toggle("is-playing", playing);
      document.body.classList.toggle("music-playing", playing);
      if (window.lucide) window.lucide.createIcons();
    };

    const initialVolume = Math.min(1, Math.max(0, Number(musicConfig.defaultVolume ?? .5)));
    localMusic.volume = initialVolume;
    volume.value = initialVolume;
    const updateVolume = () => {
      const value = Number(volume.value);
      localMusic.volume = value;
      if (youtubeReady && youtubePlayer) youtubePlayer.setVolume(Math.round(value * 100));
      volumeValue.textContent = `${Math.round(value * 100)}%`;
      volume.style.setProperty("--volume", `${value * 100}%`);
    };
    updateVolume();
    volume.addEventListener("input", updateVolume);

    const playMusic = async () => {
      wantsToPlay = true;
      if (hasYouTube) {
        if (youtubeReady && youtubePlayer) youtubePlayer.playVideo();
        return;
      }
      if (hasLocalFile) {
        try {
          await initializeAudioAnalyzer();
          await localMusic.play();
        } catch (_) { wantsToPlay = false; }
      }
    };

    const pauseMusic = () => {
      wantsToPlay = false;
      if (hasYouTube && youtubeReady && youtubePlayer) youtubePlayer.pauseVideo();
      if (hasLocalFile) localMusic.pause();
    };

    if (hasYouTube) {
      intro.disabled = true;
      $("#introTitle").textContent = "Đang tải nhạc...";

      window.onYouTubeIframeAPIReady = () => {
        youtubePlayer = new window.YT.Player("youtubePlayer", {
          width: "200",
          height: "200",
          videoId: musicConfig.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: musicConfig.youtubeId,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: event => {
              youtubeReady = true;
              event.target.setVolume(Math.round(Number(volume.value) * 100));
              intro.disabled = false;
              $("#introTitle").textContent = config.profile.introText;
              if (wantsToPlay) event.target.playVideo();
            },
            onStateChange: event => {
              const state = window.YT.PlayerState;
              playing = event.data === state.PLAYING;
              if (playing) syncVisualPhase();
              if (event.data === state.ENDED) wantsToPlay = false;
              updateIcon();
            },
            onError: () => {
              playing = false;
              wantsToPlay = false;
              player.classList.add("has-error");
              intro.disabled = false;
              $("#introTitle").textContent = config.profile.introText;
              updateIcon();
            },
          },
        });
      };
      const apiScript = document.createElement("script");
      apiScript.src = "https://www.youtube.com/iframe_api";
      apiScript.async = true;
      document.head.appendChild(apiScript);

      window.setTimeout(() => {
        if (!youtubeReady) {
          intro.disabled = false;
          $("#introTitle").textContent = config.profile.introText;
          player.classList.add("has-error");
        }
      }, 10000);
    }

    intro.addEventListener("click", async () => {
      intro.classList.add("is-hidden");
      $("#profile").classList.add("is-visible");
      await playMusic();
      updateIcon();
    }, { once: true });

    button.addEventListener("click", async () => {
      if (!hasYouTube && !hasLocalFile) return;
      if (playing || wantsToPlay) pauseMusic(); else await playMusic();
      updateIcon();
    });

    localMusic.addEventListener("play", () => { playing = true; syncVisualPhase(); updateIcon(); startAudioVisuals(); });
    localMusic.addEventListener("pause", () => { playing = false; updateIcon(); stopAudioVisuals(); });
  }

  function setupTypewriter() {
    const target = $("#typedText");
    const texts = config.typingTexts.filter(Boolean);
    const timing = config.typingAnimation || {};
    const typeSpeed = Number(timing.typeSpeed ?? 115);
    const deleteSpeed = Number(timing.deleteSpeed ?? 75);
    const pauseAfterText = Number(timing.pauseAfterText ?? 3500);
    const pauseBetweenTexts = Number(timing.pauseBetweenTexts ?? 900);
    if (!texts.length) return;
    let line = 0;
    let letter = 0;
    let deleting = false;

    const tick = () => {
      const text = texts[line];
      letter += deleting ? -1 : 1;
      target.textContent = text.slice(0, letter);

      let delay = deleting ? deleteSpeed : typeSpeed;
      if (!deleting && letter === text.length) { deleting = true; delay = pauseAfterText; }
      if (deleting && letter === 0) { deleting = false; line = (line + 1) % texts.length; delay = pauseBetweenTexts; }
      window.setTimeout(tick, delay);
    };
    window.setTimeout(tick, 900);
  }

  function setupOceanEffects() {
    const bubbleLayer = $("#bubbles");
    const bubbleCount = window.innerWidth < 600 ? 12 : 22;
    bubbleLayer.innerHTML = Array.from({ length: bubbleCount }, (_, index) => {
      const size = 5 + Math.random() * 28;
      const left = Math.random() * 100;
      const duration = 9 + Math.random() * 12;
      const delay = -(Math.random() * duration);
      const drift = -45 + Math.random() * 90;
      return `<span class="bubble" style="--size:${size.toFixed(1)}px;--left:${left.toFixed(1)}%;--duration:${duration.toFixed(1)}s;--delay:${delay.toFixed(1)}s;--drift:${drift.toFixed(0)}px"></span>`;
    }).join("");

    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = $(".profile__card");
    const glow = $("#cursorGlow");
    const background = $("#backgroundImage");
    document.body.classList.add("has-pointer");

    window.addEventListener("pointermove", event => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      glow.style.transform = `translate(${event.clientX - 120}px, ${event.clientY - 120}px)`;
      card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg) translate3d(0, 0, 0)`;
      background.style.transform = `scale(1.08) translate3d(${-x * 10}px, ${-y * 10}px, 0)`;
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
      card.style.transform = "";
      glow.style.opacity = "0";
    });
    document.documentElement.addEventListener("mouseenter", () => { glow.style.opacity = ""; });
  }

  render();
  setupIntroAndMusic();
  setupTypewriter();
  setupOceanEffects();
})();
