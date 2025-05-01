import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react'; // Add useRef here
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';
import ArtistInfo from '../../components/data-artist';
import styles from './artist-page.module.css';
import Image from 'next/image';
import WorkItems from '../../components/data-work';

gsap.registerPlugin(ScrollTrigger);

export async function getStaticPaths() {
  const paths = ArtistInfo.map((item) => ({
    params: { slug: item.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artist = ArtistInfo.find((item) => item.slug === params.slug);
  const relatedWork = WorkItems.filter((item) =>
    item.artist === artist.name
  ); // Assuming you have an `artist` field in WorkItems
  return { props: { artist, relatedWork } };
}

function ArtistPage({ artist, relatedWork }) {
  const router = useRouter();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.from(wrapperRef.current, {
      y: 300,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: infoRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    });

    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Ensure page loads again with animation
          setIsPageLoaded(false);
        },
      });
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  if (!isPageLoaded) return <div>Loading...</div>;

  return (
    <div ref={wrapperRef}>
      <Head>
        <title>{`${artist.name} | Artist Portfolio`}</title>
        <meta name="description" content={artist.longbio} />
        <meta property="og:title" content={artist.name} />
        <meta property="og:description" content={artist.longbio} />
        <meta property="og:image" content={artist.image.src} />
      </Head>
      <section className={styles.artistWrapper}>
        <div className={styles.image} ref={imageRef}>
          <Image
            src={artist.image}
            alt={artist.name}
            width={700}
            height={800}
            className={styles.artistImage}
          />
        </div>
        <div className={styles.info} ref={infoRef}>
          <p className={styles.title}>{artist.title}</p>
          <h1>{artist.name}</h1>
          <p className={styles.subtitle}>{artist.subtitle}</p>
          <p className={styles.shortbio}>{artist.shortbio}</p>
          <p className={styles.longbio}>{artist.longbio}</p>
        </div>
      </section>

      <section className={styles.relatedWork}>
        <h2>Related Works</h2>
        <div className={styles.relatedWorkList}>
          {relatedWork.map((work) => (
            <div key={work.slug} className={styles.workItem}>
              <Image
                src={work.imageOne}
                alt={work.title}
                width={300}
                height={200}
                className={styles.workImage}
              />
              <h3>{work.title}</h3>
              <p>{work.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistPage;
