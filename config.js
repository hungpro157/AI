/* Chỉ cần sửa file này để thay đổi toàn bộ nội dung website. */
const PROFILE_CONFIG = {
  theme: {
    primary: "#59e6ff",
    background: "#03111f",
  },

  profile: {
    name: "Lò Văn Huynh",
    username: "@minhanh.creates",
    avatar: "https://i.pinimg.com/736x/6b/1f/97/6b1f9721bb3d019f3c4a745ec2cc73c2.jpg",
    bio: "Creative Designer & Front-end Developer",
    quote: "Create quietly. Let the work make the noise.",
    email: "hello@minhanh.me",
    introText: "Nhấn để bắt đầu",
    eyebrow: "WELCOME TO MY PROFILE",
  },

  background: {
    image: "",
    // Điền URL hoặc đường dẫn file MP4 nếu muốn dùng video nền.
    video: "",
  },

  music: {
    youtubeId: "",
    // Chỉ dùng file khi không dùng YouTube, ví dụ: "assets/music.mp3"
    file: "assets/music.mp3",
    defaultVolume: 0.5,
    bpm: 135,
  },

  // Các dòng sẽ tự động chạy theo hiệu ứng typewriter.
  typingTexts: [
    "Mình yêu thiết kế và những điều giản đơn.",
    "Welcome to my little corner of the internet.",
    "Let’s create something meaningful.",
  ],
  typingAnimation: {
    typeSpeed: 111,
    deleteSpeed: 83,
    pauseAfterText: 3556,
    pauseBetweenTexts: 889,
  },

  socials: [
    { name: "Facebook", url: "https://facebook.com/", icon: "facebook" },
    { name: "GitHub", url: "https://github.com/", icon: "github" },
    { name: "Discord", url: "https://discord.com/", icon: "message-circle" },
    { name: "TikTok", url: "https://tiktok.com/", icon: "music-2" },
    { name: "Instagram", url: "https://instagram.com/", icon: "instagram" },
    { name: "YouTube", url: "https://youtube.com/", icon: "youtube" },
    { name: "X / Twitter", url: "https://x.com/", icon: "twitter" },
  ],
};
