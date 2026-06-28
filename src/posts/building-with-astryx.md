# Building a CV, Portfolio & Blog with the Astryx Design System

When I set out to build my personal site, I wanted three things in one place: a **CV** people could skim in 30 seconds, a **portfolio** that linked straight to real code, and a **blog** I'd actually keep writing in.

I also didn't want to hand-roll a component library. So I built the whole thing on [Astryx](https://github.com/facebook/astryx) — an open source, themeable, React + StyleX design system.

## Why a design system for a personal site?

It sounds like overkill. It isn't. Three reasons:

- **Consistency for free.** Every heading, button, and card already shares spacing, color, and type scales.
- **Theming.** Astryx ships multiple themes and dark mode out of the box. One provider re-themes the entire site.
- **Speed.** I spent my time on *content and layout*, not on re-inventing a Card component for the hundredth time.

## The stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite |
| Components | `@astryxdesign/core` |
| Routing | Hash-based (GitHub Pages friendly) |
| Blog | Markdown files rendered with the `Markdown` component |
| Hosting | GitHub Pages + Actions |

## What's next

I'll write here about the projects I'm building — design systems, AI tooling, and whatever else I'm learning. Thanks for reading.
