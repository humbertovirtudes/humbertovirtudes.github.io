import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';

import {getPost} from '../data/blog';

const wrap: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function PostPage({slug, navigate}: {slug: string; navigate: (to: string) => void}) {
  const post = getPost(slug);

  if (!post) {
    return (
      <div style={wrap}>
        <VStack gap={3}>
          <Heading level={1}>Post not found</Heading>
          <Text type="body" color="secondary">
            That post doesn't exist (yet).
          </Text>
          <div>
            <Button label="← Back to blog" variant="secondary" clickAction={() => navigate('/blog')} />
          </div>
        </VStack>
      </div>
    );
  }

  // Strip the leading H1 from markdown — we render the title ourselves.
  const body = post.content.replace(/^#\s+.*\n+/, '');

  return (
    <article style={wrap}>
      <VStack gap={4}>
        <div>
          <Button label="← Blog" variant="ghost" size="sm" clickAction={() => navigate('/blog')} />
        </div>

        <VStack gap={3}>
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Text type="supporting" color="secondary">{formatDate(post.date)}</Text>
            <Text type="supporting" color="secondary">· {post.readingMinutes} min read</Text>
          </HStack>
          <Heading level={1}>{post.title}</Heading>
          <HStack gap={2} wrap="wrap">
            {post.tags.map((t) => (
              <Badge key={t} variant="info" label={t} />
            ))}
          </HStack>
        </VStack>

        <Divider />

        <Markdown
          headingLevelStart={2}
          onLinkClick={(href) => {
            if (href.startsWith('#') || href.startsWith('/')) {
              navigate(href);
              return false;
            }
            return undefined;
          }}
        >
          {body}
        </Markdown>

        <Divider />

        <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
          <Button label="← Back to all posts" variant="secondary" clickAction={() => navigate('/blog')} />
        </HStack>
      </VStack>
    </article>
  );
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
