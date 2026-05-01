import React, { useEffect, useState } from 'react'
import * as api from '../api/skills'

export default function SkillsAdmin(){
  const [skills,setSkills] = useState([])
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [level,setLevel] = useState('Intermediate')

  async function fetch(){
    setLoading(true)
    try{ const data = await api.listSkills(); setSkills(data) }catch(e){console.error(e)}finally{setLoading(false)}
  }

  useEffect(()=>{ fetch() },[])

  async function handleAdd(e){
    e.preventDefault()
    try{
      const created = await api.createSkill({ name, category, level })
      setSkills(s => [created, ...s])
      setName(''); setCategory(''); setLevel('Intermediate')
    }catch(err){console.error(err)}
  }

  async function handleDelete(id){
    if(!confirm('Delete this skill?')) return
    await api.deleteSkill(id)
    setSkills(s => s.filter(x=>x.id!==id))
  }

  return (
    <section className="admin card">
      <h3>Skills Admin</h3>
      <form className="skills-form" onSubmit={handleAdd}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Category (e.g., Web)" value={category} onChange={e=>setCategory(e.target.value)} />
        <select value={level} onChange={e=>setLevel(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button className="btn" type="submit">Add</button>
      </form>

      {loading && <div>Loading…</div>}
      <ul className="skills-admin-list">
        {skills.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong> <small>{s.category}</small> — <em>{s.level}</em>
            <div className="actions"><button className="btn ghost" onClick={()=>handleDelete(s.id)}>Delete</button></div>
          </li>
        ))}
      </ul>
    </section>
  )
}
