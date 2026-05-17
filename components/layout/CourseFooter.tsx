import Link from 'next/link';

const COLS = [
  {
    heading: 'Partner With Us',
    links: ['Teach on ByteByteGo', 'Be an Affiliate', 'Become a Contributor'],
  },
  {
    heading: 'Support',
    links: ['hi@bytebytego.com', 'Report a Bug'],
  },
  {
    heading: 'Company & Legal',
    links: ['Our Team', 'Newsletter', 'Privacy Policy', 'Terms of Service'],
  },
  {
    heading: 'Resources',
    links: ['YouTube', 'Visual Dev Guides', 'Find Jobs', 'Coding Interview Prep'],
  },
];

export default function CourseFooter() {
  return (
    <footer style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 28,
        marginBottom: 36,
      }}
        className="footer-grid"
      >
        {COLS.map(col => (
          <div key={col.heading}>
            <h4 style={{
              fontSize: 11, fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              color: 'var(--text)',
              marginBottom: 14,
            }}>
              {col.heading}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {col.links.map(label => (
                <li key={label}>
                  <Link
                    href="#"
                    style={{
                      fontSize: 13, color: 'var(--muted)', fontWeight: 600,
                      transition: 'color var(--transition)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p style={{
        textAlign: 'center', fontSize: 12,
        color: 'var(--muted)', paddingBottom: 24,
      }}>
        Copyright ©2022–2026 ByteByteGo Inc. All rights reserved.
      </p>
    </footer>
  );
}