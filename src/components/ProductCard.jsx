import { Link } from "react-router-dom";
import { money, productPrice } from "../brand";

export default function ProductCard({ product }) {
  if (!product) return null;
  const img = product.images[0]?.src;
  const hover = product.images[1]?.src || img;
  const { price, compare, from } = productPrice(product);
  return (
    <Link className="product-card" to={`/products/${product.handle}`}>
      <div className="thumb">
        <img
          src={img}
          alt={product.title}
          onMouseEnter={(e) => {
            if (hover && hover !== img) e.currentTarget.src = hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.src = img;
          }}
        />
      </div>
      <h3>{product.title}</h3>
      <div className="price">
        {from ? <span className="from">From </span> : null}
        {compare ? <s>{money(compare)}</s> : null}
        {money(price)}
      </div>
    </Link>
  );
}
