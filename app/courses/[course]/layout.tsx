// Pure server component — just fetches the course and delegates
// all interactivity (collapse, mobile, theme) to CourseClientLayout.
import { courses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import CourseClientLayout from '@/components/layout/CourseClientLayout';

interface Props {
  children: React.ReactNode;
  params: { course: string };
}

export default function CourseLayout({ children, params }: Props) {
  const course = courses[params.course];
  if (!course) notFound();

  return (
    <CourseClientLayout course={course}>
      {children}
    </CourseClientLayout>
  );
}