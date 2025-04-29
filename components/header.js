import { useRouter } from "next/router";
import Link from 'next/link';

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <nav className="header-nav">
        <ul>
          <li>
            <Link className={router.pathname == "/projects" || router.pathname == "/projects/[slug]" ? "active" : ""} href="/projects">
              Projects
            </Link>
            <Link className={router.pathname == "/artists" || router.pathname == "/artists/[slug]" ? "active" : ""} href="/artists">
              Artists
            </Link>
          </li>
          <li>
            <Link className="header-logo" href="/">
              Obsidian
            </Link>
          </li>
          <li>
            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
              About
            </Link>
            <Link className={router.pathname == "/contact" ? "active" : ""} href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}