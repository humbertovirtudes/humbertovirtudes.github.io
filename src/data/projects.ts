// Portfolio projects. The "featured" ones surface on the home page.
// Pulled from your public GitHub repos — edit freely.

export type Project = {
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  year: string;
  url: string;
  demo?: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'astryx-page',
    title: 'Astryx Landing Page',
    description:
      'A landing page built entirely with the Astryx design system — live theme switcher across 7 themes, dark mode, auto-deployed to GitHub Pages.',
    language: 'TypeScript',
    stars: 0,
    year: '2026',
    url: 'https://github.com/humbertovirtudes/astryx-page',
    demo: 'https://humbertovirtudes.github.io/astryx-page/',
    tags: ['React', 'Design Systems', 'Vite'],
    featured: true,
  },
  {
    name: 'shortcast-windows',
    title: 'Shortcast',
    description:
      'Turns long videos into ready-to-post shorts for TikTok, Instagram Reels, and YouTube Shorts. A practical AI/media-processing pipeline.',
    language: 'Python',
    stars: 0,
    year: '2026',
    url: 'https://github.com/humbertovirtudes/shortcast-windows',
    tags: ['Python', 'Video', 'AI Tooling'],
    featured: true,
  },
  {
    name: 'comfyui-front',
    title: 'ComfyUI Front-End',
    description:
      'A simple, focused web UI for AI image generation with ComfyUI — a clean front-end over a powerful but complex backend.',
    language: 'TypeScript',
    stars: 0,
    year: '2026',
    url: 'https://github.com/humbertovirtudes/comfyui-front',
    tags: ['TypeScript', 'React', 'AI Tooling'],
    featured: true,
  },
  {
    name: 'LittleLemon-API',
    title: 'Little Lemon API',
    description:
      'A restaurant ordering REST API built with Django REST Framework — auth, roles, menu, cart, and order management. Part of the Meta Back-End certificate.',
    language: 'Python',
    stars: 0,
    year: '2026',
    url: 'https://github.com/humbertovirtudes/LittleLemon-API',
    tags: ['Python', 'Django', 'REST'],
    featured: true,
  },
  {
    name: 'littlelemon-capstone',
    title: 'Little Lemon Capstone',
    description:
      'The capstone project for the Meta Back-End Developer Professional Certificate.',
    language: 'Python',
    stars: 0,
    year: '2026',
    url: 'https://github.com/humbertovirtudes/littlelemon-capstone',
    tags: ['Python', 'Django'],
  },
  {
    name: 'AngryBots_ECS_2020.3',
    title: 'AngryBots ECS',
    description:
      "A Unity DOTS/ECS sample updated for Unity 2020.3 — exploring data-oriented design and Unity's Entity Component System.",
    language: 'C#',
    stars: 3,
    year: '2021',
    url: 'https://github.com/humbertovirtudes/AngryBots_ECS_2020.3',
    tags: ['Unity', 'C#', 'DOTS'],
  },
  {
    name: 'Unity-Dots-Roll-A-Ball',
    title: 'Roll-A-Ball (DOTS)',
    description:
      "The classic Unity Roll-A-Ball tutorial, recreated with the DOTS stack to learn ECS fundamentals.",
    language: 'C#',
    stars: 0,
    year: '2021',
    url: 'https://github.com/humbertovirtudes/Unity-Dots-Roll-A-Ball',
    tags: ['Unity', 'C#', 'DOTS'],
  },
  {
    name: 'iexcloud-googlescript',
    title: 'IEX Cloud for Google Sheets',
    description:
      'A small library to pull IEX Cloud market data directly into Google Sheets via Apps Script.',
    language: 'HTML',
    stars: 1,
    year: '2021',
    url: 'https://github.com/humbertovirtudes/iexcloud-googlescript',
    tags: ['Google Apps Script', 'Finance', 'API'],
  },
];
