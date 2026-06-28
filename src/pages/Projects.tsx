import {useMemo, useState} from 'react';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';

import {projects} from '../data/projects';
import {GitHubIcon} from '../icons';
import {TileGridHover} from '../TileGridHover';
import {Reveal} from '../Reveal';

const wrap: React.CSSProperties = {
  maxWidth: 1000,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function Projects() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div style={wrap}>
      <VStack gap={5}>
        <Reveal>
          <VStack gap={2}>
            <Heading level={1}>Projects</Heading>
            <Text type="large" color="secondary">Things I've built — most are open source on GitHub.</Text>
          </VStack>
        </Reveal>

        <Reveal delay={60}>
          <HStack gap={2} wrap="wrap">
            {allTags.map((t) => (
              <Button
                key={t}
                label={t}
                size="sm"
                variant={filter === t ? 'primary' : 'secondary'}
                clickAction={() => setFilter(t)}
              />
            ))}
          </HStack>
        </Reveal>

        <Grid columns={{minWidth: 300}} gap={4}>
          {shown.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 70}>
              <div className="hv-lift">
                <TileGridHover surface padding={20} rows={4} columns={6} coverage={80}>
                  <VStack gap={3}>
                    <HStack gap={2} vAlign="center" justify="between">
                      <Heading level={4}>{p.title}</Heading>
                      <HStack gap={2} vAlign="center">
                        {p.stars > 0 ? <Badge variant="warning" label={`★ ${p.stars}`} /> : null}
                        <Badge variant="neutral" label={p.year} />
                      </HStack>
                    </HStack>
                    <Text type="body" color="secondary">{p.description}</Text>
                    <HStack gap={2} wrap="wrap">
                      <Badge variant="success" label={p.language} />
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
    </div>
  );
}
