/* Chỉ cần sửa file này để thay đổi toàn bộ nội dung website. */
const PROFILE_CONFIG = {
  brand: {
    mark: "NH//",
    name: "NH SPACE",
    version: "EST. 2026",
  },

  theme: {
    primary: "#d8d2de",
    background: "#080808",
    colors: ["#d8d2de", "#b9a8c7", "#a5b0b8", "#c5b8aa"],
  },

  profile: {
    name: "Yuuki",
    username: "bí mật",
    avatar: "assets/avatar.jpg",
    discord: {
      userId: "1138469880585273344",
      syncAvatar: true,
      refreshInterval: 60000,
    },
    bio: "Chill thôi — nghe nhạc, chơi game và xuất hiện khi có mood.",
    quote: "1 DEV tự do không có gì là sai",
    email: "lohai14753@gmail.com",
    introText: "CHẠM ĐỂ BẮT ĐẦU",
    eyebrow: "JUST MY SPACE • ONLINE",
  },

  background: {
    image: "assets/background-custom-hd.png",
    // Điền URL hoặc đường dẫn file MP4 nếu muốn dùng video nền.
    video: "assets/video-1080p.mp4",
  },

  music: {
    defaultVolume: 0.5,
    playlist: [
      {
        title: "Color Your Night / ver Nkay Nkay ft.",
        artist: "NH_HUNH",
        file: "assets/music.mp3",
        bpm: 135,
      },
      // Thêm bài MP3: { title: "Tên bài", artist: "Ca sĩ", file: "assets/ten-bai.mp3", bpm: 120 },
      // Hoặc luồng MP3 bên ngoài: { title: "Tên bài", artist: "Ca sĩ", file: "https://domain.com/music.mp3", source: "WEB" },
    ],
  },

  // Các dòng sẽ tự động chạy theo hiệu ứng typewriter.
  typingTexts: [
    "online theo cách của riêng mình.",
    "chill, nghe nhạc và chơi game.",
    "Liên Quân Mobile • TFT • late night.",
  ],
  typingAnimation: {
    typeSpeed: 111,
    deleteSpeed: 83,
    pauseAfterText: 3556,
    pauseBetweenTexts: 889,
  },

  portfolio: {
    label: "CONNECTED",
    socialActivity: [
      { name: "Facebook", label: "Bài viết & bạn bè", color: "#4f8cff", icon: "facebook" },
      { name: "GitHub", label: "Code & những thứ đang làm", color: "#f2f2f2", icon: "github" },
      { name: "Discord", label: "Trò chuyện & gaming", color: "#8b9bff", icon: "message-square" },
      { name: "TikTok", label: "Video ngắn & xu hướng", color: "#ff6b9d", icon: "music" },
      { name: "YouTube", label: "Video & playlist", color: "#ff5d6c", icon: "youtube" },
    ],
    vibes: ["🎧 Music on", "🌙 Cú đêm", "💬 Hay online", "✨ Chill thôi"],
    games: [
      {
        icon: "gamepad-2",
        code: "MOBILE",
        state: "ĐANG CHƠI",
        title: "Liên Quân Mobile",
        description: "Vào game khi rảnh — vui là chính, thắng thì càng vui.",
      },
      {
        icon: "chess-knight",
        code: "TEAMFIGHT TACTICS",
        state: "CHILL",
        title: "TFT",
        description: "Xoay bài, giữ máu và chờ một trận đấu thật đỏ.",
      },
    ],
    status: "Hiện tại: có thể đang nghe nhạc, trong trận hoặc ngủ.",
  },

  snapshotSettings: {
    autoPlay: true,
    interval: 8000,
  },
  snapshots: [
    { src: "assets/avatar.jpg", title: "Profile Portrait", alt: "Ảnh chân dung của NH_HUNH" },
    { src: "assets/background-custom-hd.png", title: "Main Visual", alt: "Ảnh nền chính" },
    { src: "assets/background-aqua-v2.jpg", title: "Background V2", alt: "Ảnh nền phiên bản hai" },
    { src: "https://picsum.photos/seed/aqua-abyss/960/540", fallback: "assets/background-aqua-v2.jpg", title: "Web Signal // Abyss", alt: "Ảnh ngẫu nhiên từ web" },
    { src: "https://picsum.photos/seed/aqua-drift/960/540", fallback: "assets/background-custom-hd.png", title: "Web Signal // Drift", alt: "Ảnh ngẫu nhiên từ web" },
    { src: "https://picsum.photos/seed/aqua-night/960/540", fallback: "assets/background.jpg", title: "Web Signal // Night", alt: "Ảnh ngẫu nhiên từ web" },
  ],

  socials: [
    { name: "Facebook", url: "https://www.facebook.com/share/197JQ6rAbW/", icon: "facebook" },
    { name: "GitHub", url: "https://github.com/hungpro157", icon: "github" },
    { name: "Discord", url: "https://discord.com/", icon: "message-square" },
    { name: "TikTok", url: "https://tiktok.com/", icon: "music" },
    { name: "YouTube", url: "https://www.youtube.com/@MikuHanhLa", icon: "youtube" },
  ],
};
