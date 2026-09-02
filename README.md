# edBuddy Pro — site

## Structure

    /                          one HTML file per page
    /components/nav.html       markup + styles + behaviour, self-contained
    /components/footer.html
    /components/bottom-bar.html
    /js/site.js                swaps the slots for the components

Each component is a single file: its `<style>`, its markup and its
`<script>` together. Nothing else to link, nothing to import. To change
the nav, open `components/nav.html`.

Components use `var(--token, fallback)` throughout, so they render
correctly even on a page that defines no design tokens.

## Running it

`fetch()` is blocked on `file://`, so serve the folder:

    python3 -m http.server 8000
    # http://localhost:8000/index.html

## Adding a page

Copy any existing page and keep these four lines:

    <div data-include="nav"></div>
    ... page content ...
    <div data-include="footer"></div>
    <div data-include="bottom-bar"></div>
    <script src="js/site.js" defer></script>

Page-specific CSS goes in that page's own `<style>` block, along with
the `:root` tokens, reset and `.page-grid` lattice.

Nav active state is automatic — the nav component matches the current
filename against its own links and sets `aria-current="page"`.

`site:ready` fires on `document` once every component is in place. Hook
any page script that touches the nav, footer or bottom bar to it:

    document.addEventListener('site:ready', function () { ... });

## Notes

- Images are inlined as base64 for now. Every `<img>` carries
  `data-src` with its real path for when the server is up.
- The mega-menu links HR only; marketing, finance, sales and product
  are not in it yet, so their nav active state never fires.
- `about.html` is linked from the nav and footer but does not exist.
- Inline `onclick` handlers have been removed from the nav in favour of
  listeners in the component script.
