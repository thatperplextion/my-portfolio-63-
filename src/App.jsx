import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import MessagesAdmin from './components/MessagesAdmin'
import SkillsAdmin from './components/SkillsAdmin'
import SkillsList from './components/SkillsList'

const CONTACT = {
  name: 'JUNAID ASAD KHAN',
  location: 'Hyderabad, India',
  phone: '9392791469',
  email: 'junaidforsure.98@gmail.com',
  linkedin: 'https://linkedin.com/in/thatperplextion',
  github: 'https://github.com/thatperplextion',
  codechef: 'https://www.codechef.com/users/junaid_063'
}


export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="hero">
          <h1>{CONTACT.name}</h1>
          <p className="muted">{CONTACT.location} • <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a> • <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p className="lead">Undergraduate student (AI & Data Science). Building full‑stack applications, intelligent systems and scalable backend services. Seeking part-time internships in Web or Software Development.</p>
          <p className="links">
            <a href={CONTACT.codechef} target="_blank" rel="noopener noreferrer">CodeChef</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </section>

        <section id="about" className="card">
          <h2 className="section-title">Professional Summary</h2>
          <p>Undergraduate student specializing in Artificial Intelligence & Data Science with hands-on experience building full-stack applications, intelligent systems, and scalable backend services. Strong foundation in Java, Python, React, and modern databases. Actively seeking part-time internships to contribute and grow as an engineer.</p>

          <h3 className="section-sub">Education</h3>
          <p><strong>B.Tech — Artificial Intelligence & Data Science</strong> • CGPA: 8.7</p>

          <h3 className="section-sub">Selected Technical Skills</h3>
          <p>Below are my main skills (stored in local DB for demo):</p>
          <div style={{marginTop:10}}>
            <SkillsList />
          </div>
          <div style={{marginTop:12}}>
            <SkillsAdmin />
          </div>
        </section>

        {/* Projects section removed per request */}

        <section id="contact" className="card">
          <h2 className="section-title">Contact</h2>
          <p>Available for part-time internships. Email me at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or connect on <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
          <h3 className="section-sub">Contact / Guestbook</h3>
          <p>Visitors can send a message below — messages are stored in your local MySQL via the demo API.</p>
          <div className="contact-grid">
            <div style={{flex:'1 1 420px'}}>
              <ContactForm onCreated={() => { /* parent may refresh admin list via window event */ }} />
            </div>
            <div style={{flex:'1 1 420px'}}>
              <MessagesAdmin />
            </div>
          </div>
          <h3 className="section-sub">Soft Skills</h3>
          <p>Problem Solving • Quick Learner • Time Management • Team Collaboration</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
