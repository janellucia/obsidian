import Link from 'next/link';

export default function Projects(props) {
  return (
    <>
      <h2>Our Projects</h2>
      {props.projects.map((project, index) => {
        return (
          <div key={index}>
            <h3>
              <Link href={`/collaborations/${project.slug}`}>{project.title}</Link>
            </h3>
            <p>{project.content}</p>
            <hr />
          </div>
        )
      })}
    </>
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