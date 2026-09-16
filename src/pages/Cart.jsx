import { Link } from "react-router-dom";
import { BRAND, money } from "../brand";
import { useStore } from "../store";

export default function Cart() {
  const { cart, cartTotal, updateQty, removeItem, clearCart } = useStore();
  const shipping = cartTotal >= 45 || cartTotal === 0 ? 0 : 6.9;
  const total = cartTotal + shipping;

  return (
    <div className="wrap section">
      <div className="section-head">
        <h2>Your cart</h2>
      </div>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. <Link to="/collections/all-crafts">Continue shopping</Link>
        </p>
      ) : (
        <>
          {cart.map((line) => (
            <div className="cart-line" key={line.handle + line.variantId}>
              <img src={line.image} alt="" />
              <div>
                <Link to={`/products/${line.handle}`}>{line.title}</Link>
                <div>{line.variantTitle}</div>
                <div className="qty">
                  <button onClick={() => updateQty(line.handle, line.variantId, line.qty - 1)}>-</button>
                  <span>{line.qty}</span>
                  <button onClick={() => updateQty(line.handle, line.variantId, line.qty + 1)}>+</button>
                </div>
                <button onClick={() => removeItem(line.handle, line.variantId)}>Remove</button>
              </div>
              <div>{money(Number(line.price) * line.qty)}</div>
            </div>
          ))}
          <div style={{ maxWidth: 360, marginLeft: "auto", paddingTop: 24 }}>
            <p>Subtotal {money(cartTotal)}</p>
            <p>Shipping {shipping === 0 ? "Free" : money(shipping)}</p>
            <p>
              <strong>Total {money(total)}</strong>
            </p>
            <p className="note">
              Checkout is handled by our sales team. Email{" "}
              <a href={BRAND.emailHref}>{BRAND.email}</a> or call {BRAND.phone} to complete your order.
              First-purchase code NEW10 can be mentioned when you reach out.
            </p>
            <Link className="btn" to="/pages/contact" style={{ marginTop: 12 }}>
              Contact to checkout
            </Link>
            <div style={{ marginTop: 12 }}>
              <button className="btn ghost" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
