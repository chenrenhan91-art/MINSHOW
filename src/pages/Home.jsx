import { Link } from "react-router-dom";
import { Lock, ArrowCounterClockwise, ShieldCheck, Truck, Tree } from "@phosphor-icons/react";
import { BRAND, HOME_COLLECTIONS, HOME_FEATURED, asset } from "../brand";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store";

export default function Home() {
  const { catalog, getProduct, getCollection, articles } = useStore();
  if (!catalog) return <div className="intro">Loading crafts...</div>;

  return (
    <>
      <section className="hero">
        <picture>
          <source media="(max-width: 767px)" srcSet={asset("images/bannerm.jpg")} />
          <img src={asset("images/banner.jpg")} alt="Solid walnut crafts" />
        </picture>
        <div className="hero-overlay">
          <div>
            <div className="hero-quote">“{BRAND.quote}”</div>
            <h1>10% Off for New!</h1>
            <div className="hero-code">Code: NEW10</div>
            <Link className="btn" to="/collections/all-crafts">
              See All Our Crafts
            </Link>
          </div>
        </div>
      </section>

      <section className="intro">
        <h2>We are {BRAND.name}</h2>
        <p>{BRAND.tagline}</p>
        <div className="review-pill">
          <span className="stars">★★★★★</span>
          <span>Handcrafted solid wood</span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Explore Our World</div>
            <h2>Our Collections</h2>
          </div>
          <div className="collection-grid">
            {HOME_COLLECTIONS.map((c) => {
              const live = getCollection(c.handle);
              const count = live?.products?.length || live?.count || 0;
              return (
                <Link className="collection-card" key={c.handle} to={`/collections/${c.handle}`}>
                  <div className="thumb">
                    <img src={c.image} alt={c.title} />
                  </div>
                  <h3>{c.title}</h3>
                  <span>{count} items</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-block">
        <div className="section-head">
          <h2>Know More About Us</h2>
          <p>We love wood, nature, and all things beautiful - and we are here to share them with you.</p>
        </div>
        <div className="about-media">
          <img src={asset("images/about.jpg")} alt="MINSHOW workshop" />
        </div>
      </section>

      {HOME_FEATURED.map((block) => (
        <section className="section" key={block.title}>
          <div className="wrap">
            <div className="section-head">
              {block.eyebrow ? <div className="eyebrow">{block.eyebrow}</div> : null}
              <h2>{block.title}</h2>
              {block.subtitle ? <p>{block.subtitle}</p> : null}
            </div>
            <div className="product-row">
              {block.handles.map((handle) => (
                <ProductCard key={handle} product={getProduct(handle)} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Meet Them in Real Life</h2>
            <p>Follow for updates</p>
          </div>
          <div className="life-grid">
            {["life-1.jpg", "life-2.jpg", "life-3.jpg", "life-4.jpg"].map((file) => (
              <img key={file} src={asset(`images/${file}`)} alt="" />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Know More About Wood</h2>
          </div>
          <div className="blog-grid">
            {articles.slice(0, 4).map((a) => (
              <Link className="blog-card" key={a.handle} to={`/blogs/wood-knowledge/${a.handle}`}>
                <img src={a.image} alt="" />
                <h3>{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Our Guarantees</h2>
          </div>
          <div className="guarantees">
            {[
              [Lock, "100% Payment Secured"],
              [ArrowCounterClockwise, "30-Day Return"],
              [ShieldCheck, "Price Protection Guarantee"],
              [Truck, "Free Delivery Over 45 USD"],
              [Tree, "Real Natural Wood"],
            ].map(([Icon, label]) => (
              <div className="g-card" key={label}>
                <Icon size={28} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
