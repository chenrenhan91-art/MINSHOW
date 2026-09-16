#!/usr/bin/env python3
"""Build compact catalog JSON and download key storefront assets."""
from __future__ import annotations

import html as htmlmod
import json
import re
import ssl
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA = PUBLIC / "data"
IMG = PUBLIC / "images"
SRC_TMP = Path("/tmp/walnut")

CTX = ssl.create_default_context()
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

COLLECTIONS = [
    "all-crafts",
    "animal-design",
    "baby-tooth-keepsake-box",
    "board-games",
    "bottle-opener",
    "calendar-desk-accessories",
    "candle-incense-holder",
    "car-decoration",
    "cat-dog-vase",
    "cd-storage",
    "coaster-trivet",
    "coffee-tools-collection",
    "coffee-tea-dining",
    "decorative-sculpture",
    "eyewear-case-holder",
    "fridge-megnet",
    "fruit-design",
    "fruit-pick",
    "home-decor-1",
    "jewelry-box-organizer",
    "keychain",
    "tableware",
    "lifestyle",
    "makeup-organizer",
    "minimalist-style",
    "mirror",
    "necklace-bracelet",
    "new",
    "wooden-storage-rack-and-box",
    "phone-laptop-holder",
    "picture-frame",
    "retro-style",
    "shoe-horn",
    "speaker-stand",
    "special-design",
    "stationery",
    "storage-cabinet-rack",
    "storage-display",
    "tea-essentials",
    "textured-style",
    "tissue-box-collection",
    "tissue-box-holder",
    "top-picks",
    "watch-box-watch-winder",
    "wood-metal",
    "wooden-cutting-boards",
    "wooden-dining-collection",
    "wooden-jewelry-box",
]

ARTICLES = [
    "why-are-some-wooden-products-so-cheap-understanding-the-real-cost-behind-quality-wood-products",
    "black-walnut-cherry-wood-and-burmese-teak-understanding-their-uses-in-furniture-and-home-design",
    "the-beauty-of-imperfection-what-you-should-know-before-buying-solid-wood-products",
    "how-solid-wood-products-are-made-the-difference-between-handmade-and-machine-assisted-craftsmanship",
    "is-engineered-wood-safe-formaldehyde-risks",
    "10-types-of-solid-wood-explained-properties-uses-and-buying-guide",
    "how-to-identify-real-black-walnut-avoid-fake-walnut-wood",
    "why-walnut-wood-is-loved-by-designers-worldwide",
    "understanding-wood-patina-why-natural-wood-gets-more-beautiful-with-age",
    "solid-wood-vs-mdf-understanding-the-differences-between-natural-wood-and-engineered-wood",
]


def rebrand(text: str | None) -> str:
    if not text:
        return ""
    replacements = [
        (r"support@walnutaddicted\.com", "+852 96915310"),
        (r"collab@walnutaddicted\.com", "+852 96915310"),
        (r"https?://(www\.)?walnutaddicted\.com", ""),
        (r"walnutaddicted\.com", ""),
        (r"WalnutAddicted", "MINSHOW"),
        (r"Walnut Addicted", "MINSHOW"),
        (r"walnut addicted", "MINSHOW"),
        (r"WALNUT ADDICTED", "MINSHOW"),
    ]
    out = text
    for pat, rep in replacements:
        out = re.sub(pat, rep, out, flags=re.I)
    return out


def shopify_img(src: str | None, width: int = 900) -> str:
    if not src:
        return ""
    src = src.replace("http://", "https://")
    if src.startswith("//"):
        src = "https:" + src
    base, _, query = src.partition("?")
    return f"{base}?width={width}"


def fetch(url: str, retries: int = 3) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    last = None
    for i in range(retries):
        try:
            with urllib.request.urlopen(req, context=CTX, timeout=40) as res:
                return res.read()
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(0.6 * (i + 1))
    raise RuntimeError(f"fetch failed {url}: {last}")


def fetch_json(url: str):
    raw = fetch(url)
    return json.loads(raw.decode("utf-8", "replace"))


def save_bytes(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def load_products() -> list[dict]:
    items = []
    for name in ("products1.json", "products2.json"):
        payload = json.loads((SRC_TMP / name).read_text())
        items.extend(payload.get("products", []))
    compact = []
    seen = set()
    for p in items:
        handle = p.get("handle")
        if not handle or handle in seen:
            continue
        if handle in {"order-balance-payment", "prototype-order"}:
            continue
        seen.add(handle)
        images = []
        for img in p.get("images") or []:
            src = shopify_img(img.get("src"), 1000)
            if src:
                images.append({"src": src, "alt": img.get("alt") or p.get("title") or ""})
        variants = []
        for v in p.get("variants") or []:
            variants.append(
                {
                    "id": v.get("id"),
                    "title": v.get("title") or "Default",
                    "price": v.get("price") or "0.00",
                    "compare": v.get("compare_at_price"),
                    "available": bool(v.get("available", True)),
                    "sku": v.get("sku") or "",
                    "option1": v.get("option1"),
                    "option2": v.get("option2"),
                    "option3": v.get("option3"),
                }
            )
        options = [{"name": o.get("name"), "values": o.get("values") or []} for o in p.get("options") or []]
        compact.append(
            {
                "id": p.get("id"),
                "handle": handle,
                "title": rebrand(p.get("title") or ""),
                "type": p.get("product_type") or "",
                "tags": p.get("tags") if isinstance(p.get("tags"), list) else [],
                "body": rebrand(p.get("body_html") or ""),
                "images": images[:12],
                "variants": variants,
                "options": options,
            }
        )
    return compact


def collection_meta() -> dict[str, dict]:
    meta: dict[str, dict] = {}
    c1 = json.loads((SRC_TMP / "collections.json").read_text())
    for c in c1.get("collections", []):
        meta[c["handle"]] = c
    extra_dir = SRC_TMP / "collmeta"
    if extra_dir.exists():
        for f in extra_dir.glob("*.json"):
            try:
                payload = json.loads(f.read_text())
            except json.JSONDecodeError:
                continue
            col = payload.get("collection") or payload
            handle = col.get("handle")
            if handle:
                meta[handle] = col
    return meta


def fetch_collection_handles(handle: str) -> list[str]:
    handles: list[str] = []
    page = 1
    while page <= 3:
        url = f"https://walnutaddicted.com/collections/{handle}/products.json?limit=250&page={page}"
        try:
            payload = fetch_json(url)
        except Exception:
            break
        products = payload.get("products") or []
        if not products:
            break
        for p in products:
            h = p.get("handle")
            if h and h not in handles:
                handles.append(h)
        if len(products) < 250:
            break
        page += 1
    return handles


def scrape_article(handle: str) -> dict | None:
    url = f"https://walnutaddicted.com/blogs/wood-knowledge/{handle}"
    try:
        html = fetch(url).decode("utf-8", "replace")
    except Exception as exc:
        print("article fail", handle, exc)
        return None
    title_m = re.search(r"<h1[^>]*>([\s\S]{0,300})</h1>", html)
    title = re.sub("<[^>]+>", "", title_m.group(1)).strip() if title_m else handle
    img_m = re.search(r'property="og:image" content="([^"]+)"', html)
    image = shopify_img(img_m.group(1), 1200) if img_m else ""
    desc_m = re.search(r'property="og:description" content="([^"]*)"', html)
    excerpt = htmlmod.unescape(desc_m.group(1)) if desc_m else ""
    body = ""
    for pat in [
        r'class="[^"]*article-content[^"]*"[\s\S]*?>([\s\S]{0,40000})</div>\s*</div>',
        r'class="[^"]*rte[^"]*"[\s\S]*?>([\s\S]{0,40000})</div>',
    ]:
        m = re.search(pat, html)
        if m:
            body = m.group(1)
            break
    body = rebrand(body)
    if not body:
        # fallback: keep excerpt
        body = f"<p>{excerpt}</p>"
    return {
        "handle": handle,
        "title": rebrand(title),
        "excerpt": rebrand(excerpt),
        "image": image,
        "body": body,
    }


def download_named(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        data = fetch(url)
        dest.write_bytes(data)
        print("saved", dest.name, len(data))
    except Exception as exc:
        print("skip", dest.name, exc)


def main() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    IMG.mkdir(parents=True, exist_ok=True)

    products = load_products()
    by_handle = {p["handle"]: p for p in products}
    print("products", len(products))

    meta = collection_meta()
    collections = []
    for handle in COLLECTIONS:
        info = meta.get(handle, {})
        title = info.get("title") or handle.replace("-", " ").title()
        image = ""
        img_obj = info.get("image") or {}
        if isinstance(img_obj, dict):
            image = shopify_img(img_obj.get("src"), 900)
        handles = fetch_collection_handles(handle)
        handles = [h for h in handles if h in by_handle]
        if handle == "all-crafts" and not handles:
            handles = [p["handle"] for p in products]
        collections.append(
            {
                "handle": handle,
                "title": title,
                "image": image,
                "count": len(handles) or info.get("products_count") or 0,
                "products": handles,
            }
        )
        print("collection", handle, len(handles))

    articles = []
    for handle in ARTICLES:
        art = scrape_article(handle)
        if art:
            articles.append(art)
            print("article", art["title"][:70])

    catalog = {"products": products, "collections": collections}
    (DATA / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")))
    (DATA / "articles.json").write_text(json.dumps({"articles": articles}, ensure_ascii=False))
    print("wrote catalog", (DATA / "catalog.json").stat().st_size)

    assets = {
        "https://walnutaddicted.com/cdn/shop/files/banner.jpg": IMG / "banner.jpg",
        "https://walnutaddicted.com/cdn/shop/files/bannerm.jpg": IMG / "bannerm.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/688474eef375405abd484aea18f7708e.thumbnail.0000000000.jpg?width=1600": IMG / "about.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/db9fb3d87e8e444b8d2a5800ada1d8b9.thumbnail.0000000000.jpg?width=1600": IMG / "about-2.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/54aafe96959041b9a1ad33e4a7f860fa.thumbnail.0000000000.jpg?width=1200": IMG / "life-1.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/4028f24635e248638230bcb06633f277.thumbnail.0000000000.jpg?width=1200": IMG / "life-2.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/2cda4bd6596b4309b1e9e7093ebd4f2f.thumbnail.0000000000.jpg?width=1200": IMG / "life-3.jpg",
        "https://walnutaddicted.com/cdn/shop/files/preview_images/1609e314f57846709e1ff623dc4f6176.thumbnail.0000000000.jpg?width=1200": IMG / "life-4.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/Walnut_Base_Coffee_Dripper_Stand.jpg": IMG / "col-coffee.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/wooden_cat_jewelry_box.jpg": IMG / "col-jewelry.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/Handmade_Wooden_Doggy_Flower_Vase_da409359-b58e-44b8-b537-7c9085bbf95a.jpg": IMG / "col-decor.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/Wooden_Cat_Paw_Coaster_Set.webp": IMG / "col-coaster.webp",
        "https://walnutaddicted.com/cdn/shop/collections/Wooden_Adorable_Cat_Coaster_Set.jpg": IMG / "col-animal.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/Toto_Walnut_Storage_Cabinet_17e421a9-6272-47c4-8760-c62ffac1a7ed.jpg": IMG / "col-storage.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/solid_wood_kitchen_cutting_board.jpg": IMG / "col-boards.jpg",
        "https://walnutaddicted.com/cdn/shop/collections/Black_Walnut_Wood_Tissue_Storage_Box_for_Home.webp": IMG / "col-tissue.webp",
    }
    mark_src = Path("/Users/yuzai/.cursor/projects/Users-yuzai-6/assets/minshow-mark.png")
    if mark_src.exists():
        save_bytes(IMG / "logo-mark.png", mark_src.read_bytes())

    for url, dest in assets.items():
        if dest.suffix == ".mp4" and dest.exists() and dest.stat().st_size > 100000:
            continue
        download_named(url, dest)


if __name__ == "__main__":
    main()
