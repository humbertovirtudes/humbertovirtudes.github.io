import {useEffect, useState} from 'react';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {Layout, LayoutContent, LayoutFooter, VStack, HStack} from '@astryxdesign/core/Layout';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

export type FieldType = 'text' | 'textarea' | 'list';
export type FieldDef = {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  rows?: number;
};

// A small schema-driven editor dialog reused for every CV section. `list`
// fields edit a newline-separated set of lines (skill items, bullet points).
export function CVEditDialog({
  isOpen,
  onOpenChange,
  title,
  fields,
  value,
  onSave,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: FieldDef[];
  value: Record<string, string | string[]>;
  onSave: (next: Record<string, string | string[]>) => void;
}) {
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;
    const d: Record<string, string> = {};
    for (const f of fields) {
      const v = value[f.key];
      d[f.key] = Array.isArray(v) ? v.join('\n') : (v ?? '');
    }
    setDraft(d);
  }, [isOpen, value, fields]);

  function set(key: string, v: string) {
    setDraft((prev) => ({...prev, [key]: v}));
  }

  function handleSave() {
    const out: Record<string, string | string[]> = {};
    for (const f of fields) {
      const raw = draft[f.key] ?? '';
      out[f.key] =
        f.type === 'list'
          ? raw.split('\n').map((s) => s.trim()).filter(Boolean)
          : raw.trim();
    }
    onSave(out);
    onOpenChange(false);
  }

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} width={640} maxHeight="86vh">
      <Layout
        header={<DialogHeader title={title} onOpenChange={onOpenChange} hasDivider />}
        content={
          <LayoutContent>
            <VStack gap={4} style={{padding: '4px 2px'}}>
              {fields.map((f) =>
                f.type === 'textarea' || f.type === 'list' ? (
                  <VStack gap={1} key={f.key}>
                    <TextArea
                      label={f.label}
                      placeholder={f.placeholder}
                      value={draft[f.key] ?? ''}
                      onChange={(v) => set(f.key, v)}
                      rows={f.rows ?? 4}
                    />
                    {f.type === 'list' ? (
                      <Text type="supporting" color="secondary">
                        One item per line.
                      </Text>
                    ) : null}
                  </VStack>
                ) : (
                  <TextInput
                    key={f.key}
                    label={f.label}
                    placeholder={f.placeholder}
                    value={draft[f.key] ?? ''}
                    onChange={(v) => set(f.key, v)}
                  />
                ),
              )}
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter hasDivider>
            <HStack gap={2} justify="between" vAlign="center" style={{width: '100%'}}>
              <Text type="supporting" color="secondary">Saved in your browser</Text>
              <HStack gap={2}>
                <Button label="Cancel" variant="ghost" clickAction={() => onOpenChange(false)} />
                <Button label="Save" variant="primary" clickAction={handleSave} />
              </HStack>
            </HStack>
          </LayoutFooter>
        }
      />
    </Dialog>
  );
}
