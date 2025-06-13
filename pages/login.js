import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function onSubmit(e) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ password: pwd })
    })
    if (res.ok) router.push('/')
    else setErr('Wrong password')
  }

  return (
    <div style={{ textAlign:'center', marginTop:'20vh' }}>
      <h1>Please enter password</h1>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="Password"
          style={{ padding:8 }}
        />
        <button type="submit" style={{ marginLeft:8 }}>Go</button>
      </form>
      {err && <p style={{ color:'red' }}>{err}</p>}
    </div>
  )
}
