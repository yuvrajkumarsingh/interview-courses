// ★ KEY ARCHITECTURAL FILE ★
//
// This layout wraps every lesson under /courses/[course]/**
// Because Next.js App Router keeps layouts mounted across navigations,
// the Sidebar component is NEVER destroyed when the user clicks a new lesson.
// This gives us:
//   • Instant navigation feel (no sidebar re-paint)
//   • Preserved scroll position in the sidebar
//   • Preserved expanded/collapsed chapter state
//
// Only `children` (the main content) re-renders on each route change.

import { courses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileDrawer from '@/components/layout/MobileDrawer';

interface CourseLayoutProps {
  children: React.ReactNode;
  params: { course: string };
}

export default function CourseLayout({ children, params }: CourseLayoutProps) {
  const course = courses[params.course];
  if (!course) notFound();

  return (
    // Full-height flex row: [sidebar] | [main area]
    <div className="flex h-screen overflow-hidden bg-content">

      {/* ── Desktop sidebar: fixed, always visible ──────────────────────── */}
      {/* Hidden on mobile (lg:flex handles this) */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72 xl:w-80">
          <Sidebar course={course} />
        </div>
      </aside>

      {/* ── Mobile drawer: rendered in a portal, slide-in on hamburger tap ── */}
      {/* MobileDrawer is a client component that manages its own open state
          via a global event bus (custom event), so TopBar can trigger it
          without prop-drilling through the layout. */}
      <MobileDrawer course={course} />

      {/* ── Main content column ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Sticky top bar: logo (mobile) + hamburger + breadcrumbs */}
        <TopBar courseTitle={course.title} />

        {/* Scrollable lesson content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}