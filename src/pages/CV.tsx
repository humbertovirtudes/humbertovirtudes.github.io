import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Button} from '@astryxdesign/core/Button';

import {profile} from '../data/profile';
import {GitHubIcon, MailIcon, LinkedInIcon, PinIcon} from '../icons';
import {Reveal} from '../Reveal';

const wrap: React.CSSProperties = {
  maxWidth: 880,
  margin: '0 auto',
  padding: '40px 20px',
  width: '100%',
  boxSizing: 'border-box',
};

export function CV() {
  return (
    <div style={wrap}>
      <VStack gap={6}>
        {/* Header */}
        <Reveal>
          <VStack gap={3}>
            <Heading level={1}>Curriculum Vitae</Heading>
            <Text type="large" color="secondary">{profile.tagline}</Text>
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Badge variant="neutral" label={profile.location} icon={<PinIcon size={14} />} />
              <Button label="GitHub" variant="ghost" size="sm" icon={<GitHubIcon size={15} />} href={profile.github} target="_blank" />
              <Button label={profile.email} variant="ghost" size="sm" icon={<MailIcon size={15} />} href={`mailto:${profile.email}`} />
              {profile.linkedin ? (
                <Button label="LinkedIn" variant="ghost" size="sm" icon={<LinkedInIcon size={15} />} href={profile.linkedin} target="_blank" />
              ) : null}
            </HStack>
          </VStack>
        </Reveal>

        <Divider />

        {/* Summary */}
        <Reveal>
          <VStack gap={3}>
            <Heading level={2}>Summary</Heading>
            {profile.about.map((p, i) => (
              <Text key={i} type="body" color="secondary">{p}</Text>
            ))}
          </VStack>
        </Reveal>

        <Divider />

        {/* Skills */}
        <Reveal>
          <VStack gap={3}>
            <Heading level={2}>Skills</Heading>
            <Grid columns={{minWidth: 240}} gap={3}>
              {profile.skills.map((s, i) => (
                <div className="hv-lift" key={s.group} style={{['--i' as string]: i}}>
                  <Card padding={4} variant="muted">
                    <VStack gap={2}>
                      <Text type="label">{s.group}</Text>
                      <HStack gap={2} wrap="wrap">
                        {s.items.map((it) => (
                          <Badge key={it} variant="info" label={it} />
                        ))}
                      </HStack>
                    </VStack>
                  </Card>
                </div>
              ))}
            </Grid>
          </VStack>
        </Reveal>

        <Divider />

        {/* Experience */}
        <VStack gap={4}>
          <Reveal><Heading level={2}>Experience</Heading></Reveal>
          <VStack gap={4}>
            {profile.experience.map((e, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="hv-lift">
                  <Card padding={5}>
                    <VStack gap={2}>
                      <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
                        <Heading level={4}>{e.role}</Heading>
                        <Badge variant="neutral" label={e.period} />
                      </HStack>
                      <HStack gap={2} vAlign="center" wrap="wrap">
                        <Text type="body" weight="medium" color="secondary">{e.org}</Text>
                        {e.location ? <Text type="supporting" color="secondary">· {e.location}</Text> : null}
                      </HStack>
                      <ul style={{margin: 0, paddingLeft: 18}}>
                        {e.points.map((pt, j) => (
                          <li key={j} style={{marginBottom: 4}}>
                            <Text type="body" color="secondary">{pt}</Text>
                          </li>
                        ))}
                      </ul>
                    </VStack>
                  </Card>
                </div>
              </Reveal>
            ))}
          </VStack>
        </VStack>

        <Divider />

        {/* Education */}
        <VStack gap={4}>
          <Reveal><Heading level={2}>Education & Certifications</Heading></Reveal>
          <VStack gap={3}>
            {profile.education.map((ed, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="hv-lift">
                  <Card padding={5} variant="muted">
                    <VStack gap={1}>
                      <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
                        <Heading level={4}>{ed.title}</Heading>
                        <Badge variant="neutral" label={ed.period} />
                      </HStack>
                      <Text type="body" weight="medium" color="secondary">{ed.org}</Text>
                      {ed.detail ? <Text type="supporting" color="secondary">{ed.detail}</Text> : null}
                    </VStack>
                  </Card>
                </div>
              </Reveal>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </div>
  );
}
