import { getLessonData } from '@/lib/data/lessons';
import { courses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import LessonRenderer from '@/components/content/LessonRenderer';
import LessonNav from '@/components/content/LessonNav';
import CourseFooter from '@/components/layout/CourseFooter';

interface Props {
  params: { course: string; chapter: string; lesson: string };
}

export async function generateStaticParams() {
  const out: { course: string; chapter: string; lesson: string }[] = [];
  Object.values(courses).forEach(c =>
    c.chapters.forEach(ch =>
      ch.lessons.forEach(l =>
        out.push({ course: c.slug, chapter: ch.slug, lesson: l.slug })
      )
    )
  );
  return out;
}

export default function LessonPage({ params }: Props) {
  const course  = courses[params.course];
  const chapter = course?.chapters.find(c => c.slug === params.chapter);
  const lesson  = chapter?.lessons.find(l => l.slug === params.lesson);
  if (!lesson || !course) notFound();

  const data = getLessonData(params.lesson);

  return (
    /* Max-width container — the glass card itself provides the white surface */
    <div style={{ maxWidth: 1100}}>

      {/* ── Main lesson glass card ──────────────────────────────────────── */}
      <div
        className="glass-card"
        style={{ padding: '40px 52px', marginBottom: 22 }}
      >
        {/* Lesson title */}
        <h1 style={{
          fontSize: 'clamp(22px, 3vw, 30px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 1.1,
          color: 'var(--text)',
          marginBottom: 32,
        }}>
          {data?.title ?? lesson.title}
        </h1>

        {/* Content blocks */}
        {data ? (
          <LessonRenderer content={data.content} />
        ) : (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            border: '2px dashed var(--border)',
            borderRadius: 18,
          }}>
            <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 700 }}>
              Content coming soon
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
              This lesson is part of the full course.
            </p>
          </div>
        )}
      </div>

      {/* ── Prev / Next navigation ──────────────────────────────────────── */}
      <LessonNav
        prev={data?.prevLesson}
        next={data?.nextLesson}
        courseSlug={params.course}
        chapterSlug={params.chapter}
        chapters={course.chapters}
        currentLessonSlug={params.lesson}
      />

      <CourseFooter />
    </div>
  );
}