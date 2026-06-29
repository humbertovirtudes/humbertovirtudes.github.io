import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

import {profile} from '../data/profile';
import {projects} from '../data/projects';
import {usePosts} from '../usePosts';
import {GitHubIcon, MailIcon, LinkedInIcon, PinIcon} from '../icons';
import {Reveal} from '../Reveal';
import {TileGridHover} from '../TileGridHover';

const wrap: React.CSSProperties = {
  maxWidth: 1000,
  margin: '0 auto',
  padding: '0 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function Home({navigate}: {navigate: (to: string) => void}) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const latest = usePosts().slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section style={{position: 'relative', overflow: 'hidden'}}>
        <div className="hv-aurora" aria-hidden />
        <div className="hv-grid" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}} aria-hidden />
        <div style={{...wrap, position: 'relative', padding: '84px 20px 48px', zIndex: 1}}>
          <VStack gap={5}>
            <div className="hv-enter hv-enter-1">
              <Badge variant="success" label="Staff Software Engineer · Front-End Specialist · @Meta" />
            </div>
            <Heading level={1} type="display-1">
              <span className="hv-enter hv-enter-1" style={{display: 'block'}}>Hi, I'm Humberto.</span>
              <span className="hv-gradient-text hv-enter hv-enter-2" style={{display: 'block'}}>
                I build delightful interfaces.
              </span>
            </Heading>
            <div className="hv-enter hv-enter-3" style={{maxWidth: 660}}>
              <Text type="large" color="secondary">{profile.tagline}</Text>
            </div>
            <div className="hv-enter hv-enter-3">
              <Badge variant="neutral" label={profile.location} icon={<PinIcon size={14} />} />
            </div>
            <HStack gap={1} vAlign="center" wrap="wrap" className="hv-enter hv-enter-4">
              <Button label="GitHub" variant="ghost" size="sm" icon={<GitHubIcon size={16} />} href={profile.github} target="_blank" />
              <Button label="Email" variant="ghost" size="sm" icon={<MailIcon size={16} />} href={`mailto:${profile.email}`} />
              {profile.linkedin ? (
                <Button label="LinkedIn" variant="ghost" size="sm" icon={<LinkedInIcon size={16} />} href={profile.linkedin} target="_blank" />
              ) : null}
            </HStack>
          </VStack>
        </div>
      </section>

      {/* About */}
      <section style={{...wrap, paddingTop: 12, paddingBottom: 36}}>
        <Reveal>
          <div className="hv-lift">
            <TileGridHover surface padding={24} rows={5} columns={10} coverage={80}>
              <VStack gap={3}>
                <Heading level={3}>About</Heading>
                {profile.about.map((para, i) => (
                  <Text key={i} type="body" color="secondary">{para}</Text>
                ))}
              </VStack>
            </TileGridHover>
          </div>
        </Reveal>
      </section>

      {/* Featured projects */}
      <section style={{...wrap, paddingBottom: 36}}>
        <VStack gap={4}>
          <Reveal>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              <Heading level={2}>Featured projects</Heading>
              <Button label="All projects →" variant="ghost" size="sm" clickAction={() => navigate('/projects')} />
            </HStack>
          </Reveal>
          <Grid columns={{minWidth: 280}} gap={4}>
            {featured.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="hv-lift">
                  <TileGridHover surface padding={20} rows={4} columns={6} coverage={80}>
                    <VStack gap={3}>
                      <HStack gap={2} vAlign="center" justify="between">
                        <Heading level={4}>{p.title}</Heading>
                        <Badge variant="neutral" label={p.year} />
                      </HStack>
                      <Text type="body" color="secondary">{p.description}</Text>
                      <HStack gap={2} wrap="wrap">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="info" label={t} />
                        ))}
                      </HStack>
                      <HStack gap={2} wrap="wrap">
                        <Button label="Code" variant="secondary" size="sm" icon={<GitHubIcon size={15} />} href={p.url} target="_blank" />
                        {p.demo ? (
                          <Button label="Live demo" variant="ghost" size="sm" href={p.demo} target="_blank" />
                        ) : null}
                      </HStack>
                    </VStack>
                  </TileGridHover>
                </div>
              </Reveal>
            ))}
          </Grid>
        </VStack>
      </section>

      <div style={wrap}><Divider /></div>

      {/* Latest writing */}
      <section style={{...wrap, paddingTop: 36, paddingBottom: 16}}>
        <VStack gap={4}>
          <Reveal>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              <Heading level={2}>Latest writing</Heading>
              <Button label="All posts →" variant="ghost" size="sm" clickAction={() => navigate('/blog')} />
            </HStack>
          </Reveal>
          <Grid columns={{minWidth: 300}} gap={4}>
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <div className="hv-lift">
                  <TileGridHover surface padding={20} rows={4} columns={6} coverage={80}>
                    <VStack gap={2}>
                      <HStack gap={2} vAlign="center" wrap="wrap">
                        <Text type="supporting" color="secondary">{formatDate(post.date)}</Text>
                        <Text type="supporting" color="secondary">· {post.readingMinutes} min read</Text>
                      </HStack>
                      <Heading level={4}>{post.title}</Heading>
                      <Text type="body" color="secondary">{post.excerpt}</Text>
                      <div>
                        <Button label="Read post →" variant="ghost" size="sm" clickAction={() => navigate(`/blog/${post.slug}`)} />
                      </div>
                    </VStack>
                  </TileGridHover>
                </div>
              </Reveal>
            ))}
          </Grid>
        </VStack>
      </section>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
