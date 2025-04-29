import Link from "next/link"
import styles from "../artists.module.css"

export default function Artist(props) {
  return (
    <>
      <section>
        <p className={styles.title}>{props.artist.title}</p>
        <h1 className={styles.name}>{props.artist.name}</h1>
        <p>{props.artist.subtitle}</p>
        <p>{props.artist.shortbio}</p>
        <p>{props.artist.longbio}</p>
        <p>
          <Link href="/artists">
            <small>&laquo; back to all artists</small>
          </Link>
        </p>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/atists-data.json")
  const data = await response.json()

  const thePaths = data.artists.map(pet => {
    return { params: { slug: pet.slug } }
  })

  return {
    paths: thePaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/atists-data.json")
  const data = await response.json()
  const theArtist = data.artists.filter(artist => artist.slug === context.params.slug)[0]

  return {
    props: {
      artist: theArtist,
      title: theArtist.title
    }
  }
}