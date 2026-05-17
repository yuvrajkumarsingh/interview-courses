import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Chapter, LessonLink } from '@/types';

interface LessonNavProps {
  prev?: LessonLink;
  next?: LessonLink;
  courseSlug: string;
  chapterSlug: string;
  chapters: Chapter[];
  currentLessonSlug: string;
}

export default function LessonNav({
  prev, next, courseSlug, chapterSlug, chapters, currentLessonSlug,
}: LessonNavProps) {
  const resolved = resolvePrevNext(
    { prev, next }, courseSlug, chapterSlug, chapters, currentLessonSlug
  );

  return (
    <nav
      style={{ display: 'flex', gap: 14, marginTop: 16, marginBottom: 8 }}
      aria-label="Lesson navigation"
    >
      {/* Previous */}
      {resolved.prev ? (
        <Link href={resolved.prev.href} style={{ flex: 1, ...navCardBase }}>
          <div style={{
            ...iconCircle,
            background: 'rgba(109, 93, 252, 0.10)',
            color: 'var(--primary)',
          }}>
            <ChevronLeft size={18} />
          </div>
          <div>
            <p style={{ ...navLabel }}>Previous</p>
            <p style={{ ...navTitle }}>{resolved.prev.title}</p>
          </div>
        </Link>
      ) : <div style={{ flex: 1 }} />}

      {/* Next — gradient accent treatment */}
      {resolved.next ? (
        <Link
          href={resolved.next.href}
          style={{
            flex: 1,
            ...navCardBase,
            justifyContent: 'flex-end',
            textAlign: 'right',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            border: 'none',
            boxShadow: 'var(--shadow-primary)',
          }}
        >
          <div>
            <p style={{ ...navLabel, color: 'rgba(255,255,255,0.72)' }}>Next</p>
            <p style={{ ...navTitle, color: '#fff' }}>{resolved.next.title}</p>
          </div>
          <div style={{
            ...iconCircle,
            background: 'rgba(255,255,255,0.20)',
            color: '#fff',
          }}>
            <ChevronRight size={18} />
          </div>
        </Link>
      ) : <div style={{ flex: 1 }} />}
    </nav>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */

const navCardBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '16px 20px',
  borderRadius: 20,
  border: '1px solid var(--border)',
  background: 'var(--surface)',
  backdropFilter: 'blur(22px)',
  boxShadow: 'var(--shadow-soft)',
  textDecoration: 'none',
  transition: 'transform var(--transition), box-shadow var(--transition)',
};

const iconCircle: React.CSSProperties = {
  width: 38, height: 38,
  borderRadius: 13,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
};

const navLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--muted)',
  marginBottom: 3,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const navTitle: React.CSSProperties = {
  fontSize: 13.5,
  fontWeight: 700,
  color: 'var(--text)',
  letterSpacing: '-0.01em',
};

/* ─── Derive prev/next from course structure ─────────────────────────────── */

function resolvePrevNext(
  explicit: { prev?: LessonLink; next?: LessonLink },
  courseSlug: string,
  chapterSlug: string,
  chapters: Chapter[],
  currentSlug: string,
): { prev?: LessonLink; next?: LessonLink } {
  if (explicit.prev || explicit.next) return explicit;

  const flat: LessonLink[] = [];
  chapters.forEach(ch =>
    ch.lessons.forEach(l =>
      flat.push({ title: l.title, href: `/courses/${courseSlug}/${ch.slug}/${l.slug}` })
    )
  );

  const i = flat.findIndex(f => f.href.endsWith(currentSlug));
  return {
    prev: i > 0             ? flat[i - 1] : undefined,
    next: i < flat.length-1 ? flat[i + 1] : undefined,
  };
}