# DEMO1 - Nail Salon (Monochrome)

Trang web tĩnh cho tiệm nail DEMO1 với phong cách đen trắng tối giản.

## Cách mở (Windows)

- Mở thư mục dự án
- Nhấp đúp `index.html` để mở bằng trình duyệt (Chrome/Edge/Firefox)

## Tùy chỉnh nhanh

- Thương hiệu: chỉnh trong `index.html` (phần `.logo`) và thẻ `<title>`
- Màu sắc: chỉnh biến trong `styles.css` (`--bg`, `--text`, `--inverse`)
- Bảng giá: cập nhật mục `#pricing` trong `index.html`
- Bộ sưu tập: thay các khối `.g-item` bằng `<img>` nếu có ảnh thật
- Form đặt lịch: hiện là mô phỏng; kết nối API trong `script.js` nếu cần

## Cấu trúc

- `index.html` — Trang chủ, các section: Hero, Dịch vụ, Bảng giá, Bộ sưu tập, Đặt lịch
- `styles.css` — Giao diện đen trắng, responsive
- `script.js` — Menu di động, cuộn mượt, xử lý form
