// Footer rendered at the bottom of every lesson page.
// Links are grouped into the same four columns as the real site.

import Link from 'next/link';

const FOOTER_LINKS = [
  {
    heading: 'Partner With Us',
    links: [
      { label: 'Teach on ByteByteGo', href: '#' },
      { label: 'Be an Affiliate', href: '#' },
      { label: 'Become a Contributor', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'hi@bytebytego.com', href: 'mailto:hi@bytebytego.com' },
      { label: 'Report a Bug', href: '#' },
    ],
  },
  {
    heading: 'Company & Legal',
    links: [
      { label: 'Our Team', href: '#' },
      { label: 'Newsletter', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'YouTube', href: '#' },
      { label: 'Visual Dev Guides', href: '#' },
      { label: 'Find Jobs', href: '#' },
      { label: 'Prepare for Coding Interviews', href: '#' },
    ],
  },
];

export default function CourseFooter() {
  return (
    <footer className="mt-16 pt-10 border-t border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {FOOTER_LINKS.map(section => (
          <div key={section.heading}>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              {section.heading}
            </h4>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center pb-8">
        Copyright ©2022–2026 ByteByteGo Inc. All rights reserved.
      </p>
    </footer>
  );
}