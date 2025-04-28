import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../projects.module.css"

export default function Project(props) {
  const router = useRouter()
  return (
    <>
      <p>
        <Link href="/projects">
          <small>&laquo; back to all projects</small>
        </Link>
      </p>
      <h2 className={styles.title}>{props.post.title}</h2>
      <p>{props.post.content}</p>
      <button className={styles.button} onClick={() => router.push("/projects")}>
        Click me to programmatically navigate or redirect
      </button>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/projects-data.json")
  const data = await response.json()

  const thePaths = data.posts.map(pet => {
    return { params: { slug: pet.slug } }
  })

  return {
    paths: thePaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/projects-data.json")
  const data = await response.json()
  const thePost = data.posts.filter(post => post.slug === context.params.slug)[0]

  return {
    props: {
      post: thePost,
      title: thePost.title
    }
  }
}