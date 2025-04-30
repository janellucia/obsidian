// pages/artists/[slug].js
import ArtistInfo from '../../components/data-artist';
import { useRouter } from 'next/router';
import styles from "./artist-page.module.css";
import Image from 'next/image';

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
    <>
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

    </>
  );
}

export default WorkItem;