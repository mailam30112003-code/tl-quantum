import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductImage from "../components/ProductImage";
import { SHIPPING_OPTIONS, DEFAULT_SHIPPING, STORE, HCM_CODE, quoteShipping } from "../data/shipping";
import { fetchProvinces, fetchDistricts, fetchWards } from "../utils/vnLocations";
import { fmt, makeOrderCode, orderToText, submitOrder } from "../utils/order";
import "./Checkout.css";

const PHONE_RE = /^(0|\+84)\d{9,10}$/;

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total: subtotal, clearCart } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", address: "", email: "", note: "" });
  const [shipId, setShipId] = useState(DEFAULT_SHIPPING);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null); // { order, sent }
  const [copied, setCopied] = useState(false);

  // Tỉnh / quận / phường chọn từ danh sách; nếu tải danh sách lỗi thì chuyển sang nhập tay
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [locFailed, setLocFailed] = useState(false);
  const [region, setRegion] = useState(""); // chỉ dùng khi locFailed: inner | outer | other

  const isPickup = shipId === "pickup";

  useEffect(() => {
    let off = false;
    fetchProvinces()
      .then((list) => {
        if (off) return;
        const sorted = [...list].sort((x, y) =>
          x.code === HCM_CODE ? -1 : y.code === HCM_CODE ? 1 : x.name.localeCompare(y.name, "vi")
        );
        setProvinces(sorted);
        setProvinceCode(String(HCM_CODE)); // shop ở TP.HCM nên chọn sẵn
      })
      .catch(() => !off && setLocFailed(true));
    return () => {
      off = true;
    };
  }, []);

  useEffect(() => {
    setDistricts([]);
    setDistrictCode("");
    if (!provinceCode) return;
    let off = false;
    fetchDistricts(provinceCode)
      .then((l) => !off && setDistricts(l))
      .catch(() => !off && setLocFailed(true));
    return () => {
      off = true;
    };
  }, [provinceCode]);

  useEffect(() => {
    setWards([]);
    setWardCode("");
    if (!districtCode) return;
    let off = false;
    fetchWards(districtCode)
      .then((l) => !off && setWards(l))
      .catch(() => !off && setLocFailed(true));
    return () => {
      off = true;
    };
  }, [districtCode]);

  const province = provinces.find((p) => String(p.code) === provinceCode);
  const district = districts.find((d) => String(d.code) === districtCode);
  const ward = wards.find((w) => String(w.code) === wardCode);

  const quote = useMemo(
    () =>
      quoteShipping(shipId, {
        provinceCode,
        districtName: district?.name,
        region: locFailed ? region : "",
      }),
    [shipId, provinceCode, district, locFailed, region]
  );
  const ship = SHIPPING_OPTIONS.find((s) => s.id === shipId) || SHIPPING_OPTIONS[0];
  const fee = quote.fee; // số tiền | null
  const feeLater = fee == null; // shop báo sau, hoặc chưa chọn khu vực
  const total = subtotal + (feeLater ? 0 : fee);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Vui lòng nhập họ tên";
    if (!PHONE_RE.test(form.phone.replace(/[\s.-]/g, ""))) er.phone = "Số điện thoại chưa đúng";
    if (!isPickup) {
      if (locFailed) {
        if (!region) er.region = "Vui lòng chọn khu vực giao hàng";
        if (form.address.trim().length < 8) er.address = "Vui lòng nhập địa chỉ nhận hàng đầy đủ";
      } else {
        if (!provinceCode) er.province = "Vui lòng chọn tỉnh/thành phố";
        else if (!districtCode) er.district = "Vui lòng chọn quận/huyện";
        else if (wards.length > 0 && !wardCode) er.ward = "Vui lòng chọn phường/xã";
        if (form.address.trim().length < 3) er.address = "Vui lòng nhập số nhà, tên đường";
      }
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const fullAddress = () =>
    isPickup
      ? "Nhận tại cửa hàng"
      : locFailed
        ? form.address.trim()
        : [form.address.trim(), ward?.name, district?.name, province?.name].filter(Boolean).join(", ");

  const placeOrder = async (e) => {
    e.preventDefault();
    if (busy || !validate()) return;
    setBusy(true);
    const order = {
      code: makeOrderCode(),
      createdAt: new Date().toISOString(),
      customer: {
        name: form.name.trim(),
        phone: form.phone.replace(/[\s.-]/g, ""),
        address: fullAddress(),
        email: form.email.trim(),
        note: form.note.trim(),
      },
      shipping: { id: ship.id, name: ship.name, fee },
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal,
      total,
    };
    const res = await submitOrder(order);
    clearCart();
    setDone({ order, sent: res.sent });
    setBusy(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderToText(done.order));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      alert("Không sao chép được, bạn hãy chụp màn hình đơn hàng nhé.");
    }
  };

  // Sao chép nội dung đơn rồi mở khung chat Zalo của shop, khách chỉ cần dán và gửi
  const sendViaZalo = async () => {
    try {
      await navigator.clipboard.writeText(orderToText(done.order));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* không sao chép được thì vẫn mở Zalo */
    }
    window.open(`https://zalo.me/${STORE.zalo}`, "_blank", "noopener");
  };

  /* ---------- Đặt xong ---------- */
  if (done) {
    const { order, sent } = done;
    return (
      <div className="tq-container checkout-page">
        <div className="co-done">
          <div className="co-done-icon">✔</div>
          <h1>Đã ghi nhận đơn hàng</h1>
          <p className="co-code">Mã đơn: <b>{order.code}</b></p>

          {sent === true ? (
            <p>Shop đã nhận được đơn và sẽ liên hệ xác nhận qua số <b>{order.customer.phone}</b>.</p>
          ) : (
            <p className="co-warn">
              {sent === false
                ? "Chưa gửi được đơn tới shop do lỗi mạng. "
                : "Đơn mới được lưu trên trình duyệt này. "}
              Để shop xử lý nhanh, bạn bấm <b>Sao chép đơn</b> rồi gửi cho shop qua Zalo/Shopee hoặc gọi{" "}
              <a href={`tel:${STORE.tel}`}>{STORE.hotline}</a>.
            </p>
          )}

          {order.shipping.fee == null && (
            <p className="co-note">
              Bạn chọn <b>{order.shipping.name}</b>: shop sẽ báo phí ship sau khi xác nhận đơn (chưa tính vào tổng).
            </p>
          )}

          <pre className="co-text">{orderToText(order)}</pre>

          <div className="co-done-actions">
            <button className="place-order-btn zalo" onClick={sendViaZalo}>
              {copied ? "✔ Đã sao chép, hãy dán vào Zalo" : "Gửi đơn qua Zalo"}
            </button>
            <button className="back-cart-btn" onClick={copyOrder}>
              {copied ? "✔ Đã sao chép" : "Sao chép đơn"}
            </button>
            <a className="back-cart-btn" href={`tel:${STORE.tel}`}>📞 Gọi {STORE.hotline}</a>
            <button className="back-cart-btn" onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Giỏ trống ---------- */
  if (cart.length === 0) {
    return (
      <div className="tq-container checkout-page">
        <div className="co-done">
          <div className="co-done-icon empty">🛒</div>
          <h1>Giỏ hàng đang trống</h1>
          <p>Hãy thêm vài linh kiện vào giỏ trước khi đặt hàng.</p>
          <Link to="/" className="place-order-btn co-link">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  /* ---------- Form đặt hàng ---------- */
  return (
    <div className="tq-container checkout-page">
      <h1 className="co-title">Đặt hàng</h1>

      <form className="checkout-container" onSubmit={placeOrder} noValidate>
        <div className="checkout-left">
          <section className="co-card">
            <h2>Thông tin liên hệ</h2>

            <label className={`co-field ${errors.name ? "bad" : ""}`}>
              <span>Họ và tên *</span>
              <input name="name" value={form.name} onChange={onChange} autoComplete="name" placeholder="Nguyễn Văn A" />
              {errors.name && <em className="co-error">{errors.name}</em>}
            </label>

            <label className={`co-field ${errors.phone ? "bad" : ""}`}>
              <span>Số điện thoại *</span>
              <input name="phone" value={form.phone} onChange={onChange} inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" />
              {errors.phone && <em className="co-error">{errors.phone}</em>}
            </label>

            <label className="co-field">
              <span>Email (không bắt buộc)</span>
              <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" placeholder="ten@gmail.com" />
            </label>
          </section>

          <section className="co-card">
            <h2>Hình thức nhận hàng</h2>
            <div className="ship-list" role="radiogroup" aria-label="Hình thức nhận hàng">
              {SHIPPING_OPTIONS.map((s) => (
                <label key={s.id} className={`ship-opt ${s.id === shipId ? "on" : ""}`}>
                  <input type="radio" name="shipping" value={s.id} checked={s.id === shipId} onChange={() => setShipId(s.id)} />
                  <span className="ship-icon">{s.icon}</span>
                  <span className="ship-text">
                    <b className="ship-name">{s.name}</b>
                    <small>{s.desc}</small>
                  </span>
                  <span className={`ship-fee ${s.id === "grab" || s.id === "be" ? "later" : ""}`}>{s.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="co-card">
            <h2>{isPickup ? "Địa chỉ cửa hàng" : "Địa chỉ nhận hàng"}</h2>

            {isPickup ? (
              <p className="co-pickup">
                {STORE.address ? (
                  <>📍 <b>{STORE.address}</b></>
                ) : (
                  <>Shop sẽ báo địa chỉ cửa hàng và giờ nhận hàng khi xác nhận đơn.</>
                )}
                <br />
                Bạn chờ shop xác nhận qua điện thoại rồi hãy đến lấy nhé. Hotline: <a href={`tel:${STORE.tel}`}>{STORE.hotline}</a>
              </p>
            ) : (
              <>
                {locFailed ? (
                  <label className={`co-field ${errors.region ? "bad" : ""}`}>
                    <span>Khu vực giao hàng *</span>
                    <select value={region} onChange={(e) => { setRegion(e.target.value); setErrors((er) => ({ ...er, region: "" })); }}>
                      <option value="">-- Chọn khu vực --</option>
                      <option value="inner">Nội thành TP.HCM</option>
                      <option value="outer">Ngoại thành TP.HCM</option>
                      <option value="other">Tỉnh/thành khác</option>
                    </select>
                    {errors.region && <em className="co-error">{errors.region}</em>}
                  </label>
                ) : (
                  <div className="co-grid3">
                    <label className={`co-field ${errors.province ? "bad" : ""}`}>
                      <span>Tỉnh / Thành phố *</span>
                      <select value={provinceCode} onChange={(e) => { setProvinceCode(e.target.value); setErrors((er) => ({ ...er, province: "", district: "", ward: "" })); }} disabled={provinces.length === 0}>
                        <option value="">{provinces.length === 0 ? "Đang tải..." : "-- Chọn tỉnh/thành --"}</option>
                        {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                      </select>
                      {errors.province && <em className="co-error">{errors.province}</em>}
                    </label>

                    <label className={`co-field ${errors.district ? "bad" : ""}`}>
                      <span>Quận / Huyện *</span>
                      <select value={districtCode} onChange={(e) => { setDistrictCode(e.target.value); setErrors((er) => ({ ...er, district: "", ward: "" })); }} disabled={!provinceCode || districts.length === 0}>
                        <option value="">{provinceCode && districts.length === 0 ? "Đang tải..." : "-- Chọn quận/huyện --"}</option>
                        {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                      </select>
                      {errors.district && <em className="co-error">{errors.district}</em>}
                    </label>

                    <label className={`co-field ${errors.ward ? "bad" : ""}`}>
                      <span>Phường / Xã *</span>
                      <select value={wardCode} onChange={(e) => { setWardCode(e.target.value); setErrors((er) => ({ ...er, ward: "" })); }} disabled={!districtCode || wards.length === 0}>
                        <option value="">{districtCode && wards.length === 0 ? "Đang tải..." : "-- Chọn phường/xã --"}</option>
                        {wards.map((w) => <option key={w.code} value={w.code}>{w.name}</option>)}
                      </select>
                      {errors.ward && <em className="co-error">{errors.ward}</em>}
                    </label>
                  </div>
                )}

                <label className={`co-field ${errors.address ? "bad" : ""}`}>
                  <span>{locFailed ? "Địa chỉ đầy đủ *" : "Số nhà, tên đường *"}</span>
                  <input
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    autoComplete="street-address"
                    placeholder={locFailed ? "Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" : "Ví dụ: 12 Nguyễn Trãi"}
                  />
                  {errors.address && <em className="co-error">{errors.address}</em>}
                </label>
              </>
            )}

            <label className="co-field">
              <span>Ghi chú (không bắt buộc)</span>
              <textarea name="note" rows="3" value={form.note} onChange={onChange} placeholder="Ví dụ: gọi trước khi giao" />
            </label>
          </section>

          <button type="button" className="back-cart-btn" onClick={() => navigate("/cart")}>← Quay lại giỏ hàng</button>
        </div>

        <aside className="checkout-right">
          <h2>Đơn hàng ({cart.length} sản phẩm)</h2>

          <div className="co-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="co-thumb"><ProductImage product={item} framed={false} /></div>
                <div className="checkout-info">
                  <p>{item.name}</p>
                  <small>SL: {item.quantity}</small>
                </div>
                <div className="checkout-price">{fmt(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="co-line"><span>Tạm tính</span><b>{fmt(subtotal)}</b></div>
          <div className="co-line">
            <span>Phí ship ({ship.name})</span>
            <b className={feeLater ? "later" : ""}>
              {quote.pending ? "Chọn khu vực" : fee == null ? "Shop báo sau" : fee === 0 ? "Miễn phí" : fmt(fee)}
            </b>
          </div>

          <div className="checkout-total">
            <span>Tổng cộng</span>
            <strong className="checkout-final">{fmt(total)}</strong>
          </div>
          {quote.pending && <p className="co-hint">Chọn tỉnh/thành và quận/huyện để tính phí ship.</p>}
          {!quote.pending && feeLater && <p className="co-hint">Chưa gồm phí ship. Shop sẽ báo phí qua điện thoại sau khi xác nhận đơn.</p>}

          <button type="submit" className="place-order-btn" disabled={busy}>
            {busy ? "Đang gửi..." : "Đặt hàng"}
          </button>
        </aside>
      </form>
    </div>
  );
}
