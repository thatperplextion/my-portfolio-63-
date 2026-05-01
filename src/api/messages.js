// Use relative API base so the frontend works when served from the same origin
const BASE = (typeof window !== 'undefined') ? '' : (process.env.VITE_API_BASE || 'http://localhost:4000')

export async function listMessages(){
  const res = await fetch(`${BASE}/api/messages`)
  if(!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function getMessage(id){
  const res = await fetch(`${BASE}/api/messages/${id}`)
  if(!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function createMessage(payload){
  const res = await fetch(`${BASE}/api/messages`,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Failed to create')
  return res.json()
}

export async function updateMessage(id,payload){
  const res = await fetch(`${BASE}/api/messages/${id}`,{
    method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Failed to update')
  return res.json()
}

export async function deleteMessage(id){
  const res = await fetch(`${BASE}/api/messages/${id}`,{method:'DELETE'})
  if(!res.ok) throw new Error('Failed to delete')
  return res.json()
}

export default { listMessages, getMessage, createMessage, updateMessage, deleteMessage }
