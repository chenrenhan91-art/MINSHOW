import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { asset } from "../brand";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store";

export default function Collection() {
  const { handle } = useParams();
  const { getCollection, getProduct, catalog } = useStore();
  const col = getCollection(handle);
  const [sort, setSort] = useState("featured");

  const products = useMemo(() => {
    const list = (col?.products || []).map(getProduct).filter(Boolean);
    if (sort === "price-asc") {
      return [...list].sort(
        (a, b) => Number(a.variants[0]?.price || 0) - Number(b.variants[0]?.price || 0)
      );
    }
    if (sort === "price-desc") {
      return [...list].sort(
        (a, b) => Number(b.variants[0]?.price || 0) - Number(a.variants[0]?.price || 0)
      );
    }
    if (sort === "title") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [col, getProduct, sort]);

  if (!catalog) return <div className="intro">Loading crafts...</div>;
  if (!col) return <div className="intro">Collection not found.</div>;

  const localThumbs = {
    "coffee-tea-dining": asset("images/col-coffee.jpg"),
    "jewelry-box-organizer": asset("images/col-jewelry.jpg"),
    "home-decor-1": asset("images/col-decor.jpg"),
    "coaster-trivet": asset("images/col-coaster.webp"),
    "animal-design": asset("images/col-animal.jpg"),
    "storage-display": asset("images/col-storage.jpg"),
    "wooden-cutting-boards": asset("images/col-boards.jpg"),
    "tissue-box-holder": asset("images/col-tissue.webp"),
  };
  const heroImg = localThumbs[handle] || col.image || products[0]?.images[0]?.src;

  return (
    <>
      <div className="collection-hero">
        <img src={heroImg} alt="" />
        <h1>{col.title}</h1>
      </div>
      <div className="crumb-bar">
        <Link to="/">Home</Link> _ {col.title}
      </div>
      <div className="wrap section">
        <div className="toolbar">
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="title">Alphabetically</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>
        <div className="count-line">{products.length} products</div>
        <div className="product-row">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
