import { useRouter } from "next/router";
import Link from 'next/link';

export default function HeaderDesktop() {
  const router = useRouter()

  return (
    <header className="desktop">
      <nav className="header-nav">
        <ul>
          <li>
            <Link className={router.pathname == "/work" || router.pathname == "/work/[slug]" ? "active" : ""} href="/work">
              Work
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