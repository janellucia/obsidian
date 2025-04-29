import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../projects.module.css"

export default function Project(props) {
  const router = useRouter()
  return (
    <>
      <p>
        <Link href="/collaborations">
          <small>&laquo; back to all projects</small>
        </Link>
      </p>
      <h2 className={styles.title}>{props.project.title}</h2>
      <p>{props.project.content}</p>
      <button className={styles.button} onClick={() => router.push("/collaborations")}>
        Click me to programmatically navigate or redirect
      </button>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/projects-data.json")
  const data = await response.json()

  const thePaths = data.projects.map(pet => {
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
  const theProject = data.projects.filter(project => project.slug === context.params.slug)[0]

  return {
    props: {
      project: theProject,
      title: theProject.title
    }
  }
}