# Frontend Mentor - Bookmark landing page solution

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158). This project focuses on demonstrating modern CSS layouts, implementing fully accessible tabbed navigation using WAI-ARIA authoring practices, utilizing the experimental CSS scroll-state Container Queries API for scroll-driven animations, and using the new CSS Anchor Positioning API for complex background decorations.

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

- [Astro v7](https://astro.build)
- [React v19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org)
- [Node.js v22](https://nodejs.org)

### What I learned

In this project, I learned how to configure clean import path mappings in Astro, implement fully accessible tabbed navigation, use CSS Anchor Positioning, and leverage experimental CSS scroll-state Container Queries.

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

- **Accessible Tablist Navigation (Roving tabindex)**

  Implementing keyboard-friendly tablist navigation following WAI-ARIA guidelines. By utilizing the _roving tabindex_ pattern (selected tab have tabindex="0", while unselected tab have tabindex="-1"), keyboard users can navigate tab buttons using the arrow keys, and `Enter` or `Space` to display the corresponding tabpanel.

  ```typescript
  const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
    );
    const currentIndex = tabs.indexOf(e.target as HTMLElement);

    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
      return;
    }

    let newIndex = currentIndex;
    if (e.key === "ArrowRight") {
      newIndex = currentIndex + 1;
    }
    if (e.key === "ArrowLeft") {
      newIndex = currentIndex - 1;
    }

    if (newIndex >= tabs.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = tabs.length - 1;
    }

    tabs[newIndex].focus();
  };
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

- **Modern CSS scroll-state Container Queries**

  I learned how to use the experimental CSS Container Queries `scroll-state()` feature to build a performant sticky header. By setting up a scroll container query on the root `html` element to detect scroll direction and another on the `.header` itself to detect stuck state, I was able to implement a "hide on scroll down, show on scroll up" header with a box-shadow that only appears when stuck, entirely without JavaScript!

  `Layout.css`

  ```css
  html {
    container: root-scroll / scroll-state;
  }
  ```

  `Header.css`

  ```css
  .header {
    position: sticky;
    container: header / scroll-state;
    inset-block-start: 0;
    ... /* other propeeties */ ...
    transition:
      translate 0.3s,
      background-color 0.4s 1.5s ease;

    @supports (container-type: scroll-state) {
      /* Hide on scroll down */
      @container root-scroll scroll-state(scrolled: block-end) {
        translate: 0 -100%;
      }

      /* Appear on scroll back up */
      @container root-scroll scroll-state(scrolled: block-start) {
        translate: 0 0;
      }

      /* add box shadow when header stuck */
      &::before {
        ... /* other propeeties */ ...
        transition: box-shadow 0.3s ease;

        @container header scroll-state(stuck: block-start) {
          box-shadow: var(--shadow);
        }
      }
    }
  }
  ```

### Continued development

### Useful resources

- [Chrome Developer: CSS scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries#progressive_enhancement) - This article was key in understanding how to set up container queries for scroll direction and stuck states, as well as handling progressive enhancement fallbacks for unsupported browsers.
- [Una Kravets: Directional CSS with scroll-state(scrolled)](https://una.im/scroll-state-scrolled) - Great breakdown and interactive demo explaining how the `scrolled` state queries behave, which helped clarify the direction detection implementation.
- [MDN ARIA: tab role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tab_role) - This resource helped me understand the correct semantics, keyboard interactions, and accessibility requirements for implementing a proper tabbed navigation interface.
- [TinyPNG](https://tinypng.com/) - Helped me compress and optimize the images in the project without losing quality, making the page load faster.
- [Cloudinary](https://cloudinary.com/) - Used to host the Open Graph and Twitter card images for social media sharing.
- [Perfect Pixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjlophiddqccjgplachon0304v) - Chrome extension that allowed me to overlay the design mockup directly on my live page for pixel-perfect accuracy.
- [Utopia](https://utopia.fyi/) - Excellent tool for planning and generating fluid responsive typography scales without relying on manual breakpoint calculations.

### AI Collaboration

## Author

- GitHub - [Force Close](https://github.com/forceclosee)
- Frontend Mentor - [@forceclosee](https://www.frontendmentor.io/profile/forceclosee)
- X - [@forceclosee](https://x.com/forceclosee)
