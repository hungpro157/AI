(() => {
  "use strict";

  const config = PROFILE_CONFIG;
  const $ = selector => document.querySelector(selector);
  const BRAND_ICON_PATHS = {
    facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
    tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  };
  const brandIcon = name => {
    const path = BRAND_ICON_PATHS[String(name || "").toLowerCase()];
    return path
      ? `<svg class="brand-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${path}"></path></svg>`
      : `<i data-lucide="link"></i>`;
  };
  const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";
  let diveStartedAt = 0;

  function render() {
    const { profile, background, theme } = config;
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--bg", theme.background);
    document.title = `${config.brand?.name || "PROFILE"} // ${profile.name}`;
    document.querySelector('meta[name="theme-color"]').content = theme.background;

    $("#name").textContent = profile.name;
    $("#username").textContent = profile.username;
    $("#bio").textContent = profile.bio;
    const quoteElement = $("#quote");
    if (quoteElement) quoteElement.textContent = `“${profile.quote}”`;
    $("#eyebrow").textContent = profile.eyebrow;
    $("#introTitle").textContent = profile.introText;
    $("#introLogo").textContent = config.brand?.mark || profile.name.trim().charAt(0).toUpperCase();
    const brandMark = $("#brandMark");
    const brandName = $("#brandName");
    const brandVersion = $("#brandVersion");
    if (brandMark) brandMark.textContent = config.brand?.mark || "NH//";
    if (brandName) brandName.textContent = config.brand?.name || profile.name;
    if (brandVersion) brandVersion.textContent = config.brand?.version || "ONLINE";
    $("#footerName").textContent = profile.name;
    $("#year").textContent = new Date().getFullYear();
    $("#avatar").src = profile.avatar;
    $("#avatar").alt = `Ảnh đại diện của ${profile.name}`;
    const contactElement = $("#contact");
    if (contactElement) contactElement.href = `mailto:${profile.email}`;
    $("#backgroundImage").style.backgroundImage = `url("${background.image}")`;

    if (background.video) {
      const video = $("#backgroundVideo");
      video.src = background.video;
      video.style.display = "block";
      video.addEventListener("loadeddata", () => {
        document.body.classList.add("video-background-active");
        $("#backgroundImage").style.opacity = "0";
        void video.play().catch(() => {});
      }, { once: true });
      video.addEventListener("error", () => {
        document.body.classList.remove("video-background-active");
        video.style.display = "none";
        $("#backgroundImage").style.opacity = ".7";
        console.warn(`Không thể phát video nền: ${background.video}`);
      }, { once: true });
      video.load();
    }

    const portfolio = config.portfolio || {};
    $("#portfolioLabel").textContent = portfolio.label || "CONNECTED";
    $("#portfolioTitle").textContent = portfolio.title || "";
    $("#portfolioIntro").textContent = portfolio.intro || "";
    $("#portfolioStatus").textContent = portfolio.status || "";
    $("#interests").innerHTML = (portfolio.vibes || []).map(interest =>
      `<button class="interest interactive-chip" type="button" aria-pressed="false">${interest}</button>`
    ).join("");
    $("#projects").innerHTML = (portfolio.games || []).map(project => `
      <button class="project-card" type="button" aria-pressed="false">
        <span class="project-card__icon"><i data-lucide="${project.icon || "sparkles"}"></i></span>
        <span class="project-card__content">
          <span class="project-card__meta">
            <span>${project.code || "MISSION"}</span>
            <span class="project-card__state">${project.state || "ACTIVE"}</span>
          </span>
          <h4>${project.title}</h4>
          <p>${project.description}</p>
          <span class="project-card__action">
            <span>CHẠM ĐỂ TƯƠNG TÁC</span>
            <i data-lucide="arrow-up-right"></i>
          </span>
        </span>
      </button>
    `).join("");

    const socialByName = new Map((config.socials || []).map(item => [item.name.toLowerCase(), item]));
    $("#socialActivity").innerHTML = (portfolio.socialActivity || []).map(activity => {
      const social = socialByName.get(activity.name.toLowerCase()) || {};
      return `
        <a class="social-activity__item" href="${activity.url || social.url || "#"}" target="_blank" rel="noreferrer"
          style="--network-color: ${activity.color || "#d8b4fe"}"
          aria-label="${activity.name}: ${activity.label || "Xem hoạt động"}"
          title="${activity.label || activity.name}">
          <span class="social-activity__icon">
            <span class="social-activity__app-icon">${brandIcon(activity.name)}</span>
            <span class="social-activity__presence" aria-label="Đã kết nối"></span>
          </span>
          <strong>${activity.name}</strong>
          <small>ACTIVE</small>
        </a>
      `;
    }).join("");

    const musicConfig = config.music || {};
    const configuredTracks = musicConfig.playlist || [];
    const legacyTrack = musicConfig.file || musicConfig.soundcloudUrl ? [musicConfig] : [];
    if (![...configuredTracks, ...legacyTrack].length) {
      $("#musicPlayer").classList.add("is-disabled");
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function setupDiscordAvatar() {
    const discord = config.profile?.discord;
    const userId = String(discord?.userId || "").trim();
    if (!discord?.syncAvatar || !/^\d{17,20}$/.test(userId)) return;

    const fallbackAvatar = config.profile.avatar || "assets/avatar.jpg";
    const refreshInterval = Math.max(30000, Number(discord.refreshInterval) || 60000);
    let refreshTimer;

    const applyAvatar = source => {
      const profileAvatar = $("#avatar");
      if (profileAvatar) profileAvatar.src = source;
    };

    const statusLabels = {
      online: "ONLINE",
      idle: "IDLE",
      dnd: "DO NOT DISTURB",
      offline: "OFFLINE",
    };

    const applyPresence = data => {
      const user = data.discord_user;
      const status = data.discord_status || "offline";
      const statusElement = $("#presenceStatus");
      const statusText = $("#presenceStatusText");
      const username = $("#username");
      const activityLabel = $("#presenceActivityLabel");
      const activityText = $("#presenceActivity");
      const activityIcon = document.querySelector(".presence-activity__icon");
      const onlineDot = document.querySelector(".avatar-wrap .online");

      if (statusElement) statusElement.dataset.status = status;
      if (statusText) statusText.textContent = statusLabels[status] || status.toUpperCase();
      if (username && user?.username) username.textContent = `@${user.username}`;
      if (onlineDot) {
        onlineDot.title = statusLabels[status] || status;
        onlineDot.style.background = status === "online" ? "#55e69b"
          : status === "idle" ? "#f4bd55"
          : status === "dnd" ? "#f06070" : "#858b91";
      }

      const customStatus = (data.activities || []).find(activity => activity.type === 4);
      const richActivity = (data.activities || []).find(activity => activity.type !== 4);
      let label = "CURRENT VIBE";
      let text = customStatus?.state || config.profile.bio;
      let icon = "sparkles";

      if (data.listening_to_spotify && data.spotify) {
        label = "LISTENING TO SPOTIFY";
        text = `${data.spotify.song} — ${data.spotify.artist}`;
        icon = "music-2";
      } else if (richActivity) {
        label = richActivity.type === 0 ? "NOW PLAYING / ACTIVE" : "DISCORD ACTIVITY";
        text = [richActivity.name, richActivity.details, richActivity.state].filter(Boolean).join(" · ");
        icon = richActivity.name?.toLowerCase().includes("visual studio") ? "code-2" : "gamepad-2";
      } else if (status === "offline") {
        label = "LAST SIGNAL";
        text = "Hiện đang offline — để lại một tin nhắn nhé.";
        icon = "moon";
      }

      if (activityLabel) activityLabel.textContent = label;
      if (activityText) {
        activityText.textContent = text;
        activityText.title = text;
      }
      if (activityIcon) activityIcon.innerHTML = `<i data-lucide="${icon}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    };

    const defaultAvatarUrl = user => {
      const discriminator = Number(user.discriminator || 0);
      const index = discriminator
        ? discriminator % 5
        : Number((BigInt(user.id) >> 22n) % 6n);
      return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    };

    const avatarUrl = user => {
      if (!user?.avatar) return defaultAvatarUrl(user);
      const animated = String(user.avatar).startsWith("a_");
      const extension = animated ? "gif" : "webp";
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
    };

    const syncAvatar = async () => {
      window.clearTimeout(refreshTimer);
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Discord profile request failed: ${response.status}`);
        const payload = await response.json();
        const user = payload?.data?.discord_user;
        if (!payload?.success || !user) throw new Error("Discord profile is unavailable");
        applyAvatar(avatarUrl(user));
        applyPresence(payload.data);
      } catch (error) {
        applyAvatar(fallbackAvatar);
        const statusElement = $("#presenceStatus");
        if (statusElement) statusElement.dataset.status = "offline";
        const statusText = $("#presenceStatusText");
        if (statusText) statusText.textContent = "OFFLINE";
        const activityLabel = $("#presenceActivityLabel");
        if (activityLabel) activityLabel.textContent = "PROFILE MODE";
        const activityText = $("#presenceActivity");
        if (activityText) activityText.textContent = config.profile.bio;
        console.warn("Không thể đồng bộ avatar Discord, đang dùng ảnh dự phòng.", error);
      } finally {
        refreshTimer = window.setTimeout(syncAvatar, refreshInterval);
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) void syncAvatar();
    });
    void syncAvatar();
  }

  function setupThemeSwitcher() {
    const button = $("#themeButton");
    if (!button) return;
    const colors = [...new Set([config.theme.primary, ...(config.theme.colors || [])])];
    let savedColor = "";
    try { savedColor = localStorage.getItem("profile-theme-color") || ""; } catch (_) {}
    let activeIndex = Math.max(0, colors.indexOf(savedColor));

    const applyColor = color => {
      document.documentElement.style.setProperty("--primary", color);
      button.style.setProperty("--theme-preview", color);
      button.setAttribute("aria-label", `Đổi màu giao diện. Màu hiện tại ${color}`);
      try { localStorage.setItem("profile-theme-color", color); } catch (_) {}
    };

    applyColor(colors[activeIndex]);
    button.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % colors.length;
      applyColor(colors[activeIndex]);
    });
  }

  function setupDiveMode() {
    const button = $("#diveButton");
    if (!button) return;
    const label = button.querySelector("span");
    const hud = $("#diveHud");

    const setDiveMode = enabled => {
      document.body.classList.toggle("dive-mode", enabled);
      diveStartedAt = enabled ? Date.now() : 0;
      button.setAttribute("aria-pressed", String(enabled));
      button.setAttribute("aria-label", enabled ? "Tắt Focus Mode" : "Bật Focus Mode");
      hud.setAttribute("aria-hidden", String(!enabled));
      label.textContent = enabled ? "EXIT" : "FOCUS";
    };

    button.addEventListener("click", () => {
      setDiveMode(!document.body.classList.contains("dive-mode"));
    });
    window.addEventListener("keydown", event => {
      if (event.key === "Escape" && document.body.classList.contains("dive-mode")) setDiveMode(false);
      if (
        event.key.toLowerCase() === "d" &&
        !event.repeat &&
        !event.target.closest("input, textarea, select, button") &&
        $("#intro").classList.contains("is-hidden")
      ) setDiveMode(!document.body.classList.contains("dive-mode"));
    });
  }

  function setupHolidayCountdown() {
    const lunarHolidays = [
      ["2026-02-17", "Tết Nguyên Đán", 5], ["2026-04-26", "Giỗ Tổ Hùng Vương", 1],
      ["2027-02-06", "Tết Nguyên Đán", 5], ["2027-04-16", "Giỗ Tổ Hùng Vương", 1],
      ["2028-01-26", "Tết Nguyên Đán", 5], ["2028-04-04", "Giỗ Tổ Hùng Vương", 1],
      ["2029-02-13", "Tết Nguyên Đán", 5], ["2029-04-23", "Giỗ Tổ Hùng Vương", 1],
      ["2030-02-03", "Tết Nguyên Đán", 5], ["2030-04-12", "Giỗ Tổ Hùng Vương", 1],
    ];
    const vietnamYear = Number(new Intl.DateTimeFormat("en", { timeZone: VIETNAM_TIME_ZONE, year: "numeric" }).format(new Date()));
    const holidays = [];
    const addHoliday = (date, name, duration = 1) => {
      const start = new Date(`${date}T00:00:00+07:00`);
      holidays.push({ name, start, end: new Date(start.getTime() + duration * 86400000) });
    };

    for (let year = vietnamYear - 1; year <= vietnamYear + 8; year += 1) {
      addHoliday(`${year}-01-01`, "Tết Dương lịch");
      addHoliday(`${year}-04-30`, "Ngày Thống nhất đất nước");
      addHoliday(`${year}-05-01`, "Ngày Quốc tế Lao động");
      addHoliday(`${year}-09-02`, "Quốc khánh Việt Nam");
    }
    lunarHolidays.forEach(([date, name, duration]) => addHoliday(date, name, duration));
    holidays.sort((a, b) => a.start - b.start);

    const elements = {
      name: $("#holidayName"), date: $("#holidayDate"), days: $("#holidayDays"),
      hours: $("#holidayHours"), minutes: $("#holidayMinutes"), seconds: $("#holidaySeconds"),
      diveClock: $("#diveClock"), diveSession: $("#diveSession"), diveHoliday: $("#diveHoliday"),
      profileClock: $("#profileClock"), profileDate: $("#profileDate"),
      profileEvent: $("#profileEvent"), profileEventCountdown: $("#profileEventCountdown"),
    };
    const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
      timeZone: VIETNAM_TIME_ZONE, weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
    });
    const profileDateFormatter = new Intl.DateTimeFormat("vi-VN", {
      timeZone: VIETNAM_TIME_ZONE, weekday: "short", day: "2-digit", month: "2-digit",
    });
    const clockFormatter = new Intl.DateTimeFormat("vi-VN", {
      timeZone: VIETNAM_TIME_ZONE, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const pad = value => String(value).padStart(2, "0");

    const update = () => {
      const now = new Date();
      const holiday = holidays.find(item => item.end > now) || holidays[holidays.length - 1];
      const remaining = Math.max(0, holiday.start - now);
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      const isActive = holiday.start <= now && holiday.end > now;

      elements.name.textContent = holiday.name;
      elements.date.textContent = isActive ? "Đang diễn ra hôm nay" : dateFormatter.format(holiday.start);
      elements.days.textContent = isActive ? "00" : pad(days);
      elements.hours.textContent = isActive ? "00" : pad(hours);
      elements.minutes.textContent = isActive ? "00" : pad(minutes);
      elements.seconds.textContent = isActive ? "00" : pad(seconds);
      elements.diveClock.textContent = `ICT // ${clockFormatter.format(now)}`;
      elements.diveHoliday.textContent = isActive
        ? `NEXT EVENT // ${holiday.name.toUpperCase()} // NOW`
        : `NEXT EVENT // ${holiday.name.toUpperCase()} // ${days}D ${pad(hours)}H`;
      elements.profileClock.textContent = clockFormatter.format(now).slice(0, 5);
      elements.profileDate.textContent = profileDateFormatter.format(now);
      elements.profileEvent.textContent = holiday.name;
      elements.profileEvent.title = holiday.name;
      elements.profileEventCountdown.textContent = isActive
        ? "ĐANG DIỄN RA"
        : `CÒN ${days} NGÀY ${pad(hours)} GIỜ`;

      if (diveStartedAt) {
        const sessionSeconds = Math.floor((Date.now() - diveStartedAt) / 1000);
        elements.diveSession.textContent = `SESSION // ${pad(Math.floor(sessionSeconds / 60))}:${pad(sessionSeconds % 60)}`;
      } else {
        elements.diveSession.textContent = "SESSION // STANDBY";
      }
    };

    update();
    window.setInterval(update, 1000);
  }

  function setupIntroAndMusic() {
    const intro = $("#intro");
    const localMusic = $("#backgroundMusic");
    const button = $("#soundButton");
    const player = $("#musicPlayer");
    const playerToggle = $("#playerToggle");
    const previousTrackButton = $("#previousTrack");
    const nextTrackButton = $("#nextTrack");
    const trackTitle = $("#trackTitle");
    const trackArtist = $("#trackArtist");
    const trackSource = $("#trackSource");
    const soundcloudCard = $("#soundcloudCard");
    const soundcloudStatus = $("#soundcloudStatus");
    const soundcloudOpen = $("#soundcloudOpen");
    const soundcloudFrame = $("#soundcloudPlayer");
    const volume = $("#volumeSlider");
    const volumeValue = $("#volumeValue");
    const musicConfig = config.music || {};
    const configuredPlaylist = musicConfig.playlist?.length ? musicConfig.playlist : [musicConfig];
    const playlist = configuredPlaylist
      .filter(track => track.file || track.soundcloudUrl);
    const hasSoundCloudTracks = playlist.some(track => track.soundcloudUrl);
    let savedTrackIndex = 0;
    try { savedTrackIndex = Number(localStorage.getItem("profile-track-index") || 0); } catch (_) {}
    let currentTrackIndex = playlist.length ? Math.min(Math.max(0, savedTrackIndex), playlist.length - 1) : 0;
    let currentTrack = playlist[currentTrackIndex] || {};
    let soundcloudWidget = null;
    let soundcloudReady = false;
    let soundcloudApiError = "";
    let loadedSoundCloudUrl = "";
    let soundcloudPlayTimeout = 0;
    let wantsToPlay = false;
    let playing = false;
    let buffering = false;
    let audioContext = null;
    let analyser = null;
    let frequencyData = null;
    let visualFrame = 0;
    const equalizerBars = [...document.querySelectorAll(".equalizer span")];

    let barDuration = 60 / 135 * 4;
    const usesSoundCloud = () => Boolean(currentTrack.soundcloudUrl);
    const usesLocalFile = () => Boolean(currentTrack.file);
    const updateTempo = () => {
      const bpm = Math.max(1, Number(currentTrack.bpm ?? 135));
      const beatDuration = 60 / bpm;
      barDuration = beatDuration * 4;
      document.documentElement.style.setProperty("--beat-duration", `${beatDuration}s`);
      document.documentElement.style.setProperty("--bar-duration", `${barDuration}s`);
    };
    updateTempo();

    const syncVisualPhase = () => {
      let currentTime = 0;
      if (usesLocalFile()) currentTime = localMusic.currentTime || 0;
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
      const ring = $(".avatar-ring");
      ring.style.transform = `scale(${1 + bass * .065})`;
      ring.style.opacity = `${.52 + bass * .42}`;
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
    };

    const initializeAudioAnalyzer = async () => {
      if (!usesLocalFile()) return;
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
      }
      if (analyser) document.body.classList.add("audio-reactive");
      if (audioContext.state === "suspended") await audioContext.resume();
    };

    const updateIcon = () => {
      const icon = buffering ? "loader-circle" : (playing ? "pause" : "play");
      button.innerHTML = `<i data-lucide="${icon}"></i>`;
      button.setAttribute("aria-label", buffering ? "SoundCloud đang tải" : (playing ? "Tạm dừng nhạc" : "Phát nhạc"));
      player.classList.toggle("is-playing", playing);
      player.classList.toggle("is-loading", buffering);
      document.body.classList.toggle("music-playing", playing);
      if (window.lucide) window.lucide.createIcons();
    };

    let savedVolume = "";
    try { savedVolume = localStorage.getItem("profile-music-volume") || ""; } catch (_) {}
    const configuredVolume = savedVolume === "" ? musicConfig.defaultVolume ?? .5 : savedVolume;
    const initialVolume = Math.min(1, Math.max(0, Number(configuredVolume)));
    localMusic.volume = initialVolume;
    volume.value = initialVolume;
    const updateVolume = () => {
      const value = Number(volume.value);
      localMusic.volume = value;
      if (soundcloudReady && soundcloudWidget) soundcloudWidget.setVolume(Math.round(value * 100));
      volumeValue.textContent = `${Math.round(value * 100)}%`;
      volume.style.setProperty("--volume", `${value * 100}%`);
      try { localStorage.setItem("profile-music-volume", String(value)); } catch (_) {}
    };
    updateVolume();
    volume.addEventListener("input", updateVolume);
    playerToggle.addEventListener("click", () => {
      const expanded = player.classList.toggle("is-expanded");
      document.body.classList.toggle("player-expanded", expanded);
      playerToggle.setAttribute("aria-expanded", String(expanded));
      playerToggle.setAttribute("aria-label", expanded ? "Thu gọn điều chỉnh âm lượng" : "Mở điều chỉnh âm lượng");
    });

    const soundcloudOptions = autoPlay => ({
      auto_play: autoPlay,
      color: config.theme?.primary || "#59e6ff",
      hide_related: true,
      show_comments: false,
      show_user: true,
      show_reposts: false,
      show_teaser: false,
      visual: false,
    });

    const soundcloudEmbedUrl = url => {
      const options = new URLSearchParams(soundcloudOptions(false));
      options.set("url", url);
      return `https://w.soundcloud.com/player/?${options.toString()}`;
    };

    const watchSoundCloudPlayback = () => {
      window.clearTimeout(soundcloudPlayTimeout);
      soundcloudPlayTimeout = window.setTimeout(() => {
        if (!usesSoundCloud() || !wantsToPlay || playing) return;
        wantsToPlay = false;
        buffering = false;
        soundcloudStatus.textContent = "Nhấn Play trên waveform để bắt đầu";
        soundcloudCard.dataset.state = "ready";
        updateIcon();
      }, 5000);
    };

    const playMusic = async () => {
      wantsToPlay = true;
      if (usesSoundCloud()) {
        soundcloudCard.hidden = false;
        soundcloudCard.setAttribute("aria-hidden", "false");
        if (soundcloudApiError) {
          wantsToPlay = false;
          soundcloudStatus.textContent = soundcloudApiError;
          soundcloudCard.dataset.state = "error";
          player.classList.add("has-error");
          updateIcon();
          return;
        }
        if (soundcloudReady && soundcloudWidget) {
          buffering = true;
          soundcloudStatus.textContent = "Đang tải âm thanh...";
          soundcloudCard.dataset.state = "loading";
          soundcloudWidget.play();
          watchSoundCloudPlayback();
        } else {
          soundcloudStatus.textContent = "Đang kết nối SoundCloud...";
          soundcloudCard.dataset.state = "loading";
        }
        updateIcon();
        return;
      }
      if (usesLocalFile()) {
        try {
          await initializeAudioAnalyzer();
          await localMusic.play();
        } catch (_) { wantsToPlay = false; }
      }
    };

    const pauseMusic = () => {
      wantsToPlay = false;
      buffering = false;
      window.clearTimeout(soundcloudPlayTimeout);
      if (soundcloudReady && soundcloudWidget) soundcloudWidget.pause();
      localMusic.pause();
      if (usesSoundCloud()) {
        soundcloudStatus.textContent = "Đã tạm dừng";
        soundcloudCard.dataset.state = "ready";
      }
    };

    const waitForSoundCloudVisibility = () => new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });

    const syncSoundCloudCard = () => {
      const visible = usesSoundCloud();
      soundcloudCard.hidden = !visible;
      soundcloudCard.setAttribute("aria-hidden", String(!visible));
      document.body.classList.toggle("soundcloud-active", visible);
      if (!visible) return;
      soundcloudOpen.href = currentTrack.soundcloudUrl;
      soundcloudOpen.setAttribute("aria-label", `Mở ${currentTrack.title || "bài này"} trên SoundCloud`);
      soundcloudStatus.textContent = soundcloudApiError || (soundcloudReady ? "Sẵn sàng phát" : "Đang kết nối SoundCloud...");
      soundcloudCard.dataset.state = soundcloudApiError ? "error" : (soundcloudReady ? "ready" : "loading");
    };

    const updateTrackDisplay = () => {
      trackTitle.textContent = currentTrack.title || `Track ${currentTrackIndex + 1}`;
      trackArtist.textContent = currentTrack.artist || (usesSoundCloud() ? "SoundCloud" : "Local audio");
      trackTitle.title = trackTitle.textContent;
      trackArtist.title = trackArtist.textContent;
      trackSource.textContent = currentTrack.source || (usesSoundCloud()
        ? "SOUNDCLOUD"
        : (/^https?:\/\//i.test(currentTrack.file || "") ? "STREAM" : "LOCAL"));
      player.classList.toggle("has-error", Boolean(usesSoundCloud() && soundcloudApiError));
      syncSoundCloudCard();
      previousTrackButton.disabled = playlist.length < 2;
      nextTrackButton.disabled = playlist.length < 2;
    };

    const selectTrack = async (index, shouldPlay = playing || wantsToPlay) => {
      if (!playlist.length) return;
      localMusic.pause();
      if (soundcloudReady && soundcloudWidget) soundcloudWidget.pause();
      playing = false;
      buffering = false;
      stopAudioVisuals();
      currentTrackIndex = (index + playlist.length) % playlist.length;
      currentTrack = playlist[currentTrackIndex];
      const selectedTrack = currentTrack;
      wantsToPlay = shouldPlay;
      document.body.classList.toggle("audio-reactive", usesLocalFile() && Boolean(analyser));
      updateTempo();
      updateTrackDisplay();
      try { localStorage.setItem("profile-track-index", String(currentTrackIndex)); } catch (_) {}

      if (usesLocalFile()) {
        localMusic.src = currentTrack.file;
        localMusic.load();
      } else {
        localMusic.removeAttribute("src");
        localMusic.load();
      }

      if (usesSoundCloud() && soundcloudReady && soundcloudWidget) {
        await waitForSoundCloudVisibility();
        if (currentTrack !== selectedTrack) return;
        buffering = shouldPlay;
        soundcloudStatus.textContent = shouldPlay ? "Đang tải âm thanh..." : "Sẵn sàng phát";
        soundcloudCard.dataset.state = shouldPlay ? "loading" : "ready";
        loadedSoundCloudUrl = currentTrack.soundcloudUrl;
        soundcloudWidget.load(currentTrack.soundcloudUrl, soundcloudOptions(shouldPlay));
        if (shouldPlay) watchSoundCloudPlayback();
      }

      updateIcon();
      if (shouldPlay && !usesSoundCloud()) await playMusic();
    };

    updateTrackDisplay();
    if (usesLocalFile()) localMusic.src = currentTrack.file;

    if (hasSoundCloudTracks) {
      const firstSoundCloudTrack = playlist.find(track => track.soundcloudUrl);
      let soundcloudApiTimeout = 0;
      loadedSoundCloudUrl = firstSoundCloudTrack.soundcloudUrl;
      soundcloudFrame.src = soundcloudEmbedUrl(firstSoundCloudTrack.soundcloudUrl);

      const failSoundCloudApi = message => {
        soundcloudApiError = message;
        buffering = false;
        if (!usesSoundCloud()) return;
        wantsToPlay = false;
        soundcloudStatus.textContent = message;
        soundcloudCard.dataset.state = "error";
        player.classList.add("has-error");
        intro.disabled = false;
        $("#introTitle").textContent = config.profile.introText;
        updateIcon();
      };

      const initializeSoundCloudWidget = () => {
        if (soundcloudWidget || !window.SC?.Widget) return;
        const events = window.SC.Widget.Events;
        soundcloudWidget = window.SC.Widget(soundcloudFrame);

        soundcloudWidget.bind(events.READY, () => {
          window.clearTimeout(soundcloudApiTimeout);
          soundcloudReady = true;
          soundcloudApiError = "";
          soundcloudWidget.setVolume(Math.round(Number(volume.value) * 100));
          intro.disabled = false;
          $("#introTitle").textContent = config.profile.introText;
          if (!usesSoundCloud()) return;
          syncSoundCloudCard();
          if (currentTrack.soundcloudUrl !== loadedSoundCloudUrl) {
            loadedSoundCloudUrl = currentTrack.soundcloudUrl;
            soundcloudWidget.load(currentTrack.soundcloudUrl, soundcloudOptions(wantsToPlay));
            if (wantsToPlay) watchSoundCloudPlayback();
          } else if (wantsToPlay) {
            soundcloudWidget.play();
            watchSoundCloudPlayback();
          }
        });

        soundcloudWidget.bind(events.PLAY, () => {
          if (!usesSoundCloud()) return;
          window.clearTimeout(soundcloudPlayTimeout);
          playing = true;
          buffering = false;
          wantsToPlay = true;
          soundcloudStatus.textContent = "Đang phát qua SoundCloud";
          soundcloudCard.dataset.state = "playing";
          player.classList.remove("has-error");
          updateIcon();
        });

        soundcloudWidget.bind(events.PAUSE, () => {
          if (!usesSoundCloud()) return;
          playing = false;
          buffering = false;
          wantsToPlay = false;
          soundcloudStatus.textContent = "Đã tạm dừng";
          soundcloudCard.dataset.state = "ready";
          updateIcon();
        });

        soundcloudWidget.bind(events.FINISH, () => {
          if (!usesSoundCloud()) return;
          playing = false;
          buffering = false;
          void selectTrack(currentTrackIndex + 1, true);
        });

        soundcloudWidget.bind(events.ERROR, () => {
          if (!usesSoundCloud()) return;
          playing = false;
          buffering = false;
          wantsToPlay = false;
          soundcloudStatus.textContent = "Track không khả dụng hoặc không cho phép nhúng";
          soundcloudCard.dataset.state = "error";
          player.classList.add("has-error");
          updateIcon();
        });

        soundcloudWidget.bind(events.LOAD_PROGRESS, data => {
          if (!usesSoundCloud() || !wantsToPlay || playing || data.loadProgress >= 1) return;
          buffering = true;
          soundcloudStatus.textContent = "Đang tải dữ liệu...";
          soundcloudCard.dataset.state = "loading";
          updateIcon();
        });

        soundcloudWidget.bind(events.PLAY_PROGRESS, data => {
          if (!usesSoundCloud()) return;
          const currentTime = Number(data.currentPosition || 0) / 1000;
          document.documentElement.style.setProperty("--beat-offset", `${-(currentTime % barDuration)}s`);
        });
      };

      if (window.SC?.Widget) initializeSoundCloudWidget();
      else {
        const apiScript = document.createElement("script");
        apiScript.src = "https://w.soundcloud.com/player/api.js";
        apiScript.async = true;
        apiScript.addEventListener("load", initializeSoundCloudWidget);
        apiScript.addEventListener("error", () => failSoundCloudApi("Không tải được SoundCloud API"));
        document.head.appendChild(apiScript);
      }

      soundcloudApiTimeout = window.setTimeout(() => {
        if (!soundcloudReady) failSoundCloudApi("SoundCloud phản hồi quá chậm — hãy thử lại");
      }, 12000);
    }

    intro.addEventListener("click", async () => {
      intro.classList.add("is-hidden");
      $("#profile").classList.add("is-visible");
      if (usesSoundCloud()) {
        syncSoundCloudCard();
        await new Promise(resolve => window.setTimeout(resolve, 720));
        await waitForSoundCloudVisibility();
      }
      await playMusic();
      updateIcon();
    }, { once: true });

    button.addEventListener("click", async () => {
      if (!playlist.length) return;
      if (playing || wantsToPlay) pauseMusic(); else await playMusic();
      updateIcon();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && usesSoundCloud() && (playing || wantsToPlay)) {
        pauseMusic();
        updateIcon();
      }
    });

    if ("IntersectionObserver" in window) {
      const soundcloudVisibility = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (usesSoundCloud() && entry.intersectionRatio < .5 && (playing || wantsToPlay)) {
          pauseMusic();
          soundcloudStatus.textContent = "Đã dừng vì player rời khỏi màn hình";
          updateIcon();
        }
      }, { threshold: [0, .5, 1] });
      soundcloudVisibility.observe(soundcloudCard);
    }

    previousTrackButton.addEventListener("click", () => { void selectTrack(currentTrackIndex - 1); });
    nextTrackButton.addEventListener("click", () => { void selectTrack(currentTrackIndex + 1); });

    localMusic.addEventListener("play", () => {
      if (!usesLocalFile()) return;
      playing = true;
      buffering = false;
      syncVisualPhase();
      updateIcon();
      startAudioVisuals();
    });
    localMusic.addEventListener("pause", () => {
      if (!usesLocalFile()) return;
      playing = false;
      buffering = false;
      updateIcon();
      stopAudioVisuals();
    });
    localMusic.addEventListener("ended", () => {
      if (usesLocalFile()) void selectTrack(currentTrackIndex + 1, true);
    });
  }

  function setupSnapshots() {
    const card = $("#snapshotCard");
    const image = $("#snapshotImage");
    const title = $("#snapshotTitle");
    const mode = $("#snapshotMode");
    const shuffleButton = $("#snapshotShuffle");
    const nextButton = $("#snapshotNext");
    const snapshots = (config.snapshots || []).filter(item => item?.src);
    const settings = config.snapshotSettings || {};

    if (!card || !image || !title || !mode || !shuffleButton || !nextButton || !snapshots.length) {
      if (card) card.hidden = true;
      return;
    }

    const interval = Math.max(4000, Number(settings.interval) || 8000);
    const intervalLabel = `${String(Math.round(interval / 1000)).padStart(2, "0")}S`;
    const autoEnabled = settings.autoPlay !== false && snapshots.length > 1;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const sourceCache = new Map();
    let currentIndex = Math.floor(Math.random() * snapshots.length);
    let animationTimer;
    let autoTimer;
    let requestId = 0;
    let inView = true;
    let hovered = false;

    card.style.setProperty("--snapshot-interval", `${interval}ms`);

    const loadSource = source => {
      if (sourceCache.has(source)) return sourceCache.get(source);
      const promise = new Promise((resolve, reject) => {
        const probe = new Image();
        const timeout = window.setTimeout(() => reject(new Error("Image timeout")), 6500);
        probe.referrerPolicy = "no-referrer";
        probe.onload = () => {
          window.clearTimeout(timeout);
          resolve(source);
        };
        probe.onerror = () => {
          window.clearTimeout(timeout);
          reject(new Error(`Could not load ${source}`));
        };
        probe.src = source;
      });
      sourceCache.set(source, promise);
      return promise;
    };

    snapshots.forEach(item => {
      void loadSource(item.src).catch(() => {});
      if (item.fallback) void loadSource(item.fallback).catch(() => {});
    });

    const resolveSource = async snapshot => {
      try {
        return await loadSource(snapshot.src);
      } catch (_) {
        const fallback = snapshot.fallback || config.profile?.avatar || "assets/avatar.jpg";
        return loadSource(fallback);
      }
    };

    const autoPaused = () => document.hidden || !inView || (hoverCapable && hovered);

    const syncAuto = () => {
      window.clearTimeout(autoTimer);
      card.classList.remove("is-auto");
      if (!autoEnabled) {
        mode.textContent = "MANUAL";
        return;
      }
      if (autoPaused()) {
        mode.textContent = "PAUSED";
        return;
      }
      mode.textContent = `AUTO ${intervalLabel}`;
      void card.offsetWidth;
      card.classList.add("is-auto");
      autoTimer = window.setTimeout(() => shuffle(), interval);
    };

    const showSnapshot = async (index, animate = true) => {
      const snapshot = snapshots[index];
      const activeRequest = ++requestId;
      window.clearTimeout(animationTimer);
      window.clearTimeout(autoTimer);
      card.classList.remove("is-auto");
      card.classList.add("is-loading");
      card.setAttribute("aria-busy", "true");
      mode.textContent = "LOADING";

      let source;
      try {
        source = await resolveSource(snapshot);
      } catch (_) {
        source = "assets/avatar.jpg";
      }
      if (activeRequest !== requestId) return;

      card.classList.remove("is-changing");
      if (animate) {
        void card.offsetWidth;
        card.classList.add("is-changing");
      }
      image.src = source;
      image.alt = snapshot.alt || snapshot.title || "Profile snapshot";
      title.textContent = snapshot.title || `Snapshot ${index + 1}`;
      card.classList.remove("is-loading");
      card.setAttribute("aria-busy", "false");
      animationTimer = window.setTimeout(() => card.classList.remove("is-changing"), 540);
      syncAuto();
    };

    const shuffle = () => {
      if (snapshots.length < 2) return;
      let nextIndex = Math.floor(Math.random() * snapshots.length);
      if (nextIndex === currentIndex) nextIndex = (nextIndex + 1) % snapshots.length;
      currentIndex = nextIndex;
      void showSnapshot(currentIndex);
    };

    void showSnapshot(currentIndex, false);
    shuffleButton.addEventListener("click", shuffle);
    nextButton.addEventListener("click", shuffle);

    if (hoverCapable) {
      card.addEventListener("mouseenter", () => { hovered = true; syncAuto(); });
      card.addEventListener("mouseleave", () => { hovered = false; syncAuto(); });
    }
    document.addEventListener("visibilitychange", syncAuto);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        inView = entries[0].intersectionRatio >= .2;
        syncAuto();
      }, { threshold: [.2] });
      observer.observe(card);
    }
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
    bubbleLayer.replaceChildren();
  }

  function setupLiquidGlass() {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) return;

    document.querySelectorAll(".profile__card, .portfolio, .music-player, .soundcloud-card").forEach(panel => {
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;

      panel.addEventListener("pointermove", event => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          const rect = panel.getBoundingClientRect();
          panel.style.setProperty("--glass-x", `${((pointerX - rect.left) / rect.width) * 100}%`);
          panel.style.setProperty("--glass-y", `${((pointerY - rect.top) / rect.height) * 100}%`);
          frame = 0;
        });
      });

      panel.addEventListener("pointerleave", () => {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        panel.style.removeProperty("--glass-x");
        panel.style.removeProperty("--glass-y");
      });
    });
  }

  function setupProfileInteractions() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tabs = [...document.querySelectorAll("[data-panel-target]")];
    const panels = [...document.querySelectorAll(".profile-panel")];
    const panelStage = $("#profilePanels");
    const profileCard = $("#profileCard");
    const motionSections = [...document.querySelectorAll(".motion-section")];
    let panelTimer = 0;

    if ("IntersectionObserver" in window && !reduceMotion.matches) {
      document.documentElement.classList.add("motion-ready");
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
      motionSections.forEach(section => revealObserver.observe(section));
    } else {
      motionSections.forEach(section => section.classList.add("is-in-view"));
    }

    const playTap = (item, event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
      const y = event.clientY ? event.clientY - rect.top : rect.height / 2;
      item.style.setProperty("--tap-x", `${x}px`);
      item.style.setProperty("--tap-y", `${y}px`);
      item.classList.remove("is-tapped");
      void item.offsetWidth;
      item.classList.add("is-tapped");
      window.setTimeout(() => item.classList.remove("is-tapped"), 620);
    };

    const activatePanel = (nextPanel, activeTab) => {
      const currentPanel = panels.find(panel => !panel.hidden);
      if (activeTab?.dataset.accent && profileCard) {
        profileCard.style.setProperty("--card-accent", activeTab.dataset.accent);
      }
      tabs.forEach(tab => {
        const active = tab === activeTab;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });

      if (!nextPanel || !panelStage) return;
      if (currentPanel === nextPanel) {
        nextPanel.classList.remove("is-replaying");
        void nextPanel.offsetWidth;
        nextPanel.classList.add("is-replaying");
        window.setTimeout(() => nextPanel.classList.remove("is-replaying"), 560);
        return;
      }

      window.clearTimeout(panelTimer);
      const previousHeight = panelStage.offsetHeight;
      panelStage.style.height = `${previousHeight}px`;
      panels.forEach(panel => {
        panel.classList.remove("is-active", "is-replaying");
        panel.hidden = panel !== nextPanel;
      });
      nextPanel.hidden = false;

      if (reduceMotion.matches) {
        nextPanel.classList.add("is-active");
        panelStage.style.height = "auto";
        return;
      }

      const nextHeight = nextPanel.scrollHeight;
      window.requestAnimationFrame(() => {
        panelStage.style.height = `${nextHeight}px`;
        nextPanel.classList.add("is-active");
      });
      panelTimer = window.setTimeout(() => {
        panelStage.style.height = "auto";
      }, 560);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", event => {
        playTap(tab, event);
        activatePanel(document.getElementById(tab.dataset.panelTarget), tab);
      });
      tab.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      });
    });

    const initialTab = tabs.find(tab => tab.classList.contains("is-active")) || tabs[0];
    if (initialTab?.dataset.accent && profileCard) {
      profileCard.style.setProperty("--card-accent", initialTab.dataset.accent);
    }

    document.querySelectorAll(".interactive-chip, .project-card").forEach(item => {
      item.addEventListener("click", event => {
        const selected = item.getAttribute("aria-pressed") !== "true";
        item.setAttribute("aria-pressed", String(selected));
        item.classList.toggle("is-selected", selected);
        playTap(item, event);
      });
    });
  }

  render();
  setupDiscordAvatar();
  setupLiquidGlass();
  setupThemeSwitcher();
  setupDiveMode();
  setupHolidayCountdown();
  setupIntroAndMusic();
  setupSnapshots();
  setupTypewriter();
  setupOceanEffects();
  setupProfileInteractions();
})();
