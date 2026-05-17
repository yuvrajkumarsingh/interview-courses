'use client';
// ★ This is the central layout controller.
// It manages sidebar collapsed state, mobile open state, and passes callbacks
// down to Sidebar and TopBar. Because it's a client component wrapping server
// children, Next.js correctly keeps the sidebar mounted across lesson navigation.

import { useState } from 'react';
import { Course } from '@/types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

interface Props {
  course: Course;
  children: React.ReactNode;
}

export default function CourseClientLayout({ course, children }: Props) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  return (
    <>
      {/* ── Floating sidebar ─────────────────────────────────────────────── */}
      <Sidebar
        course={course}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(p => !p)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* ── Mobile backdrop overlay ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            background: 'rgba(2, 6, 23, 0.50)',
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ── Main content column ──────────────────────────────────────────── */}
      <div className={cn('course-main', collapsed && 'is-collapsed')}>
        <TopBar
          courseTitle={course.title}
          onOpenMobile={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed(p => !p)}
        />
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </>
  );
}