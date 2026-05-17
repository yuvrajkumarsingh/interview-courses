'use client';
import { usePathname } from 'next/navigation';
import { Menu, PanelLeftClose, Search, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface TopBarProps {
  courseTitle: string;
  onOpenMobile: () => void;
  onToggleCollapse: () => void;
}

export default function TopBar({ courseTitle, onOpenMobile, onToggleCollapse }: TopBarProps) {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  // Build a human-readable page title from the lesson slug
  const lessonSlug = pathname.split('/')[4] ?? '';
  const pageTitle  = lessonSlug
    ? lessonSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : courseTitle;

  return (
    <header style={{
      position: 'sticky',
      top: 18,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '0 18px',
      height: 74,
      marginBottom: 24,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 26,
      boxShadow: 'var(--shadow-soft)',
      backdropFilter: 'blur(22px)',
      flexShrink: 0,
    }}>
      {/* ── Left ────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Hamburger — mobile only */}
        <button
          onClick={onOpenMobile}
          className="icon-btn mobile-only"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar collapse toggle — desktop only */}
        <button
          onClick={onToggleCollapse}
          className="icon-btn desktop-only"
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose size={20} />
        </button>

        {/* Page title */}
        <div style={{ minWidth: 0 }}>
          <h1 style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {pageTitle}
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: 12,
            fontWeight: 600,
            marginTop: 3,
            whiteSpace: 'nowrap',
          }}>
            {courseTitle}
          </p>
        </div>
      </div>

      {/* ── Right ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Search — hidden on mobile via .search-bar CSS class */}
        <div className="search-bar" style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute', left: 13, top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
            }}
          />
          <input
            type="search"
            placeholder="Search lessons..."
            style={{
              width: 230, height: 42,
              border: '1px solid var(--border)',
              borderRadius: 14,
              paddingLeft: 40, paddingRight: 14,
              background: 'rgba(127, 139, 164, 0.09)',
              color: 'var(--text)',
              fontSize: 13,
              outline: 'none',
              transition: 'border var(--transition), box-shadow var(--transition)',
            }}
          />
        </div>

        {/* Dark / light mode toggle */}
        <button
          onClick={toggle}
          className="icon-btn"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark'
            ? <Sun  size={19} />
            : <Moon size={19} />
          }
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" aria-label="Notifications">
            <Bell size={19} />
          </button>
          {/* Red dot indicator */}
          <span style={{
            position: 'absolute', top: 11, right: 11,
            width: 8, height: 8,
            borderRadius: '50%',
            background: 'var(--danger)',
            border: '2px solid var(--surface-solid)',
          }} />
        </div>
      </div>
    </header>
  );
}