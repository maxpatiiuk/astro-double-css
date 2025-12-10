# Astro double-bundles imported CSS

If I have an ESM import of the same CSS file inside the `./pages/` folder and the `./components/` folder, the CSS file ends up being bundled twice in the production build (not expected).

This issue is not present in the dev server. This issue is not present in the non-Astro Vite build.

## Reproduction

1. Checkout the repository

   ```sh
   git clone https://github.com/maxpatiiuk/astro-double-css
    cd astro-double-css
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Run Astro build

   ```sh
   npx astro build
   ```

   Open `dist/index.html` and see that the `button{background:purple}` style is present twice (not expected).

4. Start the dev server

   ```sh
   npx astro dev
   ```

   Open dev tools and see that the `button{background:purple}` style is present only once (expected).

## Use case

This repository is the minimal reproduction.

In the real project, the CSS is imported by an external library (`@esri/calcite-components/components/calcite-button`). If I import that library in both the pages and the components directory, I get double-bundled CSS, and the order of CSS is different from the dev server. That library auto-imports CSS to simplify the get started instructions (It is one of half dozen libraries that an average `@esri/` user is using, so it auto-loads the CSS to reduce user friction).

Another example is that of `monaco-editor` (the editor that powers VS Code). They ship many small CSS files corresponding to each of the JavaScript files that render something. Those JavaScript files import the respective CSS files. The end result is that the final application bundle only contains the CSS that is used by any of the imported JavaScript files. This avoids the user having to manually import 30+ CSS files or ship dead CSS.
