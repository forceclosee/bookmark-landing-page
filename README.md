# Frontend Mentor - Bookmark landing page solution

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158). This project focuses on demonstrating modern CSS layouts, particularly using the new CSS Anchor Positioning API for complex background decorations.

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### Features

### Screenshot

<!-- isi screenshot -->

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://your-solution-url.com) <!-- ganti link -->
- Live Site URL: [live site URL](https://your-live-site-url.com) <!-- ganti link -->

## My process

### Built with

- [Astro v7](https://astro.build) - Framework
- [TypeScript v5](https://www.typescriptlang.org) - Language
- [Node.js v22](https://nodejs.org) - Runtime
- Semantic HTML5 markup
- CSS custom properties
- CSS Anchor Positioning (Modern Layout API)
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

In this project, I learned how to configure clean import path mappings in Astro, as well as CSS Anchor Positioning.

- **Modern TypeScript Path Aliases**

  Configuring path aliases (like `@components/*`) helps avoid verbose and fragile relative paths (e.g., `../../`).

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@components/*": ["./src/components/*"],
        "@img/*": ["./src/img/*"]
      }
    }
  }
  ```

- **Modern CSS Anchor Positioning**

  I learned how to position absolute decorative shapes relative to an anchor without establishing a positioned ancestor context. By using implicit default anchors and locking one coordinate to the viewport boundary, the shape dynamically scales with the illustration wrapper and extends to the screen edge without triggering horizontal layout overflow.

  ```css
  .bg-shape {
    position: absolute;
    position-anchor: --hero; /* Define the default anchor */

    /* Auto-stretch from the anchor's start edge to the viewport's end edge */
    inset-inline-start: calc(anchor(start) + anchor-size(inline) * 0.19);
    inset-inline-end: 0;
  }
  ```

### Continued development

### Useful resources

- [TinyPNG](https://tinypng.com/) - Helped me compress and optimize the images in the project without losing quality, making the page load faster.
- [Cloudinary](https://cloudinary.com/) - Used to host the Open Graph and Twitter card images for social media sharing.
- [Perfect Pixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjlophiddqccjgplachon0304v) - Chrome extension that allowed me to overlay the design mockup directly on my live page for pixel-perfect accuracy.
- [Utopia](https://utopia.fyi/) - Excellent tool for planning and generating fluid responsive typography scales without relying on manual breakpoint calculations.

### AI Collaboration

## Author

- GitHub - [Force Close](https://github.com/forceclosee)
- Frontend Mentor - [@forceclosee](https://www.frontendmentor.io/profile/forceclosee)
- X - [@forceclosee](https://x.com/forceclosee)
