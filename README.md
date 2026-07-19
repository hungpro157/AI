# Personal Portfolio / Bio Link

Website profile một màn hình, thuần HTML, CSS và JavaScript — không cần cài đặt hoặc build.

## Chạy website

Cách nhanh nhất trong VS Code: nhấn `F5`, chọn **Open portfolio (localhost)**.
VS Code sẽ tự khởi động server và mở Chrome tại `http://127.0.0.1:8080`.

Hoặc chạy thủ công trong PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Sau đó truy cập `http://127.0.0.1:8080`. Nhấn `Ctrl+C` trong terminal để dừng server.
Nếu không muốn dùng server, có thể mở trực tiếp `index.html` hoặc chọn cấu hình F5
**Open portfolio (no server)**.

## Tùy chỉnh

Chỉ sửa file `config.js`. Nội dung, màu sắc, ảnh nền, avatar, hiệu ứng gõ chữ,
nhạc nền và liên kết mạng xã hội đều nằm trong file này.

Đổi `music.youtubeId` để dùng video YouTube khác, hoặc bỏ ID và điền `music.file`
để dùng MP3 local. `music.defaultVolume` đặt âm lượng ban đầu từ `0` đến `1`.

- Để dùng video nền, điền đường dẫn file MP4 vào `background.video`.
- Để tắt một mạng xã hội, xóa phần tử tương ứng trong mảng `socials`.
- Có thể dùng URL ảnh online hoặc đường dẫn local như `assets/avatar.jpg`.
