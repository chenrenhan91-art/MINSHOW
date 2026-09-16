export function asset(path) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${String(path).replace(/^\//, "")}`;
}

export const BRAND = {
  name: "MINSHOW",
  legal: "MINSHOW TRADING LIMITED",
  tagline: "A small workshop with a big love for pure, natural walnut.",
  quote: "Solid walnut, made to be lived with",
  hours: "Mon-Fri, 9 AM-6 PM (GMT+8)",
  phone: "+852 96915310",
  phoneHref: "tel:+85296915310",
  email: "support@minshowonline.com",
  inbox: "kinopayment@outlook.com",
  emailHref: "mailto:kinopayment@outlook.com",
  address: [
    "M10, ROOM 1017, 10/F, WING HING",
    "INDUSTRIAL BUILDING, NO.83-93",
    "CHAI WAN KOK ST, TSUEN WAN,",
    "HONG KONG",
  ],
};

export function openInboxMail({ subject, body }) {
  const query = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ]
    .filter(Boolean)
    .join("&");
  window.location.href = `mailto:${BRAND.inbox}${query ? `?${query}` : ""}`;
}

export const ANNOUNCEMENTS = [
  "10% Off for First Purchase! Code: NEW10",
  "100% Natural Solid Wood, No Veneer, No Color Paint",
  "Delivered Duty Paid, No Hidden Fees!",
];

export const NAV = [
  { label: "All Crafts", href: "/collections/all-crafts" },
  {
    label: "Coffee, Tea & Dining",
    href: "/collections/coffee-tea-dining",
    children: [
      { label: "Coffee Essentials", href: "/collections/coffee-tools-collection" },
      { label: "Tea Essentials", href: "/collections/tea-essentials" },
      { label: "Coaster & Trivet", href: "/collections/coaster-trivet" },
      { label: "Serving Boards & Trays", href: "/collections/wooden-cutting-boards" },
      { label: "Knife Block & Tableware", href: "/collections/tableware" },
      { label: "Fruit Pick", href: "/collections/fruit-pick" },
    ],
  },
  {
    label: "Storage & Display",
    href: "/collections/storage-display",
    children: [
      { label: "Jewelry Box & Organizer", href: "/collections/jewelry-box-organizer" },
      { label: "Watch Box & Watch Winder", href: "/collections/watch-box-watch-winder" },
      { label: "Makeup Organizer", href: "/collections/makeup-organizer" },
      { label: "Storage Cabinet & Rack", href: "/collections/storage-cabinet-rack" },
      { label: "CD Storage", href: "/collections/cd-storage" },
      { label: "Baby Tooth Keepsake Box", href: "/collections/baby-tooth-keepsake-box" },
      { label: "Eyewear Case & Holder", href: "/collections/eyewear-case-holder" },
      { label: "Other Storage", href: "/collections/wooden-storage-rack-and-box" },
    ],
  },
  {
    label: "Home Decor",
    href: "/collections/home-decor-1",
    children: [
      { label: "Flower Vase & Holder", href: "/collections/cat-dog-vase" },
      { label: "Tissue Box & Holder", href: "/collections/tissue-box-holder" },
      { label: "Picture Frame", href: "/collections/picture-frame" },
      { label: "Fridge Magnet", href: "/collections/fridge-megnet" },
      { label: "Decorative Sculpture", href: "/collections/decorative-sculpture" },
      { label: "Board Games", href: "/collections/board-games" },
    ],
  },
  {
    label: "Lifestyle",
    href: "/collections/lifestyle",
    children: [
      { label: "Phone & Laptop Holder", href: "/collections/phone-laptop-holder" },
      { label: "Keychain", href: "/collections/keychain" },
      { label: "Candle & Incense Holder", href: "/collections/candle-incense-holder" },
      { label: "Calendar & Desk Accessories", href: "/collections/calendar-desk-accessories" },
      { label: "Speaker & Stand", href: "/collections/speaker-stand" },
      { label: "Bottle Opener", href: "/collections/bottle-opener" },
      { label: "Necklace & Bracelet", href: "/collections/necklace-bracelet" },
      { label: "Mirror & Comb", href: "/collections/mirror" },
      { label: "Shoe Horn", href: "/collections/shoe-horn" },
      { label: "Stationery", href: "/collections/stationery" },
      { label: "Car Decoration", href: "/collections/car-decoration" },
    ],
  },
  {
    label: "By Design",
    href: "/collections/special-design",
    children: [
      { label: "Special Design", href: "/collections/special-design" },
      { label: "Animal Design", href: "/collections/animal-design" },
      { label: "Food Design", href: "/collections/fruit-design" },
      { label: "Minimalist Style", href: "/collections/minimalist-style" },
      { label: "Retro Style", href: "/collections/retro-style" },
      { label: "Textured Style", href: "/collections/textured-style" },
      { label: "Wood & Metal", href: "/collections/wood-metal" },
    ],
  },
];

export const SUPPORT_NAV = {
  label: "Support",
  children: [
    { label: "Contact Us", href: "/pages/contact" },
    { label: "FAQs", href: "/pages/faqs" },
    { label: "Order & Shipping Policy", href: "/pages/order-shipping-policy" },
    { label: "Estimated Shipping Time", href: "/pages/estimated-shipping-time" },
    { label: "Return & Refund Policy", href: "/pages/return-refund-policy" },
    { label: "Bulk Order Inquiry", href: "/pages/wholesale-inquiry" },
    { label: "Price Protection Guarantee", href: "/pages/price-protection" },
  ],
};

export const HOME_COLLECTIONS = [
  { handle: "coffee-tea-dining", title: "Coffee,Tea & Dining", image: asset("images/col-coffee.jpg") },
  { handle: "jewelry-box-organizer", title: "Jewelry Box & Organizer", image: asset("images/col-jewelry.jpg") },
  { handle: "home-decor-1", title: "Home Decor", image: asset("images/col-decor.jpg") },
  { handle: "coaster-trivet", title: "Coaster & Trivet", image: asset("images/col-coaster.webp") },
  { handle: "animal-design", title: "Animal Design", image: asset("images/col-animal.jpg") },
  { handle: "storage-display", title: "Storage & Display", image: asset("images/col-storage.jpg") },
  { handle: "wooden-cutting-boards", title: "Serving Boards & Trays", image: asset("images/col-boards.jpg") },
  { handle: "tissue-box-holder", title: "Tissue Box & Holder", image: asset("images/col-tissue.webp") },
];

export const HOME_FEATURED = [
  {
    eyebrow: "For Home Decor Addicts",
    title: "Add A Touch of Decor to Your Home",
    handles: [
      "natureline-walnut-tissue-box",
      "wooden-fruit-ornament-cute-desktop-decor-gift",
      "meow-natural-wooden-flower-vase",
      "anglerfish-walnut-snack-clip-fridge-magnet",
      "north-american-black-walnut-cute-no-face-ornament",
      "monster-beech-tissue-box",
      "solid-wood-animal-series-fridge-magnets",
      "honeybear-walnut-tissue-box",
    ],
  },
  {
    title: "Dining & Kitchen Accessories",
    subtitle: "Bring warmth and joy to every meal",
    handles: [
      "drumstick-bottle-opener-fridge-magnet",
      "minimalist-walnut-pour-over-coffee-filter-holder",
      "diy-sanding-kit-semi-finished-black-walnut-spoon",
      "rishi-textured-black-walnut-wooden-tea-tray",
    ],
  },
  {
    title: "A Little Order Makes Life Feel Lighter",
    subtitle: "Storage & Closet",
    handles: [
      "minimalist-square-wooden-storage-box",
      "timberwire-black-walnut-power-cable-organizer-box",
      "black-walnut-dual-layer-storage-rack",
      "orlan-solid-walnut-key-holder-stand",
    ],
  },
  {
    title: "Lifestyle Essentials",
    subtitle: "Small details that brighten your day",
    handles: [
      "walnut-cat-jewelry-organizer-box",
      "minimalist-walnut-phone-stand",
      "north-american-black-walnut-cute-no-face-ornament",
      "toto-wooden-keychain",
    ],
  },
];

export function money(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return `$${n.toFixed(2)}`;
}

export function productPrice(product) {
  if (!product?.variants?.length) return { price: "0.00", compare: null, from: false };
  const prices = product.variants.map((v) => Number(v.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const compare = product.variants.find((v) => v.compare)?.compare || null;
  return {
    price: min.toFixed(2),
    compare,
    from: min !== max,
  };
}
