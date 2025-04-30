import Layout from '../components/layout'
import Head from "next/head"
import "../styles/global.css"
import "../styles/home.css"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title ? pageProps.title : "Obsidian"}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}