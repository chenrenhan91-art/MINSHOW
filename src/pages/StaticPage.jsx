import { useParams } from "react-router-dom";
import { PAGES } from "../content";

export default function StaticPage() {
  const { slug } = useParams();
  const page = PAGES[slug];
  if (!page) return <div className="intro">Page not found.</div>;
  return (
    <article className="static-page">
      <h1>{page.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
