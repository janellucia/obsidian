import { useRouter } from "next/router";
import Link from 'next/link';

export default function Footer() {
  const router = useRouter()

  return (
    <footer className='site-footer'>
      <nav>
        <ul>
          <li>
            <p>Obsidian was created by Camila Suárez and Sofía Álvarez in 2015. Born in Argentina, they both met in Los Angeles where they started working on a collaborative process that evolved into the formation of Obsidian.</p>
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