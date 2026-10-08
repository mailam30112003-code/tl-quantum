import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import banner from "../assets/banner.png";
import logo from "../assets/logo.jpg";
import products from "../data/products";
import { categoryGroups, findGroup, resolveCategory, ALL } from "../data/categories";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import "./Home.css";

const PAGE_SIZE = 24;

const normalize = (t) => t.toLowerCase().replace(/[\s\-_]+/g, "");

const catLink = (name) => `/?cat=${encodeURIComponent(name)}#catalog`;

// Các khu vực trưng bày ở trang chủ (chỉ lấy hàng còn trong kho)
const showcase = [
  { title: "Vi điều khiển", cat: "Vi điều khiển" },
  { title: "Cảm biến", cat: "Cảm biến" },
  { title: "Module", cat: "Module" },
  { title: "Nguồn & Pin", cat: "Nguồn" },
  { title: "Dụng cụ hàn", cat: "Dụng cụ" },
];

const slides = [
  { type: "image" },
  {
    type: "text",
    title: "VI ĐIỀU KHIỂN",
    sub: "ESP32 · STM32 · Arduino · Pico",
    cta: "XEM VI ĐIỀU KHIỂN",
    to: catLink("Vi điều khiển"),
    feats: [
      ["chip", "ESP32", "Hiệu năng cao"],
      ["board", "STM32", "Đa dạng"],
      ["loop", "ARDUINO", "Dễ sử dụng"],
      ["chip", "PICO", "Nhỏ gọn"],
      ["signal", "WIFI · BLE", "Kết nối không dây"],
    ],
    art: [1, 7, 8, 10],
  },
  {
    type: "text",
    title: "CẢM BIẾN & MODULE",
    sub: "Đủ đồ cho dự án của bạn",
    cta: "XEM CẢM BIẾN",
    to: catLink("Cảm biến"),
    feats: [
      ["wave", "SIÊU ÂM", "Đo khoảng cách"],
      ["heart", "NHỊP TIM", "Đo SpO2"],
      ["signal", "LORA · RF", "Kết nối xa"],
      ["scan", "RFID", "Đọc thẻ"],
      ["board", "OLED", "Hiển thị"],
    ],
    art: [14, 21, 32, 34],
  },
];

const ICONS = {
  chip: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  board: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h3M8 13h8M14 9h2" /></>,
  loop: <path d="M8 8c-3 0-4.5 1.8-4.5 4S5 16 8 16c4 0 4-8 8-8 3 0 4.5 1.8 4.5 4S19 16 16 16c-4 0-4-8-8-8z" />,
  signal: <><circle cx="12" cy="12" r="1.6" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" /></>,
  wave: <><path d="M4 12h2l2-5 3 10 3-8 2 3h4" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><circle cx="12" cy="12" r="3" /></>,
  shield: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  medal: <><circle cx="12" cy="9" r="5" /><path d="M9 13.5L7.5 21 12 18.5 16.5 21 15 13.5M10 9l1.5 1.5L14 8" /></>,
  truck: <><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  headset: <><path d="M5 14v-2a7 7 0 0 1 14 0v2" /><rect x="3.5" y="13" width="3.5" height="5.5" rx="1.5" /><rect x="17" y="13" width="3.5" height="5.5" rx="1.5" /><path d="M19 18.5c0 1.5-2 2.5-5 2.5" /></>,
};
function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

// Sản phẩm đứng trên bệ tròn bên phải banner: ưu tiên ảnh thật, không có thì ảnh vẽ
function HeroArt({ ids }) {
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return (
    <div className="hm-art" aria-hidden="true">
      <i className="ring r1" /><i className="ring r2" />
      {items.map((p, k) => (
        <div className={`hm-prod t${k + 1}`} key={p.id}>
          <div className="hm-pod" />
          <div className="hm-prod-img">
            <ProductImage product={p} mode={p.image ? "photo" : "art"} framed={false} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PromoArt({ id }) {
  const p = products.find((x) => x.id === id);
  return p ? <ProductImage product={p} mode={p.image ? "photo" : "art"} framed={false} /> : null;
}

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="hm-hero">
      <div
        className="hm-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hm-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, idx) =>
            s.type === "image" ? (
              <div className="hm-slide hm-slide-img" key={idx}>
                <img src={banner} alt="TL Quantum - linh kiện điện tử" />
              </div>
            ) : (
              <div className="hm-slide hm-slide-light" key={idx}>
                <HeroArt ids={s.art} />
                <div className="hm-lt">
                  <img className="hm-lt-logo" src={logo} alt="TL Quantum" />
                  <h2>{s.title}</h2>
                  <p className="hm-lt-sub">{s.sub}</p>
                  <div className="hm-lt-pill">CHÍNH HÃNG - UY TÍN - CHẤT LƯỢNG</div>
                  <ul className="hm-lt-feats">
                    {s.feats.map(([ic, t, d]) => (
                      <li key={t}><Icon name={ic} /><b>{t}</b><small>{d}</small></li>
                    ))}
                  </ul>
                  <div className="hm-lt-btns">
                    <Link to={s.to} className="hm-lt-btn solid">{s.cta}</Link>
                    <a href="tel:0845089876" className="hm-lt-btn line">TƯ VẤN KỸ THUẬT</a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <button className="hm-arrow prev" onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Slide trước">‹</button>
        <button className="hm-arrow next" onClick={() => setI((i + 1) % slides.length)} aria-label="Slide sau">›</button>

        <div className="hm-dots">
          {slides.map((_, idx) => (
            <button key={idx} className={idx === i ? "on" : ""} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} />
          ))}
        </div>
      </div>

      <div className="hm-promos">
        <Link to={catLink("Vi điều khiển")} className="hm-promo p1">
          <span className="hm-promo-art"><PromoArt id={1} /></span>
          <b>Vi điều khiển</b>
          <small>ESP32, STM32, Arduino, Pico</small>
          <i className="hm-promo-go">Xem ngay →</i>
        </Link>
        <Link to={catLink("Dụng cụ")} className="hm-promo p2">
          <span className="hm-promo-art"><PromoArt id={222} /></span>
          <b>Dụng cụ & Phụ kiện</b>
          <small>Mỏ hàn, thiếc, breadboard</small>
          <i className="hm-promo-go">Xem ngay →</i>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || ALL;
  const q = params.get("q") || "";
  const [sort, setSort] = useState(params.get("sort") || "default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const isCatalog = cat !== ALL || q.trim() !== "" || params.get("sort") === "sold";

  // Đổi bộ lọc thì quay lại trang đầu của danh sách
  useEffect(() => setVisible(PAGE_SIZE), [cat, q, sort, inStockOnly]);

  const setCat = (name) => {
    const next = new URLSearchParams(params);
    if (name === ALL) next.delete("cat");
    else next.set("cat", name);
    setParams(next, { replace: false });
  };

  const clearAll = () => setParams({});

  const filtered = useMemo(() => {
    const allowed = resolveCategory(cat);
    const term = normalize(q);
    let list = products.filter((p) => {
      if (allowed && !allowed.includes(p.category)) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (term && !normalize(p.name + p.category + (p.sku || "")).includes(term)) return false;
      return true;
    });

    const inStockFirst = (a, b) => (b.stock > 0) - (a.stock > 0);
    if (sort === "price-asc") list = [...list].sort((a, b) => inStockFirst(a, b) || a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => inStockFirst(a, b) || b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => inStockFirst(a, b) || a.name.localeCompare(b.name, "vi"));
    else if (sort === "sold") list = [...list].sort((a, b) => inStockFirst(a, b) || (b.sold || 0) - (a.sold || 0));
    else list = [...list].sort(inStockFirst); // mặc định: hàng còn lên trước, giữ thứ tự gốc
    return list;
  }, [cat, q, sort, inStockOnly]);

  const group = findGroup(cat);
  const chips = group && group.children.length ? group.children : [];

  const heading = q ? `Kết quả cho “${q}”` : cat === ALL ? (sort === "sold" ? "Bán chạy nhất" : "Tất cả sản phẩm") : cat;
  const bestSellers = useMemo(
    () => products.filter((p) => p.sold > 0 && p.stock > 0).sort((a, b) => b.sold - a.sold).slice(0, 8),
    []
  );
  const inStockCount = useMemo(() => products.filter((p) => p.stock > 0).length, []);

  return (
    <div className="hm">
      <div className="tq-container">
        {!isCatalog && <Hero />}

        {!isCatalog && (
          <>
            {/* Dải thông tin */}
            <section className="hm-trust">
              <div><span>🚚</span><p><b>Giao hàng toàn quốc</b><small>Gửi nhanh mọi tỉnh thành</small></p></div>
              <div><span>🛠️</span><p><b>Hỗ trợ kỹ thuật</b><small>Hotline 0845 089 876</small></p></div>
              <div><span>📦</span><p><b>{inStockCount}+ mã còn hàng</b><small>Linh kiện đa dạng</small></p></div>
              <div><span>⚡</span><p><b>Đặt hàng nhanh</b><small>Giỏ hàng lưu sẵn khi tải lại</small></p></div>
            </section>

            {/* Lưới danh mục */}
            <section className="hm-section">
              <div className="hm-head">
                <h2>Danh mục sản phẩm</h2>
              </div>
              <div className="hm-cats">
                {categoryGroups.map((g) => (
                  <Link key={g.name} to={catLink(g.name)} className="hm-cat">
                    <span className="ico">{g.icon}</span>
                    <b>{g.name}</b>
                    <small>{products.filter((p) => g.match.includes(p.category)).length} sản phẩm</small>
                  </Link>
                ))}
              </div>
            </section>

            {/* Bán chạy: chỉ lấy theo số lượng đã bán thật trong dữ liệu */}
            {bestSellers.length > 0 && (
              <section className="hm-section">
                <div className="hm-head">
                  <h2>🔥 Bán chạy</h2>
                  <Link to={`/?sort=sold#catalog`} className="hm-more">Xem tất cả →</Link>
                </div>
                <div className="hm-grid">
                  {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </section>
            )}

            {/* Các khu vực sản phẩm */}
            {showcase.map((s) => {
              const allowed = resolveCategory(s.cat);
              const items = products.filter((p) => allowed.includes(p.category) && p.stock > 0).slice(0, 8);
              return (
                <section className="hm-section" key={s.title}>
                  <div className="hm-head">
                    <h2>{s.title}</h2>
                    <Link to={catLink(s.cat)} className="hm-more">Xem tất cả →</Link>
                  </div>
                  <div className="hm-grid">
                    {items.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                </section>
              );
            })}

          </>
        )}

        {/* ===== Danh sách đầy đủ / kết quả lọc ===== */}
        <section id="catalog" className="hm-catalog">
          {!isCatalog && (
            <div className="hm-head" style={{ marginTop: 40 }}>
              <h2>Tất cả sản phẩm</h2>
            </div>
          )}
          {isCatalog && (
            <>
              <nav className="hm-crumb" aria-label="Breadcrumb">
                <button onClick={clearAll}>Trang chủ</button>
                <span>/</span>
                <b>{heading}</b>
              </nav>

              <div className="hm-toolbar">
                <div>
                  <h1>{heading}</h1>
                  <p>{filtered.length} sản phẩm</p>
                </div>
                <div className="hm-controls">
                  <label className="hm-check">
                    <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                    Chỉ hàng còn
                  </label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp">
                    <option value="default">Mặc định</option>
                    <option value="sold">Bán chạy nhất</option>
                    <option value="price-asc">Giá thấp → cao</option>
                    <option value="price-desc">Giá cao → thấp</option>
                    <option value="name">Tên A → Z</option>
                  </select>
                </div>
              </div>

              <div className="hm-chips">
                <button className={cat === ALL ? "on" : ""} onClick={() => setCat(ALL)}>Tất cả</button>
                {categoryGroups.map((g) => (
                  <button key={g.name} className={group?.name === g.name ? "on" : ""} onClick={() => setCat(g.name)}>
                    {g.icon} {g.name}
                  </button>
                ))}
              </div>

              {chips.length > 0 && (
                <div className="hm-chips sub">
                  {chips.map((c) => (
                    <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
                  ))}
                </div>
              )}
            </>
          )}

          {filtered.length === 0 ? (
            <div className="hm-empty">
              <div>🔍</div>
              <h3>Không tìm thấy sản phẩm phù hợp</h3>
              <p>Thử từ khóa khác hoặc xem lại bộ lọc.</p>
              <button onClick={clearAll}>Xóa bộ lọc</button>
            </div>
          ) : (
            <>
              <div className="hm-grid">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="hm-all">
                  <button className="hm-loadmore" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Xem thêm {Math.min(PAGE_SIZE, filtered.length - visible)} sản phẩm
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
