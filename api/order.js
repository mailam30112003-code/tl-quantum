// Vercel Serverless Function: nhận đơn từ trang đặt hàng và gửi vào Telegram.
// Token bot KHÔNG nằm trong code web, chỉ nằm trong Environment Variables của Vercel:
//   TELEGRAM_BOT_TOKEN  (lấy từ @BotFather)
//   TELEGRAM_CHAT_ID    (id chat/nhóm nhận đơn)

const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";
const clip = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method" });
  }

  // TẠM THỜI để test: nếu Vercel chưa có biến môi trường thì dùng giá trị dự phòng bên dưới.
  // Khi chạy thật: tạo token mới ở BotFather, đặt vào Vercel rồi XÓA 2 giá trị dự phòng này.
  const token = process.env.TELEGRAM_BOT_TOKEN || "8745745396:AAEP_zDmtP7q9IFDi_C4XSXIUqCP7vw9fcU";
  const chatId = process.env.TELEGRAM_CHAT_ID || "8229119606";
  if (!token || !chatId) return res.status(500).json({ ok: false, error: "chưa cấu hình Telegram" });

  let o = req.body;
  if (typeof o === "string") {
    try { o = JSON.parse(o); } catch { o = null; }
  }
  if (!o || typeof o !== "object") return res.status(400).json({ ok: false, error: "dữ liệu sai" });

  const c = o.customer || {};
  const items = Array.isArray(o.items) ? o.items.slice(0, 100) : [];
  const phone = clip(c.phone, 20).replace(/[^\d+]/g, "");
  if (!clip(c.name, 80).trim() || !/^(0|\+84)\d{9,10}$/.test(phone) || !clip(c.address, 300).trim() || items.length === 0) {
    return res.status(400).json({ ok: false, error: "thiếu thông tin" });
  }

  const sub = items.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 0), 0);
  const ship = o.shipping || {};
  const fee = ship.fee == null ? null : Number(ship.fee) || 0;

  const lines = [
    `🛒 ĐƠN HÀNG MỚI ${clip(o.code, 30)}`,
    `👤 ${clip(c.name, 80)}`,
    `📞 ${phone}`,
    `📍 ${clip(c.address, 300)}`,
  ];
  lines.push(`📧 Email: ${clip(c.email, 120) || "Không có"}`);
  lines.push(`📝 Ghi chú: ${clip(c.note, 300) || "Không có"}`);
  lines.push("", "Sản phẩm:");
  items.forEach((i) =>
    lines.push(`• ${clip(i.name, 120)} ×${Number(i.quantity) || 0} = ${fmt((Number(i.price) || 0) * (Number(i.quantity) || 0))}`)
  );
  lines.push("", `Tạm tính: ${fmt(sub)}`);
  lines.push(fee == null ? `🚚 ${clip(ship.name, 40)}: SHOP BÁO PHÍ SHIP SAU` : `🚚 ${clip(ship.name, 40)}: ${fmt(fee)}`);
  lines.push(fee == null ? `💰 Tổng (chưa gồm ship): ${fmt(sub)}` : `💰 Tổng cộng: ${fmt(sub + fee)}`);

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n").slice(0, 4000) }),
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: "telegram" });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "telegram" });
  }
}
