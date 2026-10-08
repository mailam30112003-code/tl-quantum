// ============================================================
// THÔNG TIN RIÊNG CHO TỪNG SẢN PHẨM TRONG KHUNG (không bắt buộc)
// Key là `id` sản phẩm trong products.js. Sản phẩm không có ở đây
// sẽ tự lấy tiêu đề từ tên, nhãn từ số chân / danh mục.
// ============================================================

// Tiêu đề tự chọn cách ngắt dòng: dòng đầu màu xanh, các dòng sau màu đen.
export const FRAME_TITLE = {
  1: ["ESP32", "DEVKIT V1"],
};

// Nhãn xanh dưới tiêu đề.
export const FRAME_PILL = {
  1: "30 PIN",
};

// Các ý nổi bật (icon: wifi, chip, usb, pins, shield, box, code, headset).
// Chỉ hiện ở trang chi tiết / ảnh tải về. Bạn tự thêm cho sản phẩm khác.
export const FRAME_HIGHLIGHTS = {
  1: [
    { icon: "wifi", t: "WiFi + Bluetooth", d: "Dual Core 240MHz" },
    { icon: "chip", t: "CHIP ESP32", d: "Hiệu năng cao, tiết kiệm năng lượng" },
    { icon: "usb", t: "TYPE-C USB", d: "Dễ sử dụng" },
    { icon: "pins", t: "30 PIN", d: "Dễ dàng kết nối và mở rộng" },
  ],
};
