# humbertovirtudes.github.io

My personal site — **CV**, **portfolio**, and **blog** in one — built with the
[Astryx](https://github.com/facebook/astryx) design system (React + StyleX) and
deployed to GitHub Pages.

**Live:** https://humbertovirtudes.github.io/

## What's inside

- **Home** — intro, featured projects, latest posts
- **CV** — summary, skills, experience, education (`src/data/profile.ts`)
- **Projects** — filterable portfolio from `src/data/projects.ts`
- **Blog** — markdown posts in `src/posts/`, registered in `src/data/blog.ts`
- **Theme switcher** (5 themes) + light/dark mode

## Editing

| To change… | Edit… |
|---|---|
| Your bio, skills, experience, education | `src/data/profile.ts` |
| Portfolio projects | `src/data/projects.ts` |
| Blog posts | add a `.md` in `src/posts/`, register it in `src/data/blog.ts` |

> Some CV fields (experience, degree, LinkedIn) are placeholders marked `TODO` —
> fill them in with your real details.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
publishes to GitHub Pages automatically.

---

Built with [Astryx](https://github.com/facebook/astryx) · React + StyleX
