// Edit this file to update your CV / about content.
// Experience is informed by the public LinkedIn profile (Meta, Singapore;
// Globant/Portugal connection). Items marked TODO need your exact titles/dates.

export const profile = {
  name: 'Humberto Virtudes',
  tagline: 'Front-End Specialist · Crafting fast, accessible, delightful interfaces',
  location: 'Singapore',
  email: 'humberto.virtudes@gmail.com',
  github: 'https://github.com/humbertovirtudes',
  linkedin: 'https://www.linkedin.com/in/humbertovirtudes/',
  website: '',

  about: [
    "I'm a front-end specialist based in Singapore. I care about the details that make an interface feel effortless — motion, accessibility, performance, and a design system that scales.",
    'I currently build at Meta, and my work spans React / TypeScript front-ends, design systems (StyleX), and practical AI tooling — from a video-to-shorts pipeline to a ComfyUI front-end.',
    "I learn in the open. Most of what I make ends up on GitHub.",
  ],

  // Skills grouped by area — front-end forward.
  skills: [
    {group: 'Core', items: ['React', 'TypeScript', 'JavaScript (ES2023+)', 'HTML5', 'CSS3']},
    {group: 'UI & Design Systems', items: ['StyleX', 'Tailwind', 'Design Tokens', 'Astryx', 'Accessibility (WCAG)']},
    {group: 'Motion & Craft', items: ['CSS Animations', 'Transitions', 'Micro-interactions', 'Responsive Design']},
    {group: 'Tooling', items: ['Vite', 'Node.js', 'Git', 'GitHub Actions']},
    {group: 'Backend & Other', items: ['Django REST', 'Python', 'Unity / C#', 'REST APIs']},
  ],

  // Experience — anchored to confirmed public facts. Fill TODOs with exact dates/titles.
  experience: [
    {
      role: 'Software Engineer',
      org: 'Meta',
      period: 'Present', // TODO: add your start year (e.g. '2021 — Present')
      location: 'Singapore',
      points: [
        'Engineer on the Helpdesk Chat Engineering team, building internal tooling and interfaces used across the company.',
        'Focus on front-end craft: React/TypeScript UI, design-system adoption, and accessible, performant experiences.',
        '// TODO: add a quantified achievement (scale, impact, metric).',
      ],
    },
    {
      role: 'Front-End / Software Engineer',
      org: 'Previous role',
      period: 'YYYY — YYYY', // TODO
      location: '',
      points: [
        '// TODO: describe what you built or improved before Meta.',
      ],
    },
  ],

  education: [
    {
      title: 'Meta Back-End Developer (Professional Certificate)',
      org: 'Meta · Coursera',
      period: '2026',
      detail: 'Capstone: Little Lemon restaurant API built with Django REST Framework.',
    },
    {
      title: 'Add your degree',
      org: 'University',
      period: 'YYYY',
      detail: '',
    },
  ],
};
