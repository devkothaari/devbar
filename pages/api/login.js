export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { password } = req.body
  if (password === 'ihatedev') {
    res.setHeader('Set-Cookie', `auth=true; Path=/; HttpOnly; Max-Age=86400`)
    return res.status(200).json({ ok: true })
  }
  res.status(401).json({ error: 'Invalid password' })
}
