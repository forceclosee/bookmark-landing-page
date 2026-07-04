# Frontend Mentor - Bookmark landing page solution

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158).

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
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

In this project, I learned how to configure clean import path mappings in Astro.

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

### Continued development

### Useful resources

- [TinyPNG](https://tinypng.com/) - Helped me compress and optimize the images in the project without losing quality, making the page load faster.
- [Cloudinary](https://cloudinary.com/) - Used to host the Open Graph and Twitter card images for social media sharing.
- [Perfect Pixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjlophiddqccjgplachon0304v) - Chrome extension that allowed me to overlay the design mockup directly on my live page for pixel-perfect accuracy.

### AI Collaboration

## Author

- GitHub - [Force Close](https://github.com/forceclosee)
- Frontend Mentor - [@forceclosee](https://www.frontendmentor.io/profile/forceclosee)
- X - [@forceclosee](https://x.com/forceclosee)
