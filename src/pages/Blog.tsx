import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Badge} from '@astryxdesign/core/Badge';

import {posts} from '../data/blog';

const wrap: React.CSSProperties = {
  maxWidth: 760,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function Blog({navigate}: {navigate: (to: string) => void}) {
  return (
    <div style={wrap}>
      <VStack gap={5}>
        <VStack gap={2}>
          <Heading level={1}>Blog</Heading>
          <Text type="large" color="secondary">
            Notes on what I'm building and learning.
          </Text>
        </VStack>

        <VStack gap={3}>
          {posts.map((post) => (
            <ClickableCard
              key={post.slug}
              padding={5}
              onClick={() => navigate(`/blog/${post.slug}`)}
              aria-label={post.title}
            >
              <VStack gap={2}>
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <Text type="supporting" color="secondary">{formatDate(post.date)}</Text>
                  <Text type="supporting" color="secondary">· {post.readingMinutes} min read</Text>
                </HStack>
                <Heading level={3}>{post.title}</Heading>
                <Text type="body" color="secondary">{post.excerpt}</Text>
                <HStack gap={2} wrap="wrap">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="info" label={t} />
                  ))}
                </HStack>
              </VStack>
            </ClickableCard>
          ))}
        </VStack>
      </VStack>
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
