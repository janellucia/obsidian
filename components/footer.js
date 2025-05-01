import { useRouter } from "next/router";
import Link from 'next/link';

export default function Footer() {
  const router = useRouter()

  return (
    <footer className='site-footer'>
      <nav>
        <ul>
          <li>
            <p>We collaborate with curators, clients, and institutions on original commissions and exhibitions.</p>
          </li>
          <li>
            <Link className={router.pathname == "/work" || router.pathname == "/work/[slug]" ? "active" : ""} href="/work">
              Work
            </Link>
            <Link href="">
              Podcast
            </Link>
          </li>
          <li>
            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
              About
            </Link>
            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
              Careers
            </Link>
            <Link className={router.pathname == "/contact" ? "active" : ""} href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link href="">Instagram</Link>
            <Link href="">Pinterest</Link>
            <Link href="">Youtube</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}