# Search Console workflow (hacksvalorant.com)

You verify the domain at your DNS provider—no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `hacksvalorant.com` if it is not already there.
2. Under **Sitemaps**, submit the index first (required):
   - `https://hacksvalorant.com/sitemap.xml`
3. Optional — submit child sitemaps too (same URLs, clearer GSC status per section):
   - `https://hacksvalorant.com/sitemap-pages.xml`
   - `https://hacksvalorant.com/sitemap-products.xml`
   - `https://hacksvalorant.com/sitemap-blog.xml`
   - `https://hacksvalorant.com/sitemap-forum.xml`
4. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page on your site, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep under ~60 characters for the title where possible).
5. Deploy. Allow 1–2 weeks before judging click-through changes.

## Path hack sheet

| Common query intent | Edit path in `pageSeo.ts` |
| ------------------- | ------------------------- |
| valorant hacks (broad) | `/` |
| lite / pro / elite | `/hacks/compare/`, `/hacks/lite/`, etc. |
