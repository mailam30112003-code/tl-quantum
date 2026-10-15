// Danh sách tỉnh/thành, quận/huyện, phường/xã lấy từ API công khai provinces.open-api.vn.
// Có lưu tạm trong bộ nhớ để không gọi lại. Nếu API lỗi, trang đặt hàng tự chuyển sang nhập tay.
const BASE = "https://provinces.open-api.vn/api";
const cache = new Map();

async function getJson(url) {
  if (cache.has(url)) return cache.get(url);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    cache.set(url, data);
    return data;
  } finally {
    clearTimeout(timer);
  }
}

const clean = (list) => (Array.isArray(list) ? list.map(({ name, code }) => ({ name, code })) : []);

export async function fetchProvinces() {
  return clean(await getJson(`${BASE}/p/`));
}
export async function fetchDistricts(provinceCode) {
  return clean((await getJson(`${BASE}/p/${provinceCode}?depth=2`)).districts);
}
export async function fetchWards(districtCode) {
  return clean((await getJson(`${BASE}/d/${districtCode}?depth=2`)).wards);
}
