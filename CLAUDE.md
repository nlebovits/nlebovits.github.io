# Project: nlebovits.github.io

Personal website built with Eleventy (11ty).

## Package Manager

**Use pnpm** for all package operations:

```bash
pnpm install    # Install dependencies
pnpm start      # Start dev server
pnpm build      # Build for production
```

## Project Structure

```
src/
├── _layouts/       # Nunjucks layouts (base.njk, post.njk)
├── _includes/      # Partial templates
├── css/            # Stylesheets
├── posts/
│   ├── projects/   # Project posts
│   └── writing/    # Blog/writing posts
├── index.md        # Homepage
├── projects.njk    # Projects listing page
└── writing.njk     # Writing listing page
```

## Adding Content

### New Writing Post
Create `src/posts/writing/your-post.md`:
```yaml
---
layout: post.njk
title: "Your Title"
date: 2026-03-09
tags: ["writing", "optional-tag"]
---

Your content here...
```

### New Project
Create `src/posts/projects/your-project.md`:
```yaml
---
title: "Project Name"
date: 2026-03-09
tags: ["projects"]
thumbnail: "/assets/projects/your-image.png"
url: "https://project-url.com/"
description: "Short description."
---
```
