// Edit this file to update your CV / about content.
// Fields marked TODO are placeholders — fill in your real details.

export const profile = {
  name: 'Humberto Virtudes',
  tagline: 'Software Engineer · Builder of tools, design systems & AI workflows',
  location: 'Singapore',
  email: 'humberto.virtudes@gmail.com',
  github: 'https://github.com/humbertovirtudes',
  // TODO: add these if you want them shown
  linkedin: '', // e.g. 'https://www.linkedin.com/in/humbertovirtudes'
  website: '',

  // Short intro shown on the home / CV page
  about: [
    "I'm a software engineer based in Singapore who likes turning rough ideas into shipped, usable things.",
    'My work spans full-stack web (React / TypeScript, Python / Django), design systems, and practical AI tooling — from a video-to-shorts pipeline to a ComfyUI front-end and design-system experiments.',
    "I learn by building in the open. Most of what I make ends up on GitHub.",
  ],

  // Skills grouped by area — derived from public project work
  skills: [
    {group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'HTML / CSS']},
    {group: 'Frontend', items: ['React', 'Vite', 'Design Systems', 'StyleX', 'Tailwind']},
    {group: 'Backend', items: ['Django REST Framework', 'Node.js', 'REST APIs']},
    {group: 'AI / Tooling', items: ['ComfyUI', 'LLM workflows', 'Video processing', 'Automation']},
    {group: 'Other', items: ['Unity / DOTS', 'Git', 'GitHub Actions']},
  ],

  // Experience — TODO: replace with your real roles. Kept honest & editable.
  experience: [
    {
      role: 'Add your current role',
      org: 'Company / Organization',
      period: 'YYYY — Present',
      points: [
        'Describe a key responsibility or achievement.',
        'Quantify impact where you can (numbers, scale, outcomes).',
      ],
    },
    {
      role: 'Previous role',
      org: 'Company / Organization',
      period: 'YYYY — YYYY',
      points: ['What you built or improved.'],
    },
  ],

  // Education & certifications — Little Lemon capstone is the Meta Back-End cert.
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
