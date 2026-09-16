import { Link } from "react-router-dom";
import { BRAND, HOME_COLLECTIONS } from "../brand";

export default function Wholesale() {
  return (
    <article className="static-page">
      <h1>Bulk Order Inquiry</h1>
      <div className="prose">
        <p>Welcome to {BRAND.name}.</p>
        <p>
          At {BRAND.legal}, we do not just offer products, we offer a lifestyle. We are driven by craftsmanship and
          quality, with a focus on elevating everyday experiences through thoughtfully designed home decor, coffee
          accessories, kitchen tools, and more.
        </p>
        <p>
          If you share our love for beautifully crafted, premium products, we invite you to partner with us. Fill out
          the form below and our team will get in touch.
        </p>
      </div>
      <form
        className="form-grid"
        style={{ marginTop: 24 }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you. Our wholesale team will contact you.");
          e.currentTarget.reset();
        }}
      >
        <label>
          Store Name *
          <input name="store" required />
        </label>
        <label>
          Contact Person *
          <input name="person" required />
        </label>
        <label>
          Email *
          <input type="email" name="email" required />
        </label>
        <label>
          Phone number *
          <input name="phone" required />
        </label>
        <label>
          Business Type *
          <select name="type" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Retailer</option>
            <option>Cafe / Restaurant</option>
            <option>Online Store</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Product Categories of Interest *
          <select name="category" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Coffee Accessories</option>
            <option>Kitchen Tools</option>
            <option>Home Decor Products</option>
            <option>All Above</option>
          </select>
        </label>
        <label>
          Estimated Order Quantity *
          <select name="qty" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Less than 50 units</option>
            <option>50 - 100 units</option>
            <option>100 - 200 units</option>
            <option>200 - 500 units</option>
            <option>500+ units</option>
          </select>
        </label>
        <label>
          Additional Requests or Questions
          <textarea name="notes" />
        </label>
        <button className="btn" type="submit">
          SUBMIT
        </button>
      </form>
      <p className="note">
        You can also email <a href={BRAND.emailHref}>{BRAND.email}</a> or call {BRAND.phone}.{" "}
        {BRAND.legal}, {BRAND.address.join(" ")}.
      </p>
      <div className="collection-grid" style={{ marginTop: 36 }}>
        {HOME_COLLECTIONS.slice(0, 4).map((c) => (
          <Link className="collection-card" key={c.handle} to={`/collections/${c.handle}`}>
            <div className="thumb">
              <img src={c.image} alt="" />
            </div>
            <h3>{c.title}</h3>
          </Link>
        ))}
      </div>
    </article>
  );
}
