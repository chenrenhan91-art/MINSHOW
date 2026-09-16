import { Link, useParams } from "react-router-dom";
import { useStore } from "../store";

export default function Blog() {
  const { handle } = useParams();
  const { articles } = useStore();
  if (handle) {
    const article = articles.find((a) => a.handle === handle);
    if (!article) return <div className="intro">Article not found.</div>;
    return (
      <article className="static-page">
        <p>
          <Link to="/blogs/wood-knowledge">Wood Knowledge</Link>
        </p>
        <h1>{article.title}</h1>
        {article.image ? <img src={article.image} alt="" style={{ borderRadius: 8, margin: "18px 0" }} /> : null}
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.body }} />
      </article>
    );
  }
  return (
    <div className="wrap section">
      <div className="section-head">
        <h2>Wood Knowledge</h2>
      </div>
      <div className="blog-grid">
        {articles.map((a) => (
          <Link className="blog-card" key={a.handle} to={`/blogs/wood-knowledge/${a.handle}`}>
            <img src={a.image} alt="" />
            <h3>{a.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
