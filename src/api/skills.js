// Use relative API base so the frontend works when served from the same origin
const BASE = (typeof window !== 'undefined') ? '' : (process.env.VITE_API_BASE || 'http://localhost:4000')

export async function listSkills(){
  const res = await fetch(`${BASE}/api/skills`)
  if(!res.ok) throw new Error('Failed to fetch skills')
  return res.json()
}

export async function createSkill(payload){
  const res = await fetch(`${BASE}/api/skills`,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Failed to create skill')
  return res.json()
}

export async function updateSkill(id,payload){
  const res = await fetch(`${BASE}/api/skills/${id}`,{
    method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Failed to update skill')
  return res.json()
}

export async function deleteSkill(id){
  const res = await fetch(`${BASE}/api/skills/${id}`,{method:'DELETE'})
  if(!res.ok) throw new Error('Failed to delete skill')
  return res.json()
}

export default { listSkills, createSkill, updateSkill, deleteSkill }
