'use client';
// Slide-in drawer for mobile. Listens for the 'open-mobile-drawer' custom event
// dispatched by TopBar, so no prop-drilling is needed through the layout.

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Course } from '@/types';
import Sidebar from './Sidebar';

export default function MobileDrawer({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-mobile-drawer', handler);
    return () => window.removeEventListener('open-mobile-drawer', handler);
  }, []);

  if (!isOpen) return null;

  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative flex flex-col w-72 max-w-[85vw] h-full bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Reuse the same Sidebar component and close the drawer on navigation. */}
        <Sidebar
          course={course}
          collapsed={false}
          mobileOpen={true}
          onToggleCollapse={() => {}}
          onCloseMobile={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
