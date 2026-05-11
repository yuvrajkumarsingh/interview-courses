// Prev / Next navigation rendered at the bottom of each lesson.
// Also builds the prev/next links dynamically from the chapter structure
// when explicit lesson data doesn't provide them.

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
  // If explicit prev/next aren't provided, derive from the course structure.
  const resolved = resolvePrevNext(
    { prev, next },
    courseSlug,
    chapterSlug,
    chapters,
    currentLessonSlug,
  );

  return (
    <nav
      className="flex items-stretch gap-4 mt-12 pt-8 border-t border-gray-200"
      aria-label="Lesson navigation"
    >
      {resolved.prev ? (
        <NavCard direction="prev" link={resolved.prev} />
      ) : (
        <div className="flex-1" />
      )}

      {resolved.next ? (
        <NavCard direction="next" link={resolved.next} />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

function NavCard({ direction, link }: { direction: 'prev' | 'next'; link: LessonLink }) {
  return (
    <Link
      href={link.href}
      className={[
        'flex items-center gap-3 flex-1 p-4 rounded-xl border border-gray-200',
        'bg-white hover:border-brand-300 hover:shadow-sm hover:bg-brand-50',
        'transition-all group',
        direction === 'next' ? 'justify-end text-right' : 'justify-start',
      ].join(' ')}
    >
      {direction === 'prev' && (
        <ChevronLeft
          size={18}
          className="text-gray-400 group-hover:text-brand-500 flex-shrink-0 transition-colors"
        />
      )}
      <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5">
          {direction === 'prev' ? 'Previous' : 'Next'}
        </p>
        <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
          {link.title}
        </p>
      </div>
      {direction === 'next' && (
        <ChevronRight
          size={18}
          className="text-gray-400 group-hover:text-brand-500 flex-shrink-0 transition-colors"
        />
      )}
    </Link>
  );
}

// ─── Helper: derive prev/next from course structure ───────────────────────────

function resolvePrevNext(
  explicit: { prev?: LessonLink; next?: LessonLink },
  courseSlug: string,
  chapterSlug: string,
  chapters: Chapter[],
  currentSlug: string,
): { prev?: LessonLink; next?: LessonLink } {
  if (explicit.prev || explicit.next) return explicit;

  // Flatten all lessons across all chapters into a single ordered list
  const flat: { title: string; href: string }[] = [];
  chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      flat.push({
        title: l.title,
        href: `/courses/${courseSlug}/${ch.slug}/${l.slug}`,
      });
    });
  });

  const idx = flat.findIndex(item => item.href.endsWith(currentSlug));
  return {
    prev: idx > 0              ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}