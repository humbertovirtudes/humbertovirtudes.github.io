import {useState} from 'react';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';

import {useCV} from '../useCV';
import * as cv from '../data/cvStore';
import {CVEditDialog, type FieldDef} from '../CVEditDialog';
import {GitHubIcon, MailIcon, LinkedInIcon, PinIcon, PencilIcon, TrashIcon, PlusIcon} from '../icons';
import {Reveal} from '../Reveal';

const wrap: React.CSSProperties = {
  maxWidth: 880, margin: '0 auto', padding: '40px 20px', width: '100%', boxSizing: 'border-box',
};

// Section header with an "add" (and optional label) affordance.
function SectionHead({title, onAdd, addLabel}: {title: string; onAdd?: () => void; addLabel?: string}) {
  return (
    <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
      <Heading level={2}>{title}</Heading>
      {onAdd ? (
        <Button label={addLabel ?? 'Add'} variant="secondary" size="sm" icon={<PlusIcon size={15} />} clickAction={onAdd} />
      ) : null}
    </HStack>
  );
}

// Small edit/remove control cluster for a card.
function RowControls({onEdit, onRemove}: {onEdit: () => void; onRemove: () => void}) {
  return (
    <HStack gap={1} vAlign="center">
      <IconButton label="Edit" icon={<PencilIcon size={15} />} variant="ghost" size="sm" clickAction={onEdit} />
      <IconButton label="Remove" icon={<TrashIcon size={15} />} variant="ghost" size="sm" clickAction={onRemove} />
    </HStack>
  );
}

const CONTACT_FIELDS: FieldDef[] = [
  {key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2},
  {key: 'location', label: 'Location'},
  {key: 'email', label: 'Email'},
  {key: 'github', label: 'GitHub URL'},
  {key: 'linkedin', label: 'LinkedIn URL'},
];
const ABOUT_FIELDS: FieldDef[] = [{key: 'text', label: 'Paragraph', type: 'textarea', rows: 5}];
const SKILL_FIELDS: FieldDef[] = [
  {key: 'group', label: 'Group name', placeholder: 'e.g. Core'},
  {key: 'items', label: 'Skills', type: 'list', placeholder: 'React\nTypeScript\n…'},
];
const EXP_FIELDS: FieldDef[] = [
  {key: 'role', label: 'Role'},
  {key: 'org', label: 'Organization'},
  {key: 'period', label: 'Period', placeholder: '2021 — Present'},
  {key: 'location', label: 'Location'},
  {key: 'points', label: 'Highlights', type: 'list', placeholder: 'One achievement per line'},
];
const EDU_FIELDS: FieldDef[] = [
  {key: 'title', label: 'Title'},
  {key: 'org', label: 'Organization'},
  {key: 'period', label: 'Period'},
  {key: 'detail', label: 'Detail', type: 'textarea', rows: 2},
];

type EditState =
  | {kind: 'contact'}
  | {kind: 'about'; index: number | null}
  | {kind: 'skill'; index: number | null}
  | {kind: 'experience'; index: number | null}
  | {kind: 'education'; index: number | null}
  | null;

export function CV() {
  const data = useCV();
  const [edit, setEdit] = useState<EditState>(null);
  const [confirm, setConfirm] = useState<null | {label: string; run: () => void}>(null);

  const close = () => setEdit(null);

  // Build the dialog config for the current edit state.
  function dialogProps() {
    if (!edit) return null;
    switch (edit.kind) {
      case 'contact':
        return {
          title: 'Edit contact & tagline',
          fields: CONTACT_FIELDS,
          value: {tagline: data.tagline, location: data.location, email: data.email, github: data.github, linkedin: data.linkedin},
          onSave: (v: Record<string, string | string[]>) =>
            cv.updateContact({
              tagline: String(v.tagline), location: String(v.location), email: String(v.email),
              github: String(v.github), linkedin: String(v.linkedin),
            }),
        };
      case 'about':
        return {
          title: edit.index === null ? 'Add paragraph' : 'Edit paragraph',
          fields: ABOUT_FIELDS,
          value: {text: edit.index === null ? '' : data.about[edit.index]},
          onSave: (v: Record<string, string | string[]>) =>
            edit.index === null ? cv.addAbout(String(v.text)) : cv.updateAbout(edit.index, String(v.text)),
        };
      case 'skill':
        return {
          title: edit.index === null ? 'Add skill group' : 'Edit skill group',
          fields: SKILL_FIELDS,
          value: edit.index === null ? {group: '', items: []} : data.skills[edit.index],
          onSave: (v: Record<string, string | string[]>) => {
            const g = {group: String(v.group), items: v.items as string[]};
            edit.index === null ? cv.addSkill(g) : cv.updateSkill(edit.index, g);
          },
        };
      case 'experience':
        return {
          title: edit.index === null ? 'Add experience' : 'Edit experience',
          fields: EXP_FIELDS,
          value: edit.index === null
            ? {role: '', org: '', period: '', location: '', points: []}
            : data.experience[edit.index],
          onSave: (v: Record<string, string | string[]>) => {
            const e = {role: String(v.role), org: String(v.org), period: String(v.period), location: String(v.location), points: v.points as string[]};
            edit.index === null ? cv.addExperience(e) : cv.updateExperience(edit.index, e);
          },
        };
      case 'education':
        return {
          title: edit.index === null ? 'Add education' : 'Edit education',
          fields: EDU_FIELDS,
          value: edit.index === null
            ? {title: '', org: '', period: '', detail: ''}
            : data.education[edit.index],
          onSave: (v: Record<string, string | string[]>) => {
            const ed = {title: String(v.title), org: String(v.org), period: String(v.period), detail: String(v.detail)};
            edit.index === null ? cv.addEducation(ed) : cv.updateEducation(edit.index, ed);
          },
        };
    }
  }
  const dp = dialogProps();

  return (
    <div className="hv-page" style={wrap}>
      <VStack gap={6}>
        {/* Header */}
        <Reveal>
          <HStack gap={4} vAlign="center" wrap="wrap">
            <div className="hv-avatar" style={{flexShrink: 0}}>
              <img src="./profile.jpeg" alt={data.name} width={104} height={104} />
            </div>
            <VStack gap={3}>
              <HStack gap={2} vAlign="center" wrap="wrap">
                <Heading level={1}>Curriculum Vitae</Heading>
                <IconButton label="Edit contact" icon={<PencilIcon size={15} />} variant="ghost" size="sm" clickAction={() => setEdit({kind: 'contact'})} />
              </HStack>
              <Text type="large" color="secondary">{data.tagline}</Text>
              <HStack gap={2} vAlign="center" wrap="wrap">
                <Badge variant="neutral" label={data.location} icon={<PinIcon size={14} />} />
                <Button label="GitHub" variant="ghost" size="sm" icon={<GitHubIcon size={15} />} href={data.github} target="_blank" />
                <Button label={data.email} variant="ghost" size="sm" icon={<MailIcon size={15} />} href={`mailto:${data.email}`} />
                {data.linkedin ? (
                  <Button label="LinkedIn" variant="ghost" size="sm" icon={<LinkedInIcon size={15} />} href={data.linkedin} target="_blank" />
                ) : null}
              </HStack>
            </VStack>
          </HStack>
        </Reveal>

        <Divider />

        {/* Summary */}
        <VStack gap={3}>
          <SectionHead title="Summary" addLabel="Add paragraph" onAdd={() => setEdit({kind: 'about', index: null})} />
          {data.about.map((p, i) => (
            <HStack key={i} gap={2} vAlign="start" justify="between" wrap="wrap">
              <Text type="body" color="secondary" style={{flex: '1 1 340px'}}>{p}</Text>
              <RowControls onEdit={() => setEdit({kind: 'about', index: i})} onRemove={() => setConfirm({label: 'this paragraph', run: () => cv.removeAbout(i)})} />
            </HStack>
          ))}
        </VStack>

        <Divider />

        {/* Skills */}
        <VStack gap={3}>
          <SectionHead title="Skills" addLabel="Add group" onAdd={() => setEdit({kind: 'skill', index: null})} />
          <Grid columns={{minWidth: 240}} gap={3}>
            {data.skills.map((s, i) => (
              <div className="hv-lift" key={i}>
                <Card padding={4}>
                  <VStack gap={2}>
                    <HStack gap={2} vAlign="center" justify="between">
                      <Text type="label">{s.group}</Text>
                      <RowControls onEdit={() => setEdit({kind: 'skill', index: i})} onRemove={() => setConfirm({label: `the "${s.group}" group`, run: () => cv.removeSkill(i)})} />
                    </HStack>
                    <HStack gap={2} wrap="wrap">
                      {s.items.map((it) => (<Badge key={it} variant="info" label={it} />))}
                    </HStack>
                  </VStack>
                </Card>
              </div>
            ))}
          </Grid>
        </VStack>

        <Divider />

        {/* Experience */}
        <VStack gap={4}>
          <SectionHead title="Experience" addLabel="Add role" onAdd={() => setEdit({kind: 'experience', index: null})} />
          <VStack gap={4}>
            {data.experience.map((e, i) => (
              <div className="hv-lift" key={i}>
                <Card padding={5}>
                  <VStack gap={2}>
                    <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
                      <Heading level={4}>{e.role}</Heading>
                      <HStack gap={2} vAlign="center">
                        <Badge variant="neutral" label={e.period} />
                        <RowControls onEdit={() => setEdit({kind: 'experience', index: i})} onRemove={() => setConfirm({label: `${e.role || 'this role'}`, run: () => cv.removeExperience(i)})} />
                      </HStack>
                    </HStack>
                    <HStack gap={2} vAlign="center" wrap="wrap">
                      <Text type="body" weight="medium" color="secondary">{e.org}</Text>
                      {e.location ? <Text type="supporting" color="secondary">· {e.location}</Text> : null}
                    </HStack>
                    <ul style={{margin: 0, paddingLeft: 18}}>
                      {e.points.map((pt, j) => (
                        <li key={j} style={{marginBottom: 4}}><Text type="body" color="secondary">{pt}</Text></li>
                      ))}
                    </ul>
                  </VStack>
                </Card>
              </div>
            ))}
          </VStack>
        </VStack>

        <Divider />

        {/* Education */}
        <VStack gap={4}>
          <SectionHead title="Education & Certifications" addLabel="Add entry" onAdd={() => setEdit({kind: 'education', index: null})} />
          <VStack gap={3}>
            {data.education.map((ed, i) => (
              <div className="hv-lift" key={i}>
                <Card padding={5}>
                  <VStack gap={1}>
                    <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
                      <Heading level={4}>{ed.title}</Heading>
                      <HStack gap={2} vAlign="center">
                        <Badge variant="neutral" label={ed.period} />
                        <RowControls onEdit={() => setEdit({kind: 'education', index: i})} onRemove={() => setConfirm({label: `${ed.title || 'this entry'}`, run: () => cv.removeEducation(i)})} />
                      </HStack>
                    </HStack>
                    <Text type="body" weight="medium" color="secondary">{ed.org}</Text>
                    {ed.detail ? <Text type="supporting" color="secondary">{ed.detail}</Text> : null}
                  </VStack>
                </Card>
              </div>
            ))}
          </VStack>
        </VStack>

        <Divider />

        <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
          <Text type="supporting" color="secondary">
            Edits are saved in your browser (localStorage). Reset to restore the defaults.
          </Text>
          <Button label="Reset CV" variant="ghost" size="sm" clickAction={() => setConfirm({label: 'ALL your CV edits', run: () => cv.resetCV()})} />
        </HStack>
      </VStack>

      {dp ? (
        <CVEditDialog
          isOpen={edit !== null}
          onOpenChange={(o) => (o ? null : close())}
          title={dp.title}
          fields={dp.fields}
          value={dp.value}
          onSave={dp.onSave}
        />
      ) : null}

      <AlertDialog
        isOpen={confirm !== null}
        onOpenChange={(o) => { if (!o) setConfirm(null); }}
        title="Remove?"
        description={confirm ? `Remove ${confirm.label}? This can't be undone.` : ''}
        cancelLabel="Cancel"
        actionLabel="Remove"
        actionVariant="destructive"
        onAction={() => { confirm?.run(); setConfirm(null); }}
      />
    </div>
  );
}
