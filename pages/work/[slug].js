// pages/work/[slug].js
import WorkItems from '../../components/data-work';
import { useRouter } from 'next/router';
import styles from "./work-page.module.css";
import Image from 'next/image';

export async function getStaticPaths() {
  const paths = WorkItems.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const workItem = WorkItems.find((item) => item.slug === params.slug);

  return { props: { workItem } };
}

function WorkItem({ workItem }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className={styles.atf}>
        <Image
          src={workItem.imageTwo}
          alt="Chairs"
        />
      </section>

      <section className={styles.info}>
        <p>{workItem.medium}</p>
        <h1>{workItem.title}</h1>
        <p>{workItem.artist}</p>
        <p>{workItem.description}</p>
      </section>

      <section className={styles.atf}>
        <Image
          src={workItem.imageThree}
          alt="Chairs"
        />
      </section>
    </>
  );
}

export default WorkItem;