// CV store — makes every CV section editable in-browser (add / edit / remove),
// persisted to localStorage so it works on a static GitHub Pages site. Seeds
// from data/profile.ts. Mirrors the blog store pattern.

import {profile as seed} from './profile';

export type Experience = {
  role: string;
  org: string;
  period: string;
  location: string;
  points: string[];
};
export type Education = {title: string; org: string; period: string; detail: string};
export type SkillGroup = {group: string; items: string[]};

export type CV = {
  name: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  about: string[];
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
};

const STORAGE_KEY = 'hv.cv.v1';

function seedCV(): CV {
  // deep clone the seed so edits never mutate the imported constant
  return JSON.parse(JSON.stringify({
    name: seed.name,
    tagline: seed.tagline,
    location: seed.location,
    email: seed.email,
    github: seed.github,
    linkedin: seed.linkedin,
    website: seed.website ?? '',
    about: seed.about ?? [],
    skills: seed.skills ?? [],
    experience: (seed.experience ?? []).map((e) => ({location: '', ...e})),
    education: seed.education ?? [],
  }));
}

function load(): CV {
  if (typeof localStorage === 'undefined') return seedCV();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedCV();
    const parsed = JSON.parse(raw) as Partial<CV>;
    return {...seedCV(), ...parsed};
  } catch {
    return seedCV();
  }
}

let current: CV = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* quota / disabled — ignore */
  }
  // new object identity so useSyncExternalStore fires
  current = {...current};
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function getCV(): CV {
  return current;
}
export function resetCV(): void {
  current = seedCV();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  current = {...current};
  listeners.forEach((l) => l());
}

// --- Header / contact ---
export function updateContact(patch: Partial<CV>): void {
  current = {...current, ...patch};
  persist();
}

// --- About paragraphs ---
export function addAbout(text: string): void {
  current.about = [...current.about, text];
  persist();
}
export function updateAbout(i: number, text: string): void {
  current.about = current.about.map((p, idx) => (idx === i ? text : p));
  persist();
}
export function removeAbout(i: number): void {
  current.about = current.about.filter((_, idx) => idx !== i);
  persist();
}

// --- Skill groups (each has a title + comma list of items) ---
export function addSkill(group: SkillGroup): void {
  current.skills = [...current.skills, group];
  persist();
}
export function updateSkill(i: number, group: SkillGroup): void {
  current.skills = current.skills.map((g, idx) => (idx === i ? group : g));
  persist();
}
export function removeSkill(i: number): void {
  current.skills = current.skills.filter((_, idx) => idx !== i);
  persist();
}

// --- Experience ---
export function addExperience(e: Experience): void {
  current.experience = [...current.experience, e];
  persist();
}
export function updateExperience(i: number, e: Experience): void {
  current.experience = current.experience.map((x, idx) => (idx === i ? e : x));
  persist();
}
export function removeExperience(i: number): void {
  current.experience = current.experience.filter((_, idx) => idx !== i);
  persist();
}

// --- Education ---
export function addEducation(ed: Education): void {
  current.education = [...current.education, ed];
  persist();
}
export function updateEducation(i: number, ed: Education): void {
  current.education = current.education.map((x, idx) => (idx === i ? ed : x));
  persist();
}
export function removeEducation(i: number): void {
  current.education = current.education.filter((_, idx) => idx !== i);
  persist();
}
