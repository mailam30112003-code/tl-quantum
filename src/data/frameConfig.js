// ============================================================
// CẤU HÌNH KHUNG ẢNH THƯƠNG HIỆU TL QUANTUM
// ============================================================

// "all"   → mọi sản phẩm (ảnh thật lẫn ảnh vẽ) đều bỏ vào khung
// "photo" → chỉ ảnh thật bỏ vào khung
// "off"   → tắt khung, dùng ảnh như cũ
export const FRAME_MODE = "all";

export const BRAND = {
  name: "TL QUANTUM",
  tagline: "LINH KIỆN & GIẢI PHÁP ĐIỆN TỬ",
};

// Chỉ để true nếu đúng với TẤT CẢ sản phẩm bạn bán.
export const SHOW_TESTED_BADGE = true; // ô xanh "ĐÃ KIỂM ĐỊNH – TEST 100% TRƯỚC KHI GIAO"
export const SHOW_GENUINE_BADGE = true; // huy hiệu vàng "HÀNG CHÍNH HÃNG 100%"

// Các ô bên phải (chỉ hiện ở trang chi tiết / ảnh tải về).
// `groups`: chỉ hiện cho nhóm danh mục này (bỏ trống = hiện cho mọi sản phẩm).
export const BENEFITS = [
  { icon: "shield", t: "ĐÃ KIỂM ĐỊNH", d: "TEST 100%" },
  { icon: "box", t: "ĐÓNG GÓI CẨN THẬN", d: "" },
  { icon: "code", t: "CUNG CẤP CODE MIỄN PHÍ", d: "Arduino / ESP-IDF / MicroPython", groups: ["Vi điều khiển"] },
  { icon: "headset", t: "HỖ TRỢ TƯ VẤN", d: "NHANH CHÓNG" },
];

// Thanh xanh phía dưới khung.
export const FOOTER = [
  { icon: "cloud", t: "IoT" },
  { icon: "home", t: "Smart Home" },
  { icon: "gear", t: "DIY Project" },
  { icon: "infinity", t: "Arduino" },
];
