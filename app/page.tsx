// Root "/" redirects to the first lesson so the URL always has meaningful context.
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/courses/coding-patterns/two-pointers/introduction-to-two-pointers');
}