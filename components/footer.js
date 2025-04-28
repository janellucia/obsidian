import { useRouter } from "next/router";
import Link from 'next/link';

export default function Footer() {
  const router = useRouter()

  return (
    <footer className='site-footer'>
      <nav className="header-nav">
        <ul>
          <li>
            <Link className={router.pathname == "/" ? "active" : ""} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
              About
            </Link>
          </li>
          {/* <li>
            <Link className={router.pathname == "/blog" || router.pathname == "/blog/[slug]" ? "active" : ""} href="/blog">
              Blog
            </Link>
          </li> */}
        </ul>
      </nav>
    </footer>
  )
}