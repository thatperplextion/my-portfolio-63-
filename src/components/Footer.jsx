import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="socials">
          <a href="https://www.codechef.com/users/junaid_063" target="_blank" rel="noopener noreferrer">CodeChef</a>
          <a href="https://linkedin.com/in/thatperplextion" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/thatperplextion" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <small>© {new Date().getFullYear()} JUNAID ASAD KHAN — Built with React + Vite</small>
      </div>
    </footer>
  )
}
