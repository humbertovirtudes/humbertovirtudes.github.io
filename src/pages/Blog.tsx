import {useState} from 'react';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {EmptyState} from '@astryxdesign/core/EmptyState';

import {usePosts} from '../usePosts';
import {deletePost, resetPosts, type Post} from '../data/blog';
import {PostEditor} from '../PostEditor';
import {PencilIcon, TrashIcon, PlusIcon} from '../icons';
import {Reveal} from '../Reveal';

const wrap: React.CSSProperties = {
  maxWidth: 820,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function Blog({navigate}: {navigate: (to: string) => void}) {
  const posts = usePosts();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [toDelete, setToDelete] = useState<Post | null>(null);

  function openNew() {
    setEditing(null);
    setEditorOpen(true);
  }
  function openEdit(post: Post) {
    setEditing(post);
    setEditorOpen(true);
  }

  return (
    <div className="hv-page" style={wrap}>
      <VStack gap={5}>
        <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
          <VStack gap={2}>
            <Heading level={1}>Blog</Heading>
            <Text type="large" color="secondary">Notes on what I'm building and learning.</Text>
          </VStack>
          <Button label="New post" variant="primary" icon={<PlusIcon size={16} />} clickAction={openNew} />
        </HStack>

        {posts.length === 0 ? (
          <Card padding={6}>
            <EmptyState
              title="No posts yet"
              description="Write your first post — it'll be saved right here in your browser."
              actions={<Button label="Write a post" variant="primary" icon={<PlusIcon size={16} />} clickAction={openNew} />}
            />
          </Card>
        ) : (
          <VStack gap={3}>
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <div className="hv-lift">
                  <Card padding={5}>
                    <VStack gap={3}>
                      <HStack gap={3} vAlign="start" justify="between" wrap="wrap">
                        <ClickableCard
                          variant="transparent"
                          padding={0}
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          label={`Read ${post.title}`}
                          style={{flex: '1 1 320px', minWidth: 0}}
                        >
                          <VStack gap={2}>
                            <HStack gap={2} vAlign="center" wrap="wrap">
                              <Text type="supporting" color="secondary">{formatDate(post.date)}</Text>
                              <Text type="supporting" color="secondary">· {post.readingMinutes} min read</Text>
                            </HStack>
                            <Heading level={3}>{post.title}</Heading>
                            <Text type="body" color="secondary">{post.excerpt}</Text>
                          </VStack>
                        </ClickableCard>
                        <HStack gap={1} vAlign="center">
                          <IconButton label="Edit post" icon={<PencilIcon size={16} />} variant="ghost" size="sm" clickAction={() => openEdit(post)} />
                          <IconButton label="Delete post" icon={<TrashIcon size={16} />} variant="ghost" size="sm" clickAction={() => setToDelete(post)} />
                        </HStack>
                      </HStack>
                      <HStack gap={2} wrap="wrap">
                        {post.tags.map((t) => (
                          <Badge key={t} variant="info" label={t} />
                        ))}
                      </HStack>
                    </VStack>
                  </Card>
                </div>
              </Reveal>
            ))}
          </VStack>
        )}

        <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
          <Text type="supporting" color="secondary">
            Posts are stored in your browser (localStorage). Clearing site data resets them to the defaults.
          </Text>
          <Button label="Reset to defaults" variant="ghost" size="sm" clickAction={() => resetPosts()} />
        </HStack>
      </VStack>

      <PostEditor
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        post={editing}
        onSaved={(slug) => navigate(`/blog/${slug}`)}
      />

      <AlertDialog
        isOpen={Boolean(toDelete)}
        onOpenChange={(open) => {
          if (!open) setToDelete(null);
        }}
        title="Delete this post?"
        description={toDelete ? `"${toDelete.title}" will be removed. This can't be undone.` : ''}
        cancelLabel="Cancel"
        actionLabel="Delete"
        actionVariant="destructive"
        onAction={() => {
          if (toDelete) deletePost(toDelete.slug);
          setToDelete(null);
        }}
      />
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
