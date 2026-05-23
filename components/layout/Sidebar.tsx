'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { Course, Chapter } from '@/types';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

interface SidebarProps {
  course: Course;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export default function Sidebar({
  course, collapsed, mobileOpen, onToggleCollapse, onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const activeChapter = pathname.split('/')[3] ?? '';
  const activeLesson  = pathname.split('/')[4] ?? '';

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    course.chapters.forEach(ch => { init[ch.slug] = ch.slug === activeChapter; });
    return init;
  });

  // Auto-expand the newly active chapter on route change
  useEffect(() => {
    setExpanded(prev => ({ ...prev, [activeChapter]: true }));
  }, [activeChapter]);

  function toggleChapter(slug: string) {
    // If sidebar is collapsed, expanding it takes priority
    if (collapsed) { onToggleCollapse(); return; }
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }));
  }

  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  return (
    <aside
      className={cn(
        'sidebar-floating',
        collapsed   && 'is-collapsed',
        mobileOpen  && 'mobile-open',
      )}
      aria-label="Course navigation"
    >
      {/* ── Brand header ────────────────────────────────────────────────── */}
      <div style={{
        height: 76,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 16px',
        flexShrink: 0,
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Gradient logo mark */}
        <Link
          href="/"
          aria-label="Interview Courses home"
          style={{
            width: 44, height: 44,
            borderRadius: 15,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            boxShadow: 'var(--shadow-primary)',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontWeight: 900,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          IC
        </Link>

        {/* Brand text — hidden when collapsed */}
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontWeight: 800, fontSize: 16.5,
              letterSpacing: '-0.03em', color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}>
              Interview Courses
            </div>
            <div style={{
              color: 'var(--muted)', fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              Interview Prep
            </div>
          </div>
        )}
      </div>

      {/* ── Progress section ─────────────────────────────────────────────── */}
      {!collapsed && (
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: 12.5, fontWeight: 700,
            color: 'var(--text)', marginBottom: 8,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {course.title}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: 8, fontSize: 12, fontWeight: 700,
          }}>
            <span style={{ color: 'var(--muted)' }}>
              {course.completedLessons}/{course.totalLessons} completed
            </span>
            <span style={{ color: 'var(--primary)' }}>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}

      {/* ── Chapter list ─────────────────────────────────────────────────── */}
      <nav
        className="sidebar-scroll"
        style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}
        aria-label="Course chapters"
      >
        {course.chapters.map(chapter => (
          <ChapterRow
            key={chapter.slug}
            chapter={chapter}
            courseSlug={course.slug}
            isExpanded={!!expanded[chapter.slug] && !collapsed}
            isActive={chapter.slug === activeChapter}
            activeLesson={activeLesson}
            collapsed={collapsed}
            onToggle={() => toggleChapter(chapter.slug)}
            onLinkClick={onCloseMobile}
          />
        ))}
      </nav>
    </aside>
  );
}

/* ─── ChapterRow ─────────────────────────────────────────────────────────── */

interface ChapterRowProps {
  chapter: Chapter;
  courseSlug: string;
  isExpanded: boolean;
  isActive: boolean;
  activeLesson: string;
  collapsed: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

function ChapterRow({
  chapter, courseSlug, isExpanded, isActive,
  activeLesson, collapsed, onToggle, onLinkClick,
}: ChapterRowProps) {
  return (
    <div style={{ marginBottom: 3 }}>
      {/* Chapter header */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 44,
          padding: collapsed ? '0 8px' : '0 12px',
          borderRadius: 16,
          cursor: 'pointer',
          transition: 'all var(--transition)',
          // Active chapter gets the full gradient treatment
          background: isActive
            ? 'linear-gradient(135deg, var(--primary), var(--primary-2))'
            : 'transparent',
          color: isActive ? '#fff' : 'var(--text)',
          boxShadow: isActive ? 'var(--shadow-primary)' : 'none',
        }}
      >
        {/* Number badge */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28, height: 28,
          borderRadius: 9,
          fontSize: 11,
          fontWeight: 900,
          flexShrink: 0,
          background: isActive ? 'rgba(255,255,255,0.20)' : 'rgba(109,93,252,0.11)',
          color: isActive ? '#fff' : 'var(--primary)',
        }}>
          {chapter.number}
        </span>

        {!collapsed && (
          <>
            <span style={{
              flex: 1, textAlign: 'left',
              fontSize: 13.5, fontWeight: 700,
              letterSpacing: '-0.01em',
              color: isActive ? '#fff' : 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {chapter.title}
            </span>
            <ChevronDown
              size={14}
              style={{
                flexShrink: 0,
                color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--muted)',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--transition)',
              }}
            />
          </>
        )}
      </button>

      {/* Lesson list */}
      {isExpanded && chapter.lessons.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 2 }}>
          {chapter.lessons.map(lesson => {
            const href = `/courses/${courseSlug}/${chapter.slug}/${lesson.slug}`;
            const isLessonActive = lesson.slug === activeLesson;

            return (
              <li key={lesson.slug}>
                <Link
                  href={href}
                  onClick={onLinkClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px 8px 12px',
                    marginLeft: 8,
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: isLessonActive ? 700 : 600,
                    color: isLessonActive ? 'var(--primary)' : 'var(--muted)',
                    background: isLessonActive
                      ? 'rgba(109, 93, 252, 0.08)'
                      : 'transparent',
                    borderLeft: `3px solid ${isLessonActive ? 'var(--primary)' : 'transparent'}`,
                    transition: 'all var(--transition)',
                  }}
                >
                  {lesson.completed ? (
                    <CheckCircle2
                      size={14}
                      style={{ flexShrink: 0, color: 'var(--accent)' }}
                    />
                  ) : (
                    <span style={{
                      width: 14, height: 14,
                      borderRadius: '50%',
                      border: `2px solid ${isLessonActive ? 'var(--primary)' : 'var(--border)'}`,
                      flexShrink: 0,
                      background: isLessonActive ? 'rgba(109,93,252,0.12)' : 'transparent',
                    }} />
                  )}
                  <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.35,
                  }}>
                    {lesson.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}