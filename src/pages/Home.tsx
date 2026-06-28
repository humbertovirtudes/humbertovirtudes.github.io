import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';

import {profile} from '../data/profile';
import {projects} from '../data/projects';
import {posts} from '../data/blog';
import {GitHubIcon, MailIcon, LinkedInIcon, PinIcon} from '../icons';

const wrap: React.CSSProperties = {
  maxWidth: 980,
  margin: '0 auto',
  padding: '0 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function Home({navigate}: {navigate: (to: string) => void}) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const latest = posts.slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section style={{position: 'relative', overflow: 'hidden'}}>
        <div
          className="hv-grid"
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          aria-hidden
        />
        <div style={{...wrap, position: 'relative', padding: '72px 20px 40px'}}>
          <VStack gap={5}>
            <Badge variant="success" label="Open to opportunities" />
            <Heading level={1} type="display-1">
              {profile.name}
            </Heading>
            <div style={{maxWidth: 640}}>
              <Text type="large" color="secondary">{profile.tagline}</Text>
            </div>
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Badge variant="neutral" label={profile.location} icon={<PinIcon size={14} />} />
            </HStack>
            <HStack gap={3} vAlign="center" wrap="wrap">
              <Button label="View projects" variant="primary" size="lg" clickAction={() => navigate('/projects')} />
              <Button label="Read the CV" variant="secondary" size="lg" clickAction={() => navigate('/cv')} />
            </HStack>
            <HStack gap={2} vAlign="center" wrap="wrap">
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
      <section style={{...wrap, paddingTop: 8, paddingBottom: 32}}>
        <Card padding={6}>
          <VStack gap={3}>
            <Heading level={3}>About</Heading>
            {profile.about.map((para, i) => (
              <Text key={i} type="body" color="secondary">{para}</Text>
            ))}
          </VStack>
        </Card>
      </section>

      {/* Featured projects */}
      <section style={{...wrap, paddingBottom: 32}}>
        <VStack gap={4}>
          <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
            <Heading level={2}>Featured projects</Heading>
            <Button label="All projects →" variant="ghost" size="sm" clickAction={() => navigate('/projects')} />
          </HStack>
          <Grid columns={{minWidth: 280}} gap={4}>
            {featured.map((p) => (
              <Card key={p.name} padding={5}>
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
              </Card>
            ))}
          </Grid>
        </VStack>
      </section>

      <div style={wrap}><Divider /></div>

      {/* Latest writing */}
      <section style={{...wrap, paddingTop: 32, paddingBottom: 16}}>
        <VStack gap={4}>
          <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
            <Heading level={2}>Latest writing</Heading>
            <Button label="All posts →" variant="ghost" size="sm" clickAction={() => navigate('/blog')} />
          </HStack>
          <Grid columns={{minWidth: 300}} gap={4}>
            {latest.map((post) => (
              <Card key={post.slug} padding={5} variant="muted">
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
              </Card>
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
