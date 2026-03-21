import { SectionHeader } from './SectionHeader';
import { SKILLS } from '../data';
import { FloatingTags } from './effects/FloatingTags';

export function Skills() {
  const allTags = SKILLS.flatMap((g: { category: string; items: string[] }) =>
    g.items.map((item: string) => `${item}`)
  );

  return (
    <section id="skills" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="02" title="Stack" />
        <FloatingTags tags={allTags} />
      </div>
    </section>
  );
}
