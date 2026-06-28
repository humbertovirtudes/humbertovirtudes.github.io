import {useEffect, useRef, useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import type {DefinedTheme} from '@astryxdesign/core/theme';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';

import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {matchaTheme} from '@astryxdesign/theme-matcha/built';
import {stoneTheme} from '@astryxdesign/theme-stone/built';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';
import {chocolateTheme} from '@astryxdesign/theme-chocolate/built';

import {useRoute} from './router';
import {Home} from './pages/Home';
import {CV} from './pages/CV';
import {Projects} from './pages/Projects';
import {Blog} from './pages/Blog';
import {PostPage} from './pages/Post';
import {GitHubIcon, SunIcon, MoonIcon, PaletteIcon} from './icons';
import {runThemeTransition, pointFromEvent} from './viewTransition';
import {profile} from './data/profile';

const THEMES: Record<string, DefinedTheme> = {
  neutral: neutralTheme,
  stone: stoneTheme,
  matcha: matchaTheme,
  chocolate: chocolateTheme,
  gothic: gothicTheme,
};
const THEME_ORDER = [
  {id: 'neutral', label: 'Neutral'},
  {id: 'stone', label: 'Stone'},
  {id: 'matcha', label: 'Matcha'},
  {id: 'chocolate', label: 'Cocoa'},
  {id: 'gothic', label: 'Gothic'},
];

type Mode = 'light' | 'dark';

const NAV = [
  {to: '/', label: 'Home', match: 'home'},
  {to: '/cv', label: 'CV', match: 'cv'},
  {to: '/projects', label: 'Projects', match: 'projects'},
  {to: '/blog', label: 'Blog', match: 'blog'},
];

const THEME_KEY = 'hv.theme';
const MODE_KEY = 'hv.mode';

export default function App() {
  const [route, navigate] = useRoute();
  const [themeId, setThemeId] = useState<string>(
    () => localStorage.getItem(THEME_KEY) ?? 'neutral',
  );
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem(MODE_KEY) as Mode | null;
    if (saved) return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [scrolled, setScrolled] = useState(false);
  const paletteRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeId);
  }, [themeId]);
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const theme = THEMES[themeId] ?? neutralTheme;
  const activeNav = route.name === 'post' ? 'blog' : route.name;
  const activeThemeLabel = THEME_ORDER.find((t) => t.id === themeId)?.label ?? 'Theme';

  return (
    <Theme theme={theme} mode={mode}>
      <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        {/* ---- Top bar ---- */}
        <header
          className={`hv-header ${scrolled ? 'is-scrolled' : ''}`}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            backdropFilter: 'blur(12px)',
            backgroundColor: scrolled
              ? 'color-mix(in srgb, var(--color-background-body) 88%, transparent)'
              : 'color-mix(in srgb, var(--color-background-body) 70%, transparent)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{maxWidth: 1040, margin: '0 auto', padding: '11px 20px'}}>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              {/* Brand */}
              <button
                onClick={() => navigate('/')}
                style={{all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10}}
                aria-label="Home"
              >
                <span
                  style={{
                    width: 30, height: 30, borderRadius: 9,
                    background: 'var(--color-text-primary)',
                    color: 'var(--color-background-body)',
                    display: 'grid', placeItems: 'center',
                    fontWeight: 800, fontSize: 14,
                  }}
                >
                  HV
                </span>
                <Text type="large" weight="bold">Humberto Virtudes</Text>
              </button>

              {/* Nav + controls */}
              <HStack gap={1} vAlign="center" wrap="wrap">
                {NAV.map((n) => (
                  <Button
                    key={n.to}
                    label={n.label}
                    variant={activeNav === n.match ? 'secondary' : 'ghost'}
                    size="sm"
                    clickAction={() => navigate(n.to)}
                  />
                ))}

                <span style={{width: 1, height: 22, background: 'var(--color-border)', margin: '0 6px'}} aria-hidden />

                {/* Theme picker — now in the top nav */}
                <span ref={paletteRef} style={{display: 'inline-flex'}}>
                  <DropdownMenu
                    button={{
                      label: activeThemeLabel,
                      variant: 'ghost',
                      size: 'sm',
                      icon: <PaletteIcon size={16} />,
                    }}
                    menuWidth={160}
                    items={THEME_ORDER.map((t) => ({
                      label: t.label,
                      onClick: () => {
                        const el = paletteRef.current;
                        const r = el?.getBoundingClientRect();
                        const origin = r ? {x: r.left + r.width / 2, y: r.top + r.height / 2} : null;
                        runThemeTransition(origin, () => setThemeId(t.id));
                      },
                    }))}
                  />
                </span>

                {/* Light / dark toggle — now in the top nav */}
                <IconButton
                  label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  icon={mode === 'dark' ? <SunIcon size={17} /> : <MoonIcon size={17} />}
                  variant="ghost"
                  size="sm"
                  clickAction={(e) => {
                    const origin = pointFromEvent(e);
                    runThemeTransition(origin, () => setMode(mode === 'dark' ? 'light' : 'dark'));
                  }}
                />
              </HStack>
            </HStack>
          </div>
        </header>

        {/* ---- Page content (keyed for transition) ---- */}
        <main style={{flex: 1, width: '100%'}}>
          <div key={route.name === 'post' ? `post-${route.slug}` : route.name} className="hv-page">
            {route.name === 'home' && <Home navigate={navigate} />}
            {route.name === 'cv' && <CV />}
            {route.name === 'projects' && <Projects />}
            {route.name === 'blog' && <Blog navigate={navigate} />}
            {route.name === 'post' && <PostPage slug={route.slug} navigate={navigate} />}
          </div>
        </main>

        {/* ---- Footer ---- */}
        <footer style={{borderTop: '1px solid var(--color-border)', marginTop: 56}}>
          <div style={{maxWidth: 1040, margin: '0 auto', padding: '24px 20px'}}>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              <Text type="supporting" color="secondary">
                © {new Date().getFullYear()} Humberto Virtudes · Built with Astryx
              </Text>
              <HStack gap={1} vAlign="center" wrap="wrap">
                <Button label="GitHub" variant="ghost" size="sm" icon={<GitHubIcon size={15} />} href={profile.github} target="_blank" />
                {profile.linkedin ? (
                  <Button label="LinkedIn" variant="ghost" size="sm" href={profile.linkedin} target="_blank" />
                ) : null}
              </HStack>
            </HStack>
          </div>
        </footer>
      </div>
    </Theme>
  );
}
