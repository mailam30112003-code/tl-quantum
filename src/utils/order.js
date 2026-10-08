import { ORDER_ENDPOINT } from "../data/shipping";

const KEY = "tlq_orders_v1";

export const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

export function makeOrderCode() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `TLQ${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Nội dung đơn dạng chữ để khách sao chép gửi shop
export function orderToText(o) {
  const lines = [
    `ĐƠN HÀNG ${o.code}`,
    `Khách: ${o.customer.name} · ${o.customer.phone}`,
    `Địa chỉ: ${o.customer.address}`,
  ];
  if (o.customer.note) lines.push(`Ghi chú: ${o.customer.note}`);
  lines.push("", "Sản phẩm:");
  o.items.forEach((i) => lines.push(`- ${i.name} x${i.quantity} = ${fmt(i.price * i.quantity)}`));
  lines.push("", `Tạm tính: ${fmt(o.subtotal)}`);
  lines.push(
    o.shipping.fee == null
      ? `Giao hàng: ${o.shipping.name} (shop báo phí ship sau)`
      : `Giao hàng: ${o.shipping.name} (${fmt(o.shipping.fee)})`
  );
  lines.push(o.shipping.fee == null ? `Tổng (chưa gồm phí ship): ${fmt(o.total)}` : `Tổng cộng: ${fmt(o.total)}`);
  return lines.join("\n");
}

// Lưu đơn trong trình duyệt, và gửi về ORDER_ENDPOINT nếu có cấu hình.
// Trả về { sent: true | false | null }  (null = không cấu hình nơi nhận)
export async function submitOrder(order) {
  try {
    const old = JSON.parse(localStorage.getItem(KEY) || "[]");
    localStorage.setItem(KEY, JSON.stringify([order, ...old].slice(0, 50)));
  } catch {
    /* trình duyệt chặn localStorage thì bỏ qua */
  }
  if (!ORDER_ENDPOINT) return { sent: null };
  try {
    await fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...order, text: orderToText(order) }),
    });
    return { sent: true };
  } catch {
    return { sent: false };
  }
}
