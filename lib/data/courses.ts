import { Course } from '@/types';

// ─── Chapter definitions ────────────────────────────────────────────────────────
// Each chapter lists its lessons. Add/remove lessons by editing the `lessons`
// arrays — the sidebar will automatically update.

export const codingPatternsCourse: Course = {
  id: 'coding-patterns',
  title: 'Coding Interview Patterns',
  slug: 'coding-patterns',
  totalLessons: 120,
  completedLessons: 0,
  chapters: [
    {
      id: 'two-pointers',
      number: '01',
      title: 'Two Pointers',
      slug: 'two-pointers',
      lessons: [
        {
          id: 'intro-two-pointers',
          title: 'Introduction to Two Pointers',
          slug: 'introduction-to-two-pointers',
          completed: false,
          isIntroduction: true,
        },
        { id: 'pair-sum-sorted', title: 'Pair Sum - Sorted', slug: 'pair-sum-sorted', completed: false },
        { id: 'triplet-sum', title: 'Triplet Sum', slug: 'triplet-sum', completed: false },
        { id: 'largest-container', title: 'Largest Container', slug: 'largest-container', completed: false },
        { id: 'is-palindrome-valid', title: 'Is Palindrome Valid', slug: 'is-palindrome-valid', completed: false },
        { id: 'shift-zeros', title: 'Shift Zeros to the End', slug: 'shift-zeros-to-the-end', completed: false },
        { id: 'next-lex', title: 'Next Lexicographical Sequence', slug: 'next-lexicographical-sequence', completed: false },
      ],
    },
    {
      id: 'hash-maps-and-sets',
      number: '02',
      title: 'Hash Maps And Sets',
      slug: 'hash-maps-and-sets',
      lessons: [
        { id: 'intro-hash', title: 'Introduction to Hash Maps And Sets', slug: 'introduction-to-hash-maps-and-sets', completed: false, isIntroduction: true },
        { id: 'two-sum', title: 'Two Sum', slug: 'two-sum', completed: false },
        { id: 'group-anagrams', title: 'Group Anagrams', slug: 'group-anagrams', completed: false },
        { id: 'top-k', title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', completed: false },
      ],
    },
    {
      id: 'linked-lists',
      number: '03',
      title: 'Linked Lists',
      slug: 'linked-lists',
      lessons: [
        { id: 'intro-linked', title: 'Introduction to Linked Lists', slug: 'introduction-to-linked-lists', completed: false, isIntroduction: true },
        { id: 'reverse-list', title: 'Reverse a Linked List', slug: 'reverse-a-linked-list', completed: false },
        { id: 'merge-two-sorted', title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', completed: false },
      ],
    },
    {
      id: 'fast-and-slow-pointers',
      number: '04',
      title: 'Fast And Slow Pointers',
      slug: 'fast-and-slow-pointers',
      lessons: [
        { id: 'intro-fast-slow', title: 'Introduction to Fast And Slow Pointers', slug: 'introduction-to-fast-and-slow-pointers', completed: false, isIntroduction: true },
        { id: 'linked-list-cycle', title: 'Linked List Cycle', slug: 'linked-list-cycle', completed: false },
        { id: 'middle-linked-list', title: 'Middle of the Linked List', slug: 'middle-of-the-linked-list', completed: false },
      ],
    },
    {
      id: 'sliding-windows',
      number: '05',
      title: 'Sliding Windows',
      slug: 'sliding-windows',
      lessons: [
        { id: 'intro-sliding', title: 'Introduction to Sliding Windows', slug: 'introduction-to-sliding-windows', completed: false, isIntroduction: true },
        { id: 'max-sum-subarray', title: 'Maximum Sum Subarray', slug: 'maximum-sum-subarray', completed: false },
        { id: 'longest-substring', title: 'Longest Substring Without Repeating', slug: 'longest-substring-without-repeating', completed: false },
      ],
    },
    {
      id: 'binary-search',
      number: '06',
      title: 'Binary Search',
      slug: 'binary-search',
      lessons: [
        { id: 'intro-binary', title: 'Introduction to Binary Search', slug: 'introduction-to-binary-search', completed: false, isIntroduction: true },
        { id: 'search-in-array', title: 'Search in a Sorted Array', slug: 'search-in-a-sorted-array', completed: false },
      ],
    },
    { id: 'stacks', number: '07', title: 'Stacks', slug: 'stacks', lessons: [{ id: 'intro-stacks', title: 'Introduction to Stacks', slug: 'introduction-to-stacks', completed: false, isIntroduction: true }] },
    { id: 'heaps', number: '08', title: 'Heaps', slug: 'heaps', lessons: [{ id: 'intro-heaps', title: 'Introduction to Heaps', slug: 'introduction-to-heaps', completed: false, isIntroduction: true }] },
    { id: 'intervals', number: '09', title: 'Intervals', slug: 'intervals', lessons: [{ id: 'intro-intervals', title: 'Introduction to Intervals', slug: 'introduction-to-intervals', completed: false, isIntroduction: true }] },
    { id: 'prefix-sums', number: '10', title: 'Prefix Sums', slug: 'prefix-sums', lessons: [{ id: 'intro-prefix', title: 'Introduction to Prefix Sums', slug: 'introduction-to-prefix-sums', completed: false, isIntroduction: true }] },
    { id: 'trees', number: '11', title: 'Trees', slug: 'trees', lessons: [{ id: 'intro-trees', title: 'Introduction to Trees', slug: 'introduction-to-trees', completed: false, isIntroduction: true }] },
    { id: 'tries', number: '12', title: 'Tries', slug: 'tries', lessons: [{ id: 'intro-tries', title: 'Introduction to Tries', slug: 'introduction-to-tries', completed: false, isIntroduction: true }] },
    { id: 'graphs', number: '13', title: 'Graphs', slug: 'graphs', lessons: [{ id: 'intro-graphs', title: 'Introduction to Graphs', slug: 'introduction-to-graphs', completed: false, isIntroduction: true }] },
    { id: 'backtracking', number: '14', title: 'Backtracking', slug: 'backtracking', lessons: [{ id: 'intro-bt', title: 'Introduction to Backtracking', slug: 'introduction-to-backtracking', completed: false, isIntroduction: true }] },
    { id: 'dynamic-programming', number: '15', title: 'Dynamic Programming', slug: 'dynamic-programming', lessons: [{ id: 'intro-dp', title: 'Introduction to Dynamic Programming', slug: 'introduction-to-dynamic-programming', completed: false, isIntroduction: true }] },
    { id: 'greedy', number: '16', title: 'Greedy', slug: 'greedy', lessons: [{ id: 'intro-greedy', title: 'Introduction to Greedy', slug: 'introduction-to-greedy', completed: false, isIntroduction: true }] },
    { id: 'sort-and-search', number: '17', title: 'Sort And Search', slug: 'sort-and-search', lessons: [{ id: 'intro-sort', title: 'Introduction to Sort And Search', slug: 'introduction-to-sort-and-search', completed: false, isIntroduction: true }] },
    { id: 'bit-manipulation', number: '18', title: 'Bit Manipulation', slug: 'bit-manipulation', lessons: [{ id: 'intro-bit', title: 'Introduction to Bit Manipulation', slug: 'introduction-to-bit-manipulation', completed: false, isIntroduction: true }] },
    { id: 'math-and-geometry', number: '19', title: 'Math And Geometry', slug: 'math-and-geometry', lessons: [{ id: 'intro-math', title: 'Introduction to Math And Geometry', slug: 'introduction-to-math-and-geometry', completed: false, isIntroduction: true }] },
  ],
};

/** Registry — add new courses here and the routing resolves them automatically */
export const courses: Record<string, Course> = {
  'coding-patterns': codingPatternsCourse,
};

/** Convenience helper: find a single chapter within a course */
export function getChapter(courseSlug: string, chapterSlug: string) {
  return courses[courseSlug]?.chapters.find(c => c.slug === chapterSlug);
}