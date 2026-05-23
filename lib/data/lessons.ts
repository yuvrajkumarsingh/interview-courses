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
    { type: 'diagram', diagramId: 'two-ptr-single' },
    {
      type: 'paragraph',
      text: 'Introducing a second pointer opens a new world of possibilities. Most importantly, we can now make **comparisons**. With pointers at two different positions, we can compare the elements at those positions and make decisions based on the comparison:',
    },
    { type: 'diagram', diagramId: 'two-ptr-comparison' },
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
    { type: 'diagram', diagramId: 'two-ptr-sorted' },
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
    { type: 'diagram', diagramId: 'two-ptr-inward' },
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
      type: 'diagram',
      diagramId: 'two-ptr-unidirect'
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
    { type: 'diagram', diagramId: 'two-ptr-staged' },
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
    { type: 'diagram', diagramId: 'two-ptr-outline' },
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

export const pairSumSorted: LessonPageData = {
  title: 'Pair Sum - Sorted',
  courseTitle: 'Coding Interview Patterns',
  courseSlug: 'coding-patterns',
  chapterTitle: 'Two Pointers',
  chapterSlug: 'two-pointers',
  content: [
    {
      type: 'paragraph',
      text: 'Given a sorted array of integers and a target value, return the indices of two numbers whose sum equals the target. If no pair exists, return an empty array. The order of the two returned indices does not matter.',
    },
    { type: 'h3', text: 'Example 1' },
    {
      type: 'example',
      lines: [
        'Input:  nums = [-5, -2, 3, 4, 6], target = 7',
        'Output: [2, 3]',
      ],
    },
    {
      type: 'paragraph',
      text: 'The values at indices `2` and `3` are `3` and `4`, and `3 + 4 = 7`.',
    },
    { type: 'h3', text: 'Example 2' },
    {
      type: 'example',
      lines: [
        'Input:  nums = [-1, 1, 1], target = 2',
        'Output: [0, 1]',
      ],
    },
    {
      type: 'paragraph',
      text: 'Any two distinct `1` values form the target. Other valid answers include `[0, 2]`, `[1, 0]`, `[2, 0]`, and `[2, 1]`.',
    },

    { type: 'h2', text: 'Intuition' },
    {
      type: 'paragraph',
      text: 'A brute-force solution checks every possible pair. That works, but it repeats a lot of unnecessary comparisons because the input array is already sorted.',
    },
    {
      type: 'code',
      tabs: [
        {
          label: 'Python',
          code: `def pair_sum_brute_force(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        },
        {
          label: 'JavaScript',
          code: `function pairSumBruteForce(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
        },
        {
          label: 'Java',
          code: `public int[] pairSumBruteForce(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    return new int[] {};
}`,
        },
        {
          label: 'C++',
          code: `vector<int> pairSumBruteForce(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}`,
        },
      ],
    },
    {
      type: 'paragraph',
      text: 'The brute-force approach has `O(n^2)` time complexity because each element can be paired with many later elements. The sorted order gives us a better option.',
    },
    {
      type: 'paragraph',
      text: 'For `nums = [-5, -2, 3, 4, 6]` and `target = 7`, place `left` at the smallest value and `right` at the largest value. Their first sum is `1`.',
    },
    { type: 'diagram', diagramId: 'pair-sum-start' },
    {
      type: 'paragraph',
      text: 'Since `1` is less than the target, we need a larger sum. The sorted order tells us which pointer to move:',
    },
    {
      type: 'list',
      items: [
        '**Move left right** to choose a larger left-side value and increase the sum.',
        '**Move right left** only when the current sum is too large and we need a smaller value.',
      ],
    },
    {
      type: 'paragraph',
      text: 'So we increment `left`.',
    },
    { type: 'diagram', diagramId: 'pair-sum-left' },
    {
      type: 'paragraph',
      text: 'The sum is still too small, so we increment `left` once more.',
    },
    { type: 'diagram', diagramId: 'pair-sum-left-again' },
    {
      type: 'paragraph',
      text: 'Now the sum is `9`, which is too large. This time we need a smaller sum, so we decrement `right`.',
    },
    { type: 'diagram', diagramId: 'pair-sum-right' },
    {
      type: 'paragraph',
      text: 'Finally, `nums[left] + nums[right]` equals the target. We return the two indices.',
    },
    { type: 'diagram', diagramId: 'pair-sum-found' },
    {
      type: 'list',
      items: [
        'If `nums[left] + nums[right]` is less than the target, increment `left`.',
        'If `nums[left] + nums[right]` is greater than the target, decrement `right`.',
        'If the sum equals the target, return `[left, right]`.',
        'If the pointers meet, no valid pair exists.',
      ],
    },

    { type: 'h2', text: 'Implementation' },
    {
      type: 'code',
      tabs: [
        {
          label: 'Python',
          code: `def pair_sum_sorted(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]

        if current_sum < target:
            left += 1
        elif current_sum > target:
            right -= 1
        else:
            return [left, right]

    return []`,
        },
        {
          label: 'JavaScript',
          code: `function pairSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const currentSum = nums[left] + nums[right];

    if (currentSum < target) {
      left++;
    } else if (currentSum > target) {
      right--;
    } else {
      return [left, right];
    }
  }

  return [];
}`,
        },
        {
          label: 'Java',
          code: `public int[] pairSumSorted(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left < right) {
        int currentSum = nums[left] + nums[right];

        if (currentSum < target) {
            left++;
        } else if (currentSum > target) {
            right--;
        } else {
            return new int[] { left, right };
        }
    }

    return new int[] {};
}`,
        },
        {
          label: 'C++',
          code: `vector<int> pairSumSorted(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;

    while (left < right) {
        int currentSum = nums[left] + nums[right];

        if (currentSum < target) {
            left++;
        } else if (currentSum > target) {
            right--;
        } else {
            return {left, right};
        }
    }

    return {};
}`,
        },
      ],
    },

    { type: 'h2', text: 'Complexity Analysis' },
    {
      type: 'paragraph',
      text: '**Time complexity:** `O(n)`, because each pointer only moves inward and each element is visited at most once.',
    },
    {
      type: 'paragraph',
      text: '**Space complexity:** `O(1)`, because the algorithm uses only a fixed number of variables.',
    },

    { type: 'h2', text: 'Test Cases' },
    {
      type: 'paragraph',
      text: 'These examples cover empty input, no match, duplicate values, negative numbers, and a valid pair at different positions.',
    },
    {
      type: 'table',
      table: {
        headers: ['Input', 'Expected output', 'Description'],
        rows: [
          ['`nums = []`, `target = 8`', '`[]`', 'Empty array.'],
          ['`nums = [1]`, `target = 1`', '`[]`', 'Only one value, so no pair is possible.'],
          ['`nums = [2, 3]`, `target = 5`', '`[0, 1]`', 'The only two values form the target.'],
          ['`nums = [2, 4]`, `target = 5`', '`[]`', 'Two values exist, but their sum is not the target.'],
          ['`nums = [2, 2, 3]`, `target = 5`', '`[1, 2]`', 'Duplicate values are allowed.'],
          ['`nums = [-1, 2, 3]`, `target = 2`', '`[0, 2]`', 'A negative number can participate in the answer.'],
          ['`nums = [-3, -2, -1]`, `target = -5`', '`[0, 1]`', 'The target can also be negative.'],
        ],
      },
    },

    { type: 'h2', text: 'Interview Tip' },
    {
      type: 'callout',
      variant: 'tip',
      text: 'When the input is sorted, pause before reaching for a hash map. A two-pointer solution often uses less memory and is easier to reason about because every move has a clear purpose: increase the sum or decrease the sum.',
    },
  ],
  prevLesson: {
    title: 'Introduction to Two Pointers',
    href: '/courses/coding-patterns/two-pointers/introduction-to-two-pointers',
  },
  nextLesson: {
    title: 'Triplet Sum',
    href: '/courses/coding-patterns/two-pointers/triplet-sum',
  },
};

// ─── Lesson registry ──────────────────────────────────────────────────────────
// Map URL slug to lesson data. Add new lessons here as you build them out.
// Undefined entries render a "coming soon" placeholder automatically.

export const lessonRegistry: Record<string, LessonPageData> = {
  'introduction-to-two-pointers': introToTwoPointers,
  'pair-sum-sorted': pairSumSorted,
};

export function getLessonData(lessonSlug: string): LessonPageData | null {
  return lessonRegistry[lessonSlug] ?? null;
}
