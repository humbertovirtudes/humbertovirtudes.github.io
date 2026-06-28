import {useEffect, useState} from 'react';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {Layout, LayoutContent, LayoutFooter, VStack, HStack} from '@astryxdesign/core/Layout';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Divider} from '@astryxdesign/core/Divider';

import {savePost, type Post} from './data/blog';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post | null; // when set, edit mode
  onSaved?: (slug: string) => void;
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function PostEditor({isOpen, onOpenChange, post, onSaved}: Props) {
  const editing = Boolean(post);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(today());
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState('write');
  const [error, setError] = useState('');

  // Reset form whenever the dialog opens or the target post changes.
  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setTab('write');
    if (post) {
      setTitle(post.title);
      setDate(post.date);
      setTags(post.tags.join(', '));
      setExcerpt(post.excerpt);
      setContent(post.content);
    } else {
      setTitle('');
      setDate(today());
      setTags('');
      setExcerpt('');
      setContent('');
    }
  }, [isOpen, post]);

  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  function handleSave() {
    if (!title.trim()) {
      setError('A title is required.');
      setTab('write');
      return;
    }
    if (!content.trim()) {
      setError('The post body is empty.');
      setTab('write');
      return;
    }
    const saved = savePost({
      originalSlug: post?.slug,
      title,
      date,
      excerpt: excerpt.trim() || content.trim().slice(0, 140).replace(/\n/g, ' '),
      tags: tagList,
      content,
    });
    onOpenChange(false);
    onSaved?.(saved.slug);
  }

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} width={720} maxHeight="86vh">
      <Layout
        header={
          <DialogHeader
            title={editing ? 'Edit post' : 'New post'}
            subtitle={editing ? post?.title : 'Write in Markdown — preview before you publish'}
            onOpenChange={onOpenChange}
            hasDivider
          />
        }
        content={
          <LayoutContent>
            <VStack gap={4} style={{padding: '4px 2px'}}>
            <HStack gap={3} wrap="wrap" style={{width: '100%'}}>
              <div style={{flex: '2 1 280px'}}>
                <TextInput label="Title" placeholder="An evening with CSS transitions" value={title} onChange={setTitle} />
              </div>
              <div style={{flex: '1 1 150px'}}>
                <TextInput label="Date" placeholder="YYYY-MM-DD" value={date} onChange={setDate} />
              </div>
            </HStack>

            <TextInput
              label="Tags"
              placeholder="React, CSS, Motion (comma separated)"
              value={tags}
              onChange={setTags}
            />
            {tagList.length > 0 ? (
              <HStack gap={2} wrap="wrap">
                {tagList.map((t) => (
                  <Badge key={t} variant="info" label={t} />
                ))}
              </HStack>
            ) : null}

            <TextArea
              label="Excerpt"
              placeholder="A one-line summary for the blog index (optional)."
              value={excerpt}
              onChange={setExcerpt}
              rows={2}
            />

            <Divider />

            <TabList value={tab} onChange={setTab}>
              <Tab value="write" label="Write" />
              <Tab value="preview" label="Preview" />
            </TabList>

            {tab === 'write' ? (
              <TextArea
                label="Body (Markdown)"
                isLabelHidden
                placeholder={'## A heading\n\nWrite your post in **Markdown**. Lists, `code`, [links](https://example.com), and tables all work.'}
                value={content}
                onChange={setContent}
                rows={14}
              />
            ) : (
              <div
                style={{
                  minHeight: 220,
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  padding: 16,
                  backgroundColor: 'var(--color-background-body)',
                }}
              >
                {content.trim() ? (
                  <Markdown headingLevelStart={2}>{content}</Markdown>
                ) : (
                  <Text type="supporting" color="secondary">
                    Nothing to preview yet — switch to Write and add some Markdown.
                  </Text>
                )}
              </div>
            )}

            {error ? (
              <Text type="supporting" color="primary" style={{color: 'var(--color-text-error, crimson)'}}>
                {error}
              </Text>
            ) : null}
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter hasDivider>
            <HStack gap={2} justify="between" vAlign="center" style={{width: '100%'}}>
              <Text type="supporting" color="secondary">
                Saved in your browser
              </Text>
              <HStack gap={2}>
                <Button label="Cancel" variant="ghost" clickAction={() => onOpenChange(false)} />
                <Button label={editing ? 'Save changes' : 'Publish post'} variant="primary" clickAction={handleSave} />
              </HStack>
            </HStack>
          </LayoutFooter>
        }
      />
    </Dialog>
  );
}
