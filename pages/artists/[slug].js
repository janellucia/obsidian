// pages/artists/[slug].js
import ArtistInfo from '../../components/data-artist';
import { useRouter } from 'next/router';
import styles from "./artist-page.module.css";
import Image from 'next/image';
import { motion } from 'framer-motion';

export async function getStaticPaths() {
  const paths = ArtistInfo.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artist = ArtistInfo.find((item) => item.slug === params.slug);

  return { props: { artist } };
}

function WorkItem({ artist }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: .3, ease: "easeInOut" }}>
      <section className={styles.artistWrapper}>
        <div className={styles.image}>
          <Image
            src={artist.image}
            alt="Chairs"
          />
        </div>
        <div className={styles.info}>
          <p>{artist.title}</p>
          <h1>{artist.name}</h1>
          <p>{artist.subtitle}</p>
          <p>{artist.shortbio}</p>
          <p>{artist.longbio}</p>
        </div>
      </section>

    </motion.div>
  );
}

export default WorkItem;