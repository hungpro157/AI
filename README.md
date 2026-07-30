# NH_HUNH Profile

Chạy `server.ps1` hoặc mở website bằng một static server.

## Thêm nhạc vào playlist

1. Chép file MP3 vào thư mục `assets`, ví dụ `assets/music-2.mp3`.
2. Mở `config.js` và thêm bài vào `music.playlist`:

```js
{
  title: "Tên bài",
  artist: "Tên nghệ sĩ",
  file: "assets/music-2.mp3",
  bpm: 120,
},
```

Hoặc dùng một URL MP3 trực tiếp từ máy chủ/CDN bên ngoài:

```js
{
  title: "Tên bài",
  artist: "Tên nghệ sĩ",
  file: "https://domain.com/music.mp3",
  source: "WEB",
},
```

Tên bài, nghệ sĩ và nguồn phát luôn được lấy từ `config.js`, nên giao diện vẫn hiển thị đúng trên cả máy tính và điện thoại. URL MP3 bên ngoài cần cho phép phát từ domain khác (CORS).

Player tự chuyển bài khi bài hiện tại kết thúc và ghi nhớ bài cùng âm lượng gần nhất.

## Profile Snapshot

Ảnh tự đổi ngẫu nhiên sau mỗi 8 giây và không lặp lại ảnh vừa xem. Có thể bấm vào ảnh hoặc nút đổi để chuyển ngay; bộ đếm sẽ tạm dừng khi thẻ nằm ngoài màn hình, tab bị ẩn hoặc người dùng đang rê chuột trên ảnh.

Danh sách tại `snapshots` trong `config.js` hỗ trợ cả đường dẫn local và URL ảnh trực tiếp từ web. Nếu ảnh web lỗi hoặc mạng chậm, thuộc tính `fallback` sẽ tự chuyển về ảnh local. Thời gian tự đổi được chỉnh bằng `snapshotSettings.interval`.
