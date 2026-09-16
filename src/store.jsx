import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);
const CART_KEY = "minshow-cart";
const THEME_KEY = "minshow-theme";

export function StoreProvider({ children }) {
  const [catalog, setCatalog] = useState(null);
  const [articles, setArticles] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/catalog.json`).then((r) => r.json()),
      fetch(`${import.meta.env.BASE_URL}data/articles.json`).then((r) => r.json()).catch(() => ({ articles: [] })),
    ]).then(([cat, art]) => {
      setCatalog(cat);
      setArticles(art.articles || []);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const productsByHandle = useMemo(() => {
    const map = {};
    for (const p of catalog?.products || []) map[p.handle] = p;
    return map;
  }, [catalog]);

  const collectionsByHandle = useMemo(() => {
    const map = {};
    for (const c of catalog?.collections || []) map[c.handle] = c;
    return map;
  }, [catalog]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce((n, i) => n + Number(i.price) * i.qty, 0);

  const value = {
    catalog,
    articles,
    productsByHandle,
    collectionsByHandle,
    cart,
    cartCount,
    cartTotal,
    theme,
    setTheme,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    mobileOpen,
    setMobileOpen,
    getProduct: (handle) => productsByHandle[handle],
    getCollection: (handle) => collectionsByHandle[handle],
    addToCart(item) {
      setCart((prev) => {
        const idx = prev.findIndex(
          (x) => x.handle === item.handle && x.variantId === item.variantId
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty || 1) };
          return next;
        }
        return [...prev, { ...item, qty: item.qty || 1 }];
      });
      setCartOpen(true);
    },
    updateQty(handle, variantId, qty) {
      setCart((prev) =>
        prev
          .map((x) =>
            x.handle === handle && x.variantId === variantId ? { ...x, qty } : x
          )
          .filter((x) => x.qty > 0)
      );
    },
    removeItem(handle, variantId) {
      setCart((prev) => prev.filter((x) => !(x.handle === handle && x.variantId === variantId)));
    },
    clearCart() {
      setCart([]);
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
