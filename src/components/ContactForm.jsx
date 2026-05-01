import React, { useState } from 'react'
import { createMessage } from '../api/messages'

export default function ContactForm({ onCreated }){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true); setError(null)
    try{
      const created = await createMessage({ name, email, message })
      setName(''); setEmail(''); setMessage('')
      if(onCreated) onCreated(created)
    }catch(err){
      setError(err.message || 'Failed')
    }finally{setLoading(false)}
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={e=>setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </label>
      <label>
        Message
        <textarea value={message} onChange={e=>setMessage(e.target.value)} required />
      </label>
      <div className="form-actions">
        <button className="btn" type="submit" disabled={loading}>{loading? 'Sending...' : 'Send'}</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
