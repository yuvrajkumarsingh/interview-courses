'use client';
// Mobile-only top bar. On desktop (lg+) this is hidden since the sidebar
// is always visible. On mobile, this shows the logo and hamburger icon.

import { Menu } from 'lucide-react';
import Link from 'next/link';

interface TopBarProps {
  courseTitle: string;
}

export default function TopBar({ courseTitle }: TopBarProps) {
  function openMobileDrawer() {
    // Dispatch a custom event that MobileDrawer listens for.
    // This decouples TopBar from MobileDrawer without prop-drilling through layout.
    window.dispatchEvent(new CustomEvent('open-mobile-drawer'));
  }

  return (
    <header
      className={[
        'lg:hidden',                   // hidden on desktop — sidebar is always visible
        'flex items-center gap-3',
        'h-14 px-4 bg-white border-b border-gray-200',
        'sticky top-0 z-30 flex-shrink-0',
      ].join(' ')}
    >
      {/* Hamburger */}
      <button
        onClick={openMobileDrawer}
        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#FF6B2B" />
          <path
            d="M8 10h7l5 6-5 6H8l5-6-5-6zm9 0h7l-5 6 5 6h-7l-5-6 5-6z"
            fill="white" fillOpacity="0.9"
          />
        </svg>
        <span className="font-bold text-gray-900 text-sm">ByteByteGo</span>
      </Link>

      {/* Course name (truncated) */}
      <span className="ml-auto text-xs text-gray-500 truncate max-w-[180px]">
        {courseTitle}
      </span>
    </header>
  );
}