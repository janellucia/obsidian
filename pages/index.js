import Link from 'next/link';

export default function Home(props) {
  return (
    <main>
      <h1>Welcome!</h1>
      <p>hello world, i love you</p>
      <Link href="/about">Visit the about page</Link>
      <p>The weather: {props.forecast}</p>
    </main>
  )
}

export async function getServerSideProps() {
  const response = await fetch("https://api.weather.gov/gridpoints/MFL/109,49/forecast")
  const data = await response.json()

  return {
    props: {
      forecast: data.properties.periods[0].detailedForecast
    }
  }
}