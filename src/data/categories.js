// Cây danh mục: mỗi nhóm có thể gồm nhiều danh mục con.
// `match` là danh sách giá trị p.category trong products.js thuộc nhóm đó.
export const categoryGroups = [
  { name: "Vi điều khiển", icon: "🧠", match: ["ESP32", "Arduino", "STM32", "Raspberry Pi"], children: ["ESP32", "Arduino", "STM32", "Raspberry Pi"] },
  { name: "RF - Không dây", icon: "📡", match: ["LoRa", "Bluetooth", "RFID"], children: ["LoRa", "Bluetooth", "RFID"] },
  { name: "Cảm biến", icon: "🌡️", match: ["Cảm biến"], children: [] },
  { name: "Hiển thị", icon: "🖥️", match: ["Hiển thị"], children: [] },
  { name: "Nguồn", icon: "🔋", match: ["Nguồn"], children: [] },
  { name: "Module", icon: "🧩", match: ["Module"], children: [] },
  { name: "Linh kiện cơ bản", icon: "🔌", match: ["IC", "Transistor", "Diode", "Điện trở", "Tụ điện", "LED"], children: ["IC", "Transistor", "Diode", "Điện trở", "Tụ điện", "LED"] },
  { name: "Relay & Driver", icon: "⚙️", match: ["Relay", "Motor"], children: ["Relay", "Motor"] },
  { name: "Quạt & Công tắc", icon: "🌀", match: ["Quạt", "Công tắc"], children: ["Quạt", "Công tắc"] },
  { name: "Dụng cụ", icon: "🛠️", match: ["Dụng cụ"], children: [] },
  { name: "Phụ kiện", icon: "🧰", match: ["Phụ kiện"], children: [] },
];

export const ALL = "all";

// Trả về danh sách p.category khớp với giá trị ?cat= (tên nhóm hoặc tên danh mục con)
export function resolveCategory(cat) {
  if (!cat || cat === ALL) return null;
  const group = categoryGroups.find((g) => g.name === cat);
  if (group) return group.match;
  return [cat];
}

// Nhóm chứa một danh mục con (để hiển thị chip lọc)
export function findGroup(cat) {
  return (
    categoryGroups.find((g) => g.name === cat) ||
    categoryGroups.find((g) => g.children.includes(cat)) ||
    null
  );
}
