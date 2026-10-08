// ============================================================
// CẤU HÌNH GIAO HÀNG & NHẬN ĐƠN
// ============================================================

// fee: số tiền (đồng). fee = null  → "Shop báo phí ship sau", không cộng vào tổng.
export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    icon: "🚚",
    name: "Giao tiêu chuẩn",
    desc: "Toàn quốc · nhận hàng sau 2–3 ngày",
    fee: 30000,
  },
  {
    id: "grab",
    icon: "🟢",
    name: "Giao qua Grab",
    desc: "Shop sẽ báo phí ship sau khi xác nhận đơn",
    fee: null,
  },
  {
    id: "be",
    icon: "🟡",
    name: "Giao qua Be",
    desc: "Shop sẽ báo phí ship sau khi xác nhận đơn",
    fee: null,
  },
];

export const DEFAULT_SHIPPING = "standard";

export const STORE = {
  hotline: "0845 089 876",
  tel: "0845089876",
};

// Nơi nhận đơn tự động (không bắt buộc). Để trống = đơn chỉ lưu trong trình duyệt của khách
// và khách được hướng dẫn gửi nội dung đơn cho shop qua Zalo / hotline.
// Điền địa chỉ Google Apps Script (Web app) hoặc Formspree... để đơn gửi thẳng về cho bạn.
export const ORDER_ENDPOINT = "";
