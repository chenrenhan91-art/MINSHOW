import { BRAND, openInboxMail } from "../brand";

export default function Contact() {
  return (
    <article className="static-page">
      <h1>Contact Us</h1>
      <div className="prose">
        <p>
          We would love to hear from you. Whether it is a question about our products, your order, or a wholesale
          request, we are here to help.
        </p>
        <p>
          <strong>Hours</strong>: {BRAND.hours}
          <br />
          <strong>Email</strong>: <a href={BRAND.emailHref}>{BRAND.email}</a>
          <br />
          <strong>Phone</strong>: <a href={BRAND.phoneHref}>{BRAND.phone}</a>
        </p>
        <p>
          <strong>Address</strong>
          <br />
          {BRAND.legal}
          <br />
          {BRAND.address.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <form
        className="form-grid"
        style={{ marginTop: 28 }}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          openInboxMail({
            subject: `MINSHOW contact from ${fd.get("name") || "website"}`,
            body: `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`,
          });
          e.currentTarget.reset();
        }}
      >
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" required />
        </label>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </article>
  );
}
