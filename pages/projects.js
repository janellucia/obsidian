import Link from 'next/link';
// import DataImages from './recent-work-data'

export default function Projects(props) {
  return (
    <main>
      <h2>Our Projects</h2>
      {props.projects.map((project, index) => {
        return (
          <div key={index}>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <p>{project.content}</p>
            <hr />
          </div>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://raw.githubusercontent.com/janellucia/obsidian/refs/heads/main/pages/projects-data.json")
  const data = await response.json()

  return {
    props: {
      projects: data.projects
    }
  }
}