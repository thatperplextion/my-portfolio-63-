import React from 'react'

export default function ProjectCard({ title, desc, link, repo }) {
  return (
    <article className="project-card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="project-links">
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">Live</a>
        )}
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer">Code</a>
        )}
      </div>
    </article>
  )
}
