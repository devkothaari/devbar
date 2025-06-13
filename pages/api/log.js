import { VercelKV } from '@vercel/kv'
const kv = new VercelKV(process.env.VERCEL_KV_URL)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { timestamp, value, emoji } = req.body
  const dateKey = timestamp.slice(0,10)   // YYYY-MM-DD
  await kv.rpush(`hateDevLog:${dateKey}`, JSON.stringify({ timestamp, value, emoji }))
  res.status(201).json({ ok: true })
}
