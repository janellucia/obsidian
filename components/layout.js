import Header from './header';
import Footer from './footer';
import HeaderDesktop from './header-desktop';
import { motion } from 'framer-motion';

export default function Layout({ children }) {

  return (
    <motion.div
    >
      <Header />
      <HeaderDesktop />
      <motion.main>
        {children}</motion.main>
      <Footer />
    </motion.div>
  )
}