// ============================================================
// CẤU HÌNH GIAO HÀNG & NHẬN ĐƠN
// ============================================================

// ---- Phí ship giao tiêu chuẩn (đồng) ----
export const FEE_HCM_INNER = 10000; // nội thành TP.HCM
export const FEE_HCM_OUTER = 20000; // ngoại thành TP.HCM
export const FEE_OTHER = 30000; // tỉnh/thành khác (toàn quốc, 2–3 ngày)

// Mã tỉnh của TP.HCM theo danh mục hành chính
export const HCM_CODE = 79;

// Các quận/TP được tính là NỘI THÀNH. Quận/huyện HCM không nằm trong danh sách này = ngoại thành
// (Củ Chi, Hóc Môn, Bình Chánh, Nhà Bè, Cần Giờ). Muốn chuyển Quận 12 / Thủ Đức sang ngoại thành thì xóa khỏi danh sách.
export const HCM_INNER = [
  "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12",
  "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú", "Quận Bình Tân",
  "Thành phố Thủ Đức",
];

// fee: số tiền (đồng). fee = null → "Shop báo phí ship sau". Phí giao tiêu chuẩn tính theo khu vực (xem quoteShipping).
export const SHIPPING_OPTIONS = [
  {
    id: "pickup",
    icon: "🏪",
    name: "Nhận tại cửa hàng",
    desc: "Bạn đến cửa hàng lấy hàng, không mất phí ship",
    label: "Miễn phí",
  },
  {
    id: "standard",
    icon: "🚚",
    name: "Giao tiêu chuẩn",
    desc: "Nội thành HCM 10k · ngoại thành HCM 20k · tỉnh khác 30k (toàn quốc 2–3 ngày)",
    label: "10k – 30k",
  },
  {
    id: "grab",
    icon: "🟢",
    name: "Giao qua Grab",
    desc: "Shop sẽ báo phí ship sau khi xác nhận đơn",
    label: "Shop báo sau",
  },
  {
    id: "be",
    icon: "🟡",
    name: "Giao qua Be",
    desc: "Shop sẽ báo phí ship sau khi xác nhận đơn",
    label: "Shop báo sau",
  },
];

export const DEFAULT_SHIPPING = "standard";

// Tính phí ship. loc = { provinceCode, districtName, region } (region chỉ dùng khi không tải được danh sách tỉnh).
// Trả về { fee, pending }: fee = số tiền | null (shop báo sau); pending = true nếu chưa đủ thông tin để tính.
export function quoteShipping(optionId, loc = {}) {
  if (optionId === "pickup") return { fee: 0, pending: false };
  if (optionId !== "standard") return { fee: null, pending: false };

  if (loc.region) {
    const fee = loc.region === "inner" ? FEE_HCM_INNER : loc.region === "outer" ? FEE_HCM_OUTER : FEE_OTHER;
    return { fee, pending: false };
  }
  if (!loc.provinceCode) return { fee: null, pending: true };
  if (Number(loc.provinceCode) !== HCM_CODE) return { fee: FEE_OTHER, pending: false };
  if (!loc.districtName) return { fee: null, pending: true };
  return { fee: HCM_INNER.includes(loc.districtName) ? FEE_HCM_INNER : FEE_HCM_OUTER, pending: false };
}

export const STORE = {
  hotline: "0845 089 876",
  zalo: "0845089876", // số điện thoại Zalo của shop (bấm nút Zalo sẽ mở khung chat tới số này)
  tel: "0845089876",
  address: "", // ĐỊA CHỈ CỬA HÀNG để khách đến lấy hàng. Điền vào đây, để trống thì web ghi "shop sẽ báo địa chỉ khi xác nhận đơn"
};

// Nơi nhận đơn tự động (không bắt buộc). Để trống = đơn chỉ lưu trong trình duyệt của khách
// và khách được hướng dẫn gửi nội dung đơn cho shop qua Zalo / hotline.
// Điền địa chỉ Google Apps Script (Web app) hoặc Formspree... để đơn gửi thẳng về cho bạn.
export const ORDER_ENDPOINT = "/api/order"; // Vercel function gửi đơn vào Telegram (api/order.js)
