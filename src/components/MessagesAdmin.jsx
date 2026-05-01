import React, { useEffect, useState } from 'react'
import * as api from '../api/messages'

export default function MessagesAdmin(){
  const [list,setList] = useState([])
  const [loading,setLoading] = useState(false)
  const [editing,setEditing] = useState(null)

  async function fetchList(){
    setLoading(true)
    try{
      const data = await api.listMessages()
      setList(data)
    }catch(err){
      console.error(err)
    }finally{setLoading(false)}
  }

  useEffect(()=>{fetchList()},[])

  async function handleDelete(id){
    if(!confirm('Delete this message?')) return
    await api.deleteMessage(id)
    setList(l => l.filter(x=>x.id!==id))
  }

  async function handleSave(id, updated){
    const res = await api.updateMessage(id, updated)
    setList(l => l.map(x => x.id === id ? res : x))
    setEditing(null)
  }

  return (
    <section className="admin card">
      <h3>Messages</h3>
      {loading && <div>Loading…</div>}
      {!loading && list.length===0 && <div>No messages yet.</div>}
      <ul className="messages-list">
        {list.map(m => (
          <li key={m.id} className="message-item">
            {editing===m.id ? (
              <Editor initial={m} onCancel={()=>setEditing(null)} onSave={handleSave} />
            ) : (
              <div>
                <div className="meta"><strong>{m.name}</strong> — <small>{m.email}</small> <span className="time">{new Date(m.created_at).toLocaleString()}</span></div>
                <p>{m.message}</p>
                <div className="actions">
                  <button className="btn ghost" onClick={()=>setEditing(m.id)}>Edit</button>
                  <button className="btn" onClick={()=>handleDelete(m.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Editor({ initial, onCancel, onSave }){
  const [name,setName] = useState(initial.name)
  const [email,setEmail] = useState(initial.email)
  const [message,setMessage] = useState(initial.message)

  return (
    <div className="editor">
      <label>Name<input value={name} onChange={e=>setName(e.target.value)} /></label>
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label>Message<textarea value={message} onChange={e=>setMessage(e.target.value)} /></label>
      <div className="actions">
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
        <button className="btn" onClick={()=>onSave(initial.id,{name,email,message})}>Save</button>
      </div>
    </div>
  )
}
