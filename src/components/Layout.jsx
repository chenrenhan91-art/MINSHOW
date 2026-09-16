import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CaretDown,
  List,
  MagnifyingGlass,
  Moon,
  ShoppingBag,
  Sun,
  User,
  X,
} from "@phosphor-icons/react";
import { ANNOUNCEMENTS, BRAND, NAV, SUPPORT_NAV, asset, money } from "../brand";
import { useStore } from "../store";

function Logo() {
  return (
    <Link to="/" className="logo" aria-label={BRAND.legal}>
      <img src={asset("images/logo-mark.png")} alt="" />
      <span className="logo-text">
        MINSHOW
        <small>TRADING</small>
      </span>
    </Link>
  );
}

function Menu({ item }) {
  return (
    <div className="nav-item">
      <NavLink to={item.href || item.children?.[0]?.href || "/"} className="nav-link">
        {item.label}
        {item.children ? <CaretDown size={10} weight="bold" /> : null}
      </NavLink>
      {item.children ? (
        <div className="mega">
          {item.children.map((child) => (
            <Link key={child.href} to={child.href}>
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Layout({ children }) {
  const loc = useLocation();
  const nav = useNavigate();
  const {
    cart,
    cartCount,
    cartTotal,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    mobileOpen,
    setMobileOpen,
    theme,
    setTheme,
    updateQty,
    removeItem,
    catalog,
  } = useStore();
  const [annIndex, setAnnIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setInterval(() => setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    window.scrollTo(0, 0);
  }, [loc.pathname, setCartOpen, setMobileOpen, setSearchOpen]);

  const results = (catalog?.products || [])
    .filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()))
    .slice(0, 12);

  return (
    <div className="app-shell">
      <div className="announce">
        <div className="announce-msg">{ANNOUNCEMENTS[annIndex]}</div>
        <div className="announce-tools">
          <span>English</span>
          <span>United States (USD $)</span>
        </div>
      </div>
      <header className="site-header">
        <div className="header-grid">
          <button className="icon-btn mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <List size={22} />
          </button>
          <button className="icon-btn mobile-search" aria-label="search" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlass size={20} />
          </button>
          <Logo />
          <nav className="nav-row">
            {NAV.map((item) => (
              <Menu key={item.label} item={item} />
            ))}
          </nav>
          <div className="header-icons">
            <button className="icon-btn hide-mobile" aria-label="search" onClick={() => setSearchOpen(true)}>
              <MagnifyingGlass size={20} />
            </button>
            <Link to="/pages/contact" className="icon-btn hide-mobile" aria-label="Log in">
              <User size={20} />
            </Link>
            <button
              className="icon-btn sun hide-mobile"
              aria-label="darkmode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Moon size={16} weight="fill" /> : <Sun size={16} weight="fill" />}
            </button>
            <button className="icon-btn cart-btn" aria-label="icon-cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
            </button>
          </div>
          <nav className="nav-row secondary">
            <Menu item={SUPPORT_NAV} />
            <div className="nav-item">
              <NavLink to="/pages/our-story" className="nav-link">
                Our Story
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="page-main">{children}</main>

      <section className="newsletter">
        <h2>Subscribe {BRAND.name}!</h2>
        <p>Be the first to know about new crafts and exclusive offers.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            alert("Thank you for subscribing.");
          }}
        >
          <input type="email" name="email" placeholder="Email" required />
          <button className="btn" type="submit">
            Subscribe
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <h4>{BRAND.legal}</h4>
            {BRAND.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <a href={BRAND.emailHref}>{BRAND.email}</a>
            </p>
            <p>
              <a href={BRAND.phoneHref}>{BRAND.phone}</a>
            </p>
          </div>
          <div>
            <h4>Shop Now</h4>
            <Link to="/collections/new">New</Link>
            <Link to="/collections/coffee-tea-dining">Coffee, Tea & Dining</Link>
            <Link to="/collections/home-decor-1">Home Decor</Link>
            <Link to="/collections/storage-display">Storage & Display</Link>
            <Link to="/collections/lifestyle">Lifestyle</Link>
            <Link to="/collections/special-design">Special Design</Link>
          </div>
          <div>
            <h4>About You</h4>
            <Link to="/pages/our-story">About Us</Link>
            <Link to="/pages/contact">Contact Us</Link>
            <Link to="/pages/wholesale-inquiry">Bulk Order Inquiry</Link>
            <Link to="/pages/payment-methods">Payment Methods</Link>
          </div>
          <div>
            <h4>Need Help</h4>
            <Link to="/pages/order-shipping-policy">Order & Shipping Policy</Link>
            <Link to="/pages/estimated-shipping-time">Estimated Shipping Time</Link>
            <Link to="/pages/return-refund-policy">Return & Refund Policy</Link>
            <Link to="/pages/privacy-policy">Privacy Policy</Link>
            <Link to="/pages/terms-of-service">Terms of Service</Link>
            <Link to="/pages/price-protection">Price Protection Guarantee</Link>
            <Link to="/pages/faqs">FAQs</Link>
          </div>
        </div>
        <div className="wrap legal">© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</div>
      </footer>

      {cartOpen ? (
        <>
          <div className="drawer-bg" onClick={() => setCartOpen(false)} />
          <aside className="drawer">
            <header>
              <strong>Cart</strong>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </header>
            <div className="cart-lines">
              {cart.length === 0 ? <p>Your cart is empty.</p> : null}
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
                    <button className="icon-btn" onClick={() => removeItem(line.handle, line.variantId)}>
                      Remove
                    </button>
                  </div>
                  <div>{money(Number(line.price) * line.qty)}</div>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <p>Subtotal {money(cartTotal)}</p>
              <button className="btn" style={{ width: "100%" }} onClick={() => nav("/cart")}>
                View cart
              </button>
            </div>
          </aside>
        </>
      ) : null}

      {searchOpen ? (
        <div className="search-modal">
          <header>
            <strong>Search</strong>
            <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </header>
          <input
            autoFocus
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-results">
            {results.map((p) => (
              <Link key={p.handle} to={`/products/${p.handle}`} onClick={() => setSearchOpen(false)}>
                <img src={p.images[0]?.src} alt="" />
                <h3>{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="mobile-panel">
          <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
          <Logo />
          {[...NAV, SUPPORT_NAV, { label: "Our Story", href: "/pages/our-story" }].map((item) => (
            <div key={item.label}>
              {item.href ? <Link to={item.href}>{item.label}</Link> : <div>{item.label}</div>}
              {item.children?.map((c) => (
                <Link key={c.href} to={c.href} style={{ paddingLeft: 12 }}>
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
