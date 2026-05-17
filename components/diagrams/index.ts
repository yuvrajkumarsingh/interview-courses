import React from 'react';
import {
  DiagramSinglePointer,
  DiagramTwoPointers,
  DiagramSortedArray,
  DiagramInwardTraversal,
  DiagramUnidirectional,
  DiagramStagedTraversal,
  DiagramChapterOutline,
} from './TwoPointerDiagrams';

// Registry maps a stable string ID → React component.
// Add new chapters by importing their diagram files and adding entries here.
export const DIAGRAMS: Record<string, React.ComponentType> = {
  'two-ptr-single':      DiagramSinglePointer,
  'two-ptr-comparison':  DiagramTwoPointers,
  'two-ptr-sorted':      DiagramSortedArray,
  'two-ptr-inward':      DiagramInwardTraversal,
  'two-ptr-unidirect':   DiagramUnidirectional,
  'two-ptr-staged':      DiagramStagedTraversal,
  'two-ptr-outline':     DiagramChapterOutline,
};