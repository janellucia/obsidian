import Header from './header';
// import Footer from './footer';
import HeaderDesktop from './header-desktop';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./footer'), { ssr: false });

export default function Layout({ children }) {

  return (
    <>
      <Header />
      <HeaderDesktop />
      <main>
        {children}</main>
      <Footer />
    </>
  )
}