# grousestudio.au

The Grouse website. GitHub Pages builds it automatically (Jekyll) on every push to `main`. A push is live in about a minute.

## Publish a blog post

Add one file to `_posts/` named `YYYY-MM-DD-the-url-slug.md`. The slug becomes the address: `grousestudio.au/the-url-slug/`.

```
---
layout: post
title: "Why We Train Heavy Twice a Week"
description: "One or two sentences. This is what Google shows under the title."
categories: [training-programming]
image: /assets/blog/my-photo.jpg
---

Write the post here. A blank line starts a new paragraph.

## A subheading

**Bold**, *italic*, [a link](/memberships/).
```

- **Categories:** `training-programming`, `nutrition-wellbeing`, `mindset-motivation`, `studio-community`.
- **Photo:** upload it to `assets/blog/` first. Leave `image` out if the post has no photo.
- **Schedule a post:** a future date in the filename holds it back, but it only appears on the first push after that date.
- **Not ready yet?** Keep drafts out of this repo. It's public, so anyone can read what's here.

To do it from a browser: on GitHub open `_posts/`, choose **Add file**, paste, and **Commit**. The sitemap, RSS feed, blog list, category pages and SEO tags all update themselves.

## SEO

Imported pages and posts keep the exact tags Rank Math produced, in `seo_head` at the top of each file. Edit the title or description there. New posts get theirs from `title`, `description` and `image`.

Set `sitemap: false` on a page to keep it out of the sitemap. Add `redirect_from: ["/old-address/"]` on a page to redirect an old URL to it.

## Go live on the domain

In `_config.yml` set `baseurl: ""` and `preview: false`, and add a `CNAME` file containing `grousestudio.au`. Then point DNS at GitHub. Preview mode blocks search engines and switches off analytics and pixels.

## Contact form

The form posts to a Google Apps Script under josh@grousestudio.au, which emails hello@grousestudio.au. Source: `_tools/contact-form.gs`. The URL is `contact_form_endpoint` in `_config.yml`.

## Images

Everything in `wp-content/` is kept at its old WordPress path so existing image links keep working.
