import {useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import type {DefinedTheme} from '@astryxdesign/core/theme';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';

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
import {GitHubIcon} from './icons';
import {profile} from './data/profile';

const THEMES: Record<string, DefinedTheme> = {
  neutral: neutralTheme,
  matcha: matchaTheme,
  stone: stoneTheme,
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

export default function App() {
  const [route, navigate] = useRoute();
  const [themeId, setThemeId] = useState('neutral');
  const [mode, setMode] = useState<Mode>(
    () => (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );

  const theme = THEMES[themeId] ?? neutralTheme;
  const activeNav =
    route.name === 'post' ? 'blog' : route.name;

  return (
    <Theme theme={theme} mode={mode}>
      <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        {/* ---- Top bar ---- */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'color-mix(in srgb, var(--color-background-body) 82%, transparent)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{maxWidth: 980, margin: '0 auto', padding: '12px 20px'}}>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              <button
                onClick={() => navigate('/')}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
                aria-label="Home"
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'var(--color-text-primary)',
                    color: 'var(--color-background-body)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                >
                  HV
                </span>
                <Text type="large" weight="bold">Humberto Virtudes</Text>
              </button>

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
              </HStack>
            </HStack>
          </div>
        </header>

        {/* ---- Page content ---- */}
        <main style={{flex: 1, width: '100%'}}>
          {route.name === 'home' && <Home navigate={navigate} />}
          {route.name === 'cv' && <CV />}
          {route.name === 'projects' && <Projects />}
          {route.name === 'blog' && <Blog navigate={navigate} />}
          {route.name === 'post' && <PostPage slug={route.slug} navigate={navigate} />}
        </main>

        {/* ---- Footer with theme + mode controls ---- */}
        <footer style={{borderTop: '1px solid var(--color-border)', marginTop: 48}}>
          <div style={{maxWidth: 980, margin: '0 auto', padding: '24px 20px'}}>
            <VStack gap={4}>
              <HStack gap={4} vAlign="center" justify="between" wrap="wrap">
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <Text type="supporting" color="secondary">Theme</Text>
                  {THEME_ORDER.map((t) => (
                    <Button
                      key={t.id}
                      label={t.label}
                      size="sm"
                      variant={t.id === themeId ? 'primary' : 'ghost'}
                      clickAction={() => setThemeId(t.id)}
                    />
                  ))}
                </HStack>
                <SegmentedControl value={mode} onChange={(v) => setMode(v as Mode)} label="Color mode">
                  <SegmentedControlItem value="light" label="Light" />
                  <SegmentedControlItem value="dark" label="Dark" />
                </SegmentedControl>
              </HStack>
              <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
                <Text type="supporting" color="secondary">
                  © {new Date().getFullYear()} Humberto Virtudes · Built with Astryx
                </Text>
                <Button
                  label="GitHub"
                  variant="ghost"
                  size="sm"
                  icon={<GitHubIcon size={16} />}
                  href={profile.github}
                  target="_blank"
                />
              </HStack>
            </VStack>
          </div>
        </footer>
      </div>
    </Theme>
  );
}
