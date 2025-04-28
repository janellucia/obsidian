import { useRouter } from "next/router";
import Link from 'next/link';

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <h1>
        <Link className={router.pathname == "/" ? "active" : ""} href="/">
          Our Site
        </Link>
      </h1>
      <nav className="header-nav">
        <ul>
          <li>
            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={router.pathname == "/projects" || router.pathname == "/projects/[slug]" ? "active" : ""} href="/projects">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}