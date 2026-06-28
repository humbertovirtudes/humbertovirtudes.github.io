// Blog store. Seed posts come from markdown files in src/posts/.
// User edits (add/edit/delete) persist to localStorage, so the editor works
// fully client-side on GitHub Pages (no backend required).

import buildingWithAstryx from '../posts/building-with-astryx.md?raw';
import longVideoToShorts from '../posts/long-video-to-shorts.md?raw';

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  tags: string[];
  content: string; // markdown body
  readingMinutes: number;
};

export type PostDraft = Omit<Post, 'readingMinutes'>;

const STORAGE_KEY = 'hv.blog.posts.v1';

export function readingTime(md: string): number {
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || 'post';
}

function stripH1(md: string): string {
  return md.replace(/^#\s+.*\n+/, '');
}

// Seed posts (shipped with the site)
const SEED: PostDraft[] = [
  {
    slug: 'building-with-astryx',
    title: 'Building a CV, Portfolio & Blog with the Astryx Design System',
    date: '2026-06-27',
    excerpt:
      'Three things in one site — a CV, a portfolio, and a blog — built on an open source React design system.',
    tags: ['Design Systems', 'React', 'Meta'],
    content: stripH1(buildingWithAstryx),
  },
  {
    slug: 'long-video-to-shorts',
    title: 'From Long Video to Shorts: Notes on Shortcast',
    date: '2026-06-20',
    excerpt:
      'How I turn long videos into ready-to-post vertical shorts — and what shipping the boring 80% first taught me.',
    tags: ['AI Tooling', 'Python', 'Video'],
    content: stripH1(longVideoToShorts),
  },
];

function hydrate(drafts: PostDraft[]): Post[] {
  return drafts
    .map((d) => ({...d, readingMinutes: readingTime(d.content)}))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function cloneSeed(): PostDraft[] {
  // Deep-ish clone so callers never mutate the SEED constant by reference.
  return SEED.map((p) => ({...p, tags: [...p.tags]}));
}

function loadDrafts(): PostDraft[] {
  if (typeof localStorage === 'undefined') return cloneSeed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneSeed();
    const parsed = JSON.parse(raw) as PostDraft[];
    if (!Array.isArray(parsed) || parsed.length === 0) return cloneSeed();
    return parsed;
  } catch {
    return cloneSeed();
  }
}

function persist(drafts: PostDraft[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    /* quota or disabled — ignore */
  }
}

// --- Public API ---

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getPosts(): Post[] {
  return hydrate(loadDrafts());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function isSeed(slug: string): boolean {
  return SEED.some((s) => s.slug === slug);
}

function uniqueSlug(base: string, ignoreSlug?: string): string {
  const drafts = loadDrafts();
  let slug = base;
  let n = 2;
  while (drafts.some((d) => d.slug === slug && d.slug !== ignoreSlug)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export function savePost(input: {
  originalSlug?: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}): Post {
  const drafts = loadDrafts();
  const baseSlug = slugify(input.title);
  const isEditing = Boolean(input.originalSlug);

  // Derive an excerpt from the content when one isn't supplied.
  const excerpt =
    input.excerpt.trim() ||
    input.content
      .replace(/^#.*$/gm, '')
      .replace(/[#>*`_[\]()-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 150);

  let next: PostDraft;
  if (isEditing) {
    const idx = drafts.findIndex((d) => d.slug === input.originalSlug);
    const slug =
      slugify(drafts[idx]?.title ?? '') === baseSlug
        ? input.originalSlug!
        : uniqueSlug(baseSlug, input.originalSlug);
    next = {
      slug,
      title: input.title.trim(),
      date: input.date,
      excerpt,
      tags: input.tags,
      content: input.content,
    };
    if (idx >= 0) drafts[idx] = next;
    else drafts.unshift(next);
  } else {
    next = {
      slug: uniqueSlug(baseSlug),
      title: input.title.trim(),
      date: input.date,
      excerpt,
      tags: input.tags,
      content: input.content,
    };
    drafts.unshift(next);
  }

  persist(drafts);
  emit();
  return {...next, readingMinutes: readingTime(next.content)};
}

export function deletePost(slug: string): void {
  const drafts = loadDrafts().filter((d) => d.slug !== slug);
  persist(drafts);
  emit();
}

export function resetPosts(): void {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  emit();
}

export function exportMarkdown(post: Post): string {
  const front = [
    '---',
    `title: ${post.title}`,
    `date: ${post.date}`,
    `tags: ${post.tags.join(', ')}`,
    `excerpt: ${post.excerpt}`,
    '---',
    '',
    `# ${post.title}`,
    '',
  ].join('\n');
  return front + post.content;
}
