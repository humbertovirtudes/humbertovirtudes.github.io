// Blog post registry.
// To add a post: drop a .md file in src/posts/, import it with ?raw, and add an entry.

import buildingWithAstryx from '../posts/building-with-astryx.md?raw';
import longVideoToShorts from '../posts/long-video-to-shorts.md?raw';

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  excerpt: string;
  tags: string[];
  content: string;
};

function readingTime(md: string): number {
  const words = md.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const raw: Omit<Post, 'readingMinutes'>[] = [
  {
    slug: 'building-with-astryx',
    title: 'Building a CV, Portfolio & Blog with the Astryx Design System',
    date: '2026-06-27',
    excerpt:
      'Three things in one site — a CV, a portfolio, and a blog — built on an open source React design system.',
    tags: ['Design Systems', 'React', 'Meta'],
    content: buildingWithAstryx,
  },
  {
    slug: 'long-video-to-shorts',
    title: 'From Long Video to Shorts: Notes on Shortcast',
    date: '2026-06-20',
    excerpt:
      'How I turn long videos into ready-to-post vertical shorts — and what shipping the boring 80% first taught me.',
    tags: ['AI Tooling', 'Python', 'Video'],
    content: longVideoToShorts,
  },
];

export const posts: Post[] = raw
  .map((p) => ({...p, readingMinutes: readingTime(p.content)}))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
