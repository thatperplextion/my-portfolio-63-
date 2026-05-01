import React, { useEffect, useState } from 'react'
import { listSkills } from '../api/skills'

export default function SkillsList(){
  const [skills,setSkills] = useState([])
  useEffect(()=>{ listSkills().then(setSkills).catch(()=>{}) },[])
  if(!skills || skills.length===0) return <div>No skills listed yet.</div>
  return (
    <div className="skills-list">
      {skills.map(s => (
        <span key={s.id} className="skill-pill">{s.name} <small>({s.level})</small></span>
      ))}
    </div>
  )
}
