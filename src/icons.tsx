import type {CSSProperties} from 'react';

const base = (style?: CSSProperties): CSSProperties => ({
  width: 18,
  height: 18,
  display: 'inline-block',
  verticalAlign: 'middle',
  ...style,
});

export function GitHubIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={base({width: size, height: size})} aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.24 2.76.12 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.66.41.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export function MailIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={base({width: size, height: size})} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LinkedInIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={base({width: size, height: size})} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function PinIcon({size = 16}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={base({width: size, height: size})} aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function SunIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function PaletteIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.5-.2-.8-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PencilIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export function TrashIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function PlusIcon({size = 18}: {size?: number}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{width: size, height: size, display: 'inline-block', verticalAlign: 'middle'}} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
