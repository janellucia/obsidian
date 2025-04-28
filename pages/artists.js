import Link from 'next/link';

export default function Artists(props) {
  return (
    <main>
      <h2>Our Artists</h2>
      {props.artists.map((artist, index) => {
        return (
          <div key={index}>
            <h3>
              <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
            </h3>
            <p>{artist.title}</p>
            <hr />
          </div>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/artists-data.json")
  const data = await response.json()

  return {
    props: {
      artists: data.artists
    }
  }
}