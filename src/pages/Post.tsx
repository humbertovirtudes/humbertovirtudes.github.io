import {useState} from 'react';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Divider} from '@astryxdesign/core/Divider';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';

import {getPost, deletePost} from '../data/blog';
import {usePosts} from '../usePosts';
import {PostEditor} from '../PostEditor';
import {PencilIcon, TrashIcon} from '../icons';

const wrap: React.CSSProperties = {
  maxWidth: 740,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function PostPage({slug, navigate}: {slug: string; navigate: (to: string) => void}) {
  usePosts(); // subscribe so edits re-render this view
  const post = getPost(slug);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!post) {
    return (
      <div style={wrap}>
        <VStack gap={3}>
          <Heading level={1}>Post not found</Heading>
          <Text type="body" color="secondary">That post doesn't exist (yet).</Text>
          <div>
            <Button label="← Back to blog" variant="secondary" clickAction={() => navigate('/blog')} />
          </div>
        </VStack>
      </div>
    );
  }

  return (
    <article style={wrap}>
      <VStack gap={4}>
        <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
          <Button label="← Blog" variant="ghost" size="sm" clickAction={() => navigate('/blog')} />
          <HStack gap={1} vAlign="center">
            <IconButton label="Edit post" icon={<PencilIcon size={16} />} variant="ghost" size="sm" clickAction={() => setEditorOpen(true)} />
            <IconButton label="Delete post" icon={<TrashIcon size={16} />} variant="ghost" size="sm" clickAction={() => setConfirmDelete(true)} />
          </HStack>
        </HStack>

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
          {post.content}
        </Markdown>

        <Divider />

        <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
          <Button label="← All posts" variant="secondary" clickAction={() => navigate('/blog')} />
          <Button label="Edit this post" variant="ghost" size="sm" icon={<PencilIcon size={15} />} clickAction={() => setEditorOpen(true)} />
        </HStack>
      </VStack>

      <PostEditor
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        post={post}
        onSaved={(s) => navigate(`/blog/${s}`)}
      />

      <AlertDialog
        isOpen={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this post?"
        description={`"${post.title}" will be removed. This can't be undone.`}
        cancelLabel="Cancel"
        actionLabel="Delete"
        actionVariant="destructive"
        onAction={() => {
          deletePost(post.slug);
          setConfirmDelete(false);
          navigate('/blog');
        }}
      />
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
