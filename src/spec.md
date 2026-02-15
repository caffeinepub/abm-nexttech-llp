# Specification

## Summary
**Goal:** Ensure the ABM Nexttech LLP logo reliably renders in the header and footer across all pages (desktop and mobile), with a text fallback if the image fails to load.

**Planned changes:**
- Fix logo asset referencing so the production build loads the correct static file path (including correct filename casing) and the logo is not hidden/zero-sized in header, mobile menu header, and footer.
- Add an image-load fallback that displays the text brand mark “ABM Nexttech LLP” in the same locations when the logo cannot be loaded.
- Adjust header/footer logo placement and spacing as needed to keep navigation and footer layouts aligned and readable on common breakpoints.

**User-visible outcome:** A visible logo appears in the top navigation (including the mobile menu header) and footer on Home/Services/Product/Contact pages, and if the image fails to load the site shows “ABM Nexttech LLP” instead of a missing/broken logo.
