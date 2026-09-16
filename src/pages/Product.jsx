import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Truck } from "@phosphor-icons/react";
import { BRAND, money, productPrice } from "../brand";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store";

export default function Product() {
  const { handle } = useParams();
  const { getProduct, addToCart, catalog } = useStore();
  const product = getProduct(handle);
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);

  const related = useMemo(() => {
    if (!product || !catalog) return [];
    return catalog.products
      .filter((p) => p.handle !== product.handle && p.type === product.type)
      .slice(0, 4);
  }, [catalog, product]);

  if (!catalog) return <div className="intro">Loading crafts...</div>;
  if (!product) return <div className="intro">Product not found.</div>;

  const variant = product.variants[variantIdx] || product.variants[0];
  const img = product.images[idx]?.src || product.images[0]?.src;
  const { from } = productPrice(product);

  return (
    <>
      <div className="crumb-bar">
        <Link to="/">Home</Link> _ {product.title}
      </div>
      <div className="wrap pdp">
        <div className="gallery">
          <div className="gallery-main">
            <img src={img} alt={product.title} />
          </div>
          <div className="thumbs">
            {product.images.slice(0, 6).map((im, i) => (
              <button key={im.src} className={i === idx ? "active" : ""} onClick={() => setIdx(i)}>
                <img src={im.src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="vendor">{BRAND.name}</div>
          <h1>{product.title}</h1>
          <div className="promo-note">Save 10% on your first purchase, apply code NEW10 at checkout.</div>
          <div className="price">
            {from ? "From " : null}
            {money(variant?.price)}
          </div>
          {product.variants.length > 1 ? (
            <div className="variant-row">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  className={i === variantIdx ? "active" : ""}
                  onClick={() => setVariantIdx(i)}
                >
                  {v.title}
                </button>
              ))}
            </div>
          ) : null}
          <div className="qty-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button
              className="btn wide"
              onClick={() =>
                addToCart({
                  handle: product.handle,
                  title: product.title,
                  variantId: variant.id,
                  variantTitle: variant.title,
                  price: variant.price,
                  image: product.images[0]?.src,
                  qty,
                })
              }
            >
              Add to cart
            </button>
          </div>
          <div className="ship-note">
            <Truck size={22} />
            <div>
              It usually takes around <strong>1-3 days</strong> to process and ship out your order, and{" "}
              <strong>shipping normally takes 6-10 days</strong>. We will ship it out as soon as possible. Thank you for
              your understanding!
            </div>
          </div>
          <div className="accordion">
            <details open>
              <summary>Information</summary>
              <div className="prose" dangerouslySetInnerHTML={{ __html: product.body }} />
            </details>
          </div>
        </div>
      </div>
      {related.length ? (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h2>You may also like</h2>
            </div>
            <div className="product-row">
              {related.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
