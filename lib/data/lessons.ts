import { LessonPageData } from '@/types';

// ─── Introduction to Two Pointers ─────────────────────────────────────────────
// This is the authoritative content object for the lesson. In a production app
// this would be fetched from a CMS or markdown files — keeping it in TS for now
// makes the data-flow simple to trace.

export const introToTwoPointers: LessonPageData = {
  title: 'Introduction to Two Pointers',
  courseTitle: 'Coding Interview Patterns',
  courseSlug: 'coding-patterns',
  chapterTitle: 'Two Pointers',
  chapterSlug: 'two-pointers',
  content: [
    // ── Section 1 ──────────────────────────────────────────────────────────────
    { type: 'h2', text: 'Intuition' },
    {
      type: 'paragraph',
      text: 'As the name implies, a two-pointer pattern refers to an algorithm that utilizes two pointers. A **pointer** is a variable that represents an index or position within a data structure, like an array or linked list. Many algorithms use just a single pointer to track a single element:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-1-OA7SGCBK.svg',
      alt: 'A single pointer i pointing to an element in an array [... 14 5 5 20 ...]',
    },
    {
      type: 'paragraph',
      text: 'Introducing a second pointer opens a new world of possibilities. Most importantly, we can now make **comparisons**. With pointers at two different positions, we can compare the elements at those positions and make decisions based on the comparison:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-2-Y7CSNC5F.svg',
      alt: 'Two pointers i and j comparing elements 14 and 5 in an array, leading to a decision',
    },
    {
      type: 'paragraph',
      text: 'In many cases, such comparisons are made using two nested for-loops, which takes O(n²) time, where `n` denotes the length of the data structure. In the code snippet below, `i` and `j` are two pointers used to compare every two elements of an array:',
    },
    {
      type: 'code',
      tabs: [
        {
          label: 'Python',
          code: `for i in range(n):
    for j in range(i + 1, n):
        compare(nums[i], nums[j])`,
        },
        {
          label: 'JavaScript',
          code: `for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    compare(nums[i], nums[j]);
  }
}`,
        },
        {
          label: 'Java',
          code: `for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        compare(nums[i], nums[j]);
    }
}`,
        },
        {
          label: 'C++',
          code: `for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        compare(nums[i], nums[j]);
    }
}`,
        },
      ],
    },
    {
      type: 'paragraph',
      text: 'Often, this approach does not take advantage of **predictable dynamics** that might exist in a data structure. An example is a sorted array: when we move a pointer in a sorted array, we can predict whether the value being moved to is greater or smaller. Moving a pointer right in an ascending array guarantees we move to a value ≥ the current one:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-3-ASETSKFQ.svg',
      alt: 'Sorted array [1 2 3 4] with pointer i and the prediction: if nums[i] == 2 then nums[i+1] >= 2',
    },
    {
      type: 'paragraph',
      text: 'Data structures with predictable dynamics let us move pointers in a logical, informed way. Taking advantage of this predictability can lead to improved time and space complexity.',
    },

    // ── Section 2 ──────────────────────────────────────────────────────────────
    { type: 'h2', text: 'Two-pointer Strategies' },
    {
      type: 'paragraph',
      text: 'Two-pointer algorithms usually take only O(n) time by eliminating nested for-loops. There are three main strategies for using two pointers.',
    },
    { type: 'h3', text: 'Inward Traversal' },
    {
      type: 'paragraph',
      text: 'This approach has pointers starting at opposite ends of the data structure and moving inward toward each other:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-4-SFTU7WGJ.svg',
      alt: 'Two pointers labeled left and right starting at opposite ends of an array, converging toward the center',
    },
    {
      type: 'paragraph',
      text: 'The pointers move toward the center, adjusting based on comparisons, until a condition is met or they meet/cross. This is ideal for problems where we need to compare elements from different ends of a data structure.',
    },
    { type: 'h3', text: 'Unidirectional Traversal' },
    {
      type: 'paragraph',
      text: 'Both pointers start at the same end (usually the beginning) and move in the same direction:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-5-2KI3FUD6.svg',
      alt: 'Two pointers left and right moving in the same direction through an array',
    },
    {
      type: 'paragraph',
      text: 'These pointers generally serve two different but supplementary purposes. A common application is when we want one pointer to find information (the right pointer) and another to keep track of information (the left pointer).',
    },
    { type: 'h3', text: 'Staged Traversal' },
    {
      type: 'paragraph',
      text: 'We traverse with one pointer, and when it lands on an element meeting a certain condition, we traverse with the second pointer:',
    },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-6-ZAL5SSYK.svg',
      alt: 'Staged traversal — first pointer scans and when a condition is met, the second pointer activates',
    },
    {
      type: 'paragraph',
      text: 'Similar to unidirectional traversal, both pointers serve different purposes. The first pointer searches for something, and once found, the second pointer finds additional information at that position.',
    },

    // ── Section 3 ──────────────────────────────────────────────────────────────
    { type: 'h2', text: 'When To Use Two Pointers?' },
    {
      type: 'paragraph',
      text: 'A two-pointer algorithm usually requires a linear data structure, such as an array or linked list. An indication that a problem can be solved using this pattern is when the input follows a predictable dynamic, such as a **sorted array**.',
    },
    {
      type: 'paragraph',
      text: 'Predictable dynamics take many forms. Consider a palindromic string — its symmetrical pattern lets us logically move two pointers toward the center. Another indicator is when the problem asks for a **pair of values** or a result derived from two values.',
    },

    // ── Section 4 ──────────────────────────────────────────────────────────────
    { type: 'h2', text: 'Real-world Example' },
    {
      type: 'callout',
      variant: 'info',
      text: '**Garbage collection algorithms**: In memory compaction — a key part of garbage collection — the goal is to free contiguous memory space by eliminating gaps left by deallocated objects. A two-pointer technique helps efficiently: a *scan* pointer traverses the heap to identify live objects, while a *free* pointer tracks where live objects should be relocated. As the scan pointer moves, it skips dead objects and shifts live ones to the position indicated by the free pointer, grouping all live objects together and freeing continuous blocks of memory.',
    },

    // ── Section 5 ──────────────────────────────────────────────────────────────
    { type: 'h2', text: 'Chapter Outline' },
    {
      type: 'image',
      src: 'https://bytebytego.com/images/courses/coding-patterns/two-pointers/introduction-to-two-pointers/image-01-00-7-3JHPFTNV.svg',
      alt: 'Chapter outline diagram: Two Pointers branches into Inward Traversal, Unidirectional Traversal, and Staged Traversal sub-problems',
    },
    {
      type: 'paragraph',
      text: 'The two-pointer pattern is very versatile and broad. We cover specialized variants such as **Fast and Slow Pointers** and **Sliding Windows** in separate chapters.',
    },
  ],
  prevLesson: undefined,
  nextLesson: {
    title: 'Pair Sum - Sorted',
    href: '/courses/coding-patterns/two-pointers/pair-sum-sorted',
  },
};

// ─── Lesson registry ──────────────────────────────────────────────────────────
// Map URL slug to lesson data. Add new lessons here as you build them out.
// Undefined entries render a "coming soon" placeholder automatically.

export const lessonRegistry: Record<string, LessonPageData> = {
  'introduction-to-two-pointers': introToTwoPointers,
  // 'pair-sum-sorted': pairSumSorted,   ← add more lesson objects here
};

export function getLessonData(lessonSlug: string): LessonPageData | null {
  return lessonRegistry[lessonSlug] ?? null;
}