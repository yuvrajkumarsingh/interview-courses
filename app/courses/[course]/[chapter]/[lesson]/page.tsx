// Dynamic lesson page.
// Next.js calls this whenever the URL matches /courses/:course/:chapter/:lesson
// The parent layout (sidebar) stays mounted — only this component re-renders.

import { getLessonData } from '@/lib/data/lessons';
import { courses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import LessonRenderer from '@/components/content/LessonRenderer';
import LessonNav from '@/components/content/LessonNav';
import CourseFooter from '@/components/layout/CourseFooter';

interface LessonPageProps {
  params: {
    course: string;
    chapter: string;
    lesson: string;
  };
}

// Next.js calls generateStaticParams at build-time to pre-render all lessons.
// This gives us static HTML for each lesson — great for SEO and performance.
export async function generateStaticParams() {
  const allParams: { course: string; chapter: string; lesson: string }[] = [];

  Object.values(courses).forEach(course => {
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        allParams.push({
          course: course.slug,
          chapter: chapter.slug,
          lesson: lesson.slug,
        });
      });
    });
  });

  return allParams;
}

export default function LessonPage({ params }: LessonPageProps) {
  const lessonData = getLessonData(params.lesson);
  const course = courses[params.course];
  const chapter = course?.chapters.find(c => c.slug === params.chapter);

  // If the lesson slug is valid in the course structure but content isn't written
  // yet, show a "coming soon" state rather than a 404.
  const lessonInCourse = chapter?.lessons.find(l => l.slug === params.lesson);
  if (!lessonInCourse || !course) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

      {/* ── Lesson title ──────────────────────────────────────────────── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-tight">
        {lessonData?.title ?? lessonInCourse.title}
      </h1>

      {/* ── Main lesson content or coming-soon placeholder ────────────── */}
      {lessonData ? (
        <LessonRenderer content={lessonData.content} />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-400 text-lg font-medium">Content coming soon</p>
          <p className="text-gray-400 text-sm mt-1">
            This lesson is part of the full course.
          </p>
        </div>
      )}

      {/* ── Prev / Next navigation ────────────────────────────────────── */}
      <LessonNav
        prev={lessonData?.prevLesson}
        next={lessonData?.nextLesson}
        courseSlug={params.course}
        chapterSlug={params.chapter}
        chapters={course.chapters}
        currentLessonSlug={params.lesson}
      />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <CourseFooter />
    </div>
  );
}