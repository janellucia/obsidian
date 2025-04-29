import Link from 'next/link';

export default function Artists(props) {
  return (
    <>
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
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/artists-data.json');
  const data = await response.json();

  return {
    props: {
      artists: data.artists
    }
  }
}