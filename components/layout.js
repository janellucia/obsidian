import Header from './header';
import Footer from './footer';
import HeaderDesktop from './header-desktop';

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