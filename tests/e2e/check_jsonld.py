import asyncio, json
from playwright.async_api import async_playwright

PAGES = {
  "/": {"Person","Organization","WebSite","ProfilePage"},
  "/about": {"AboutPage","Person","BreadcrumbList"},
  "/bauerp": {"SoftwareApplication","Organization","BreadcrumbList"},
  "/portfolio": {"CollectionPage","BreadcrumbList"},
}

async def main():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width":1280,"height":1800})
        page = await ctx.new_page()
        for path, expected in PAGES.items():
            await page.goto("http://localhost:8080"+path, wait_until="domcontentloaded")
            blocks = await page.eval_on_selector_all(
                'script[type="application/ld+json"]', "els => els.map(e => e.textContent)")
            types, errors, items = set(), [], 0
            for b_ in blocks:
                try:
                    node = json.loads(b_)
                except Exception as e:
                    errors.append(f"invalid JSON: {e}")
                    continue
                for n in (node if isinstance(node, list) else [node]):
                    t = n.get("@type")
                    types |= set(t if isinstance(t, list) else [t])
                    if n.get("@type") == "CollectionPage":
                        il = n.get("mainEntity") or {}
                        items = len(il.get("itemListElement") or [])
                        if il.get("@type") != "ItemList": errors.append("CollectionPage.mainEntity is not ItemList")
                        if il.get("numberOfItems") != items: errors.append("numberOfItems mismatch")
            out[path] = {"blocks": len(blocks), "types": sorted(t for t in types if t),
                         "missing": sorted(expected - types), "listItems": items, "errors": errors}
        await b.close()
    print(json.dumps(out, indent=2))
    ok = all(not v["missing"] and not v["errors"] and v["blocks"] for v in out.values())
    print("RESULT:", "PASS" if ok else "FAIL")

asyncio.run(main())
