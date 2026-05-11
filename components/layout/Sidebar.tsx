'use client';
// Client component: needs useState for chapter expand/collapse and
// usePathname to highlight the active lesson.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Course, Chapter } from '@/types';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

interface SidebarProps {
  course: Course;
  onLinkClick?: () => void; // called by MobileDrawer to close on navigation
}

export default function Sidebar({ course, onLinkClick }: SidebarProps) {
  const pathname = usePathname();

  // Derive the currently active chapter from the URL so we can auto-expand it.
  const activeChapterSlug = pathname.split('/')[3]; // /courses/:course/:chapter/:lesson
  const activeLessonSlug  = pathname.split('/')[4];

  // Build initial expanded state: expand the active chapter by default.
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    course.chapters.forEach(ch => {
      initial[ch.slug] = ch.slug === activeChapterSlug;
    });
    return initial;
  });

  // When the route changes (user navigates), auto-expand the newly active chapter.
  useEffect(() => {
    setExpandedChapters(prev => ({
      ...prev,
      [activeChapterSlug]: true,
    }));
  }, [activeChapterSlug]);

  function toggleChapter(slug: string) {
    setExpandedChapters(prev => ({ ...prev, [slug]: !prev[slug] }));
  }

  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  return (
    // Full-height sidebar with its own scroll — independent of the main content.
    <div className="flex flex-col h-full bg-white border-r border-gray-200 sidebar-scroll overflow-y-auto">

      {/* ── Logo ────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Inline SVG logo mark (orange hexagon-ish shape) */}
          <svg
            width="32" height="32" viewBox="0 0 32 32" fill="none"
            className="flex-shrink-0"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#FF6B2B" />
            <path
              d="M8 10h7l5 6-5 6H8l5-6-5-6zm9 0h7l-5 6 5 6h-7l-5-6 5-6z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
          <span className="font-bold text-gray-900 text-base tracking-tight">
            ByteByteGo
          </span>
        </Link>
      </div>

      {/* ── Course title + progress ─────────────────────────────────────── */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-3">
          {course.title}
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">
            {course.completedLessons}/{course.totalLessons} completed
          </span>
          <span className="text-xs font-semibold text-brand-500">
            {progress}%
          </span>
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* ── Chapter list ────────────────────────────────────────────────── */}
      <nav className="flex-1 py-2" aria-label="Course chapters">
        {course.chapters.map(chapter => (
          <ChapterSection
            key={chapter.slug}
            chapter={chapter}
            courseSlug={course.slug}
            isExpanded={!!expandedChapters[chapter.slug]}
            isActive={chapter.slug === activeChapterSlug}
            activeLessonSlug={activeLessonSlug}
            onToggle={() => toggleChapter(chapter.slug)}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </div>
  );
}

// ─── ChapterSection ────────────────────────────────────────────────────────────
// Isolated accordion row for each chapter. Extracted here to keep Sidebar clean.

interface ChapterSectionProps {
  chapter: Chapter;
  courseSlug: string;
  isExpanded: boolean;
  isActive: boolean;
  activeLessonSlug: string;
  onToggle: () => void;
  onLinkClick?: () => void;
}

function ChapterSection({
  chapter, courseSlug, isExpanded, isActive, activeLessonSlug, onToggle, onLinkClick,
}: ChapterSectionProps) {
  const completedCount = chapter.lessons.filter(l => l.completed).length;

  return (
    <div>
      {/* Chapter header button */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
          'hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
          isActive && 'bg-brand-50',
        )}
        aria-expanded={isExpanded}
      >
        {/* Number badge */}
        <span
          className={cn(
            'flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold',
            isActive
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-gray-600',
          )}
        >
          {chapter.number}
        </span>

        {/* Chapter title */}
        <span
          className={cn(
            'flex-1 text-sm font-medium leading-snug',
            isActive ? 'text-brand-600' : 'text-gray-700',
          )}
        >
          {chapter.title}
        </span>

        {/* Expand chevron */}
        <ChevronDown
          size={15}
          className={cn(
            'flex-shrink-0 text-gray-400 transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
        />
      </button>

      {/* Lesson list — animated open/close */}
      {isExpanded && chapter.lessons.length > 0 && (
        <ul className="pb-1">
          {chapter.lessons.map(lesson => {
            const href = `/courses/${courseSlug}/${chapter.slug}/${lesson.slug}`;
            const isLessonActive = lesson.slug === activeLessonSlug;

            return (
              <li key={lesson.slug}>
                <Link
                  href={href}
                  onClick={onLinkClick}
                  className={cn(
                    'flex items-center gap-3 pl-11 pr-4 py-2 text-sm transition-colors',
                    'hover:bg-gray-50',
                    isLessonActive
                      ? 'text-brand-600 font-medium bg-brand-50 border-r-2 border-brand-500'
                      : 'text-gray-600',
                  )}
                >
                  {/* Completion icon or dot */}
                  {lesson.completed ? (
                    <CheckCircle2 size={14} className="flex-shrink-0 text-brand-500" />
                  ) : (
                    <span
                      className={cn(
                        'flex-shrink-0 w-3.5 h-3.5 rounded-full border-2',
                        isLessonActive
                          ? 'border-brand-500 bg-brand-100'
                          : 'border-gray-300',
                      )}
                    />
                  )}
                  <span className="leading-snug">{lesson.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}