import Link from 'next/link';

export default function About() {
  return (
    <main>
      <h1>The About Page!</h1>
      <p>this is the about content</p>
      <Link href="/">Visit the home page</Link>
    </main>
  )
}