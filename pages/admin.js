import { VercelKV } from '@vercel/kv'

export async function getServerSideProps() {
  const kv = new VercelKV(process.env.VERCEL_KV_URL)
  const keys = await kv.keys('hateDevLog:*')
  const allLogs = {}
  for (let k of keys) {
    const date = k.split(':')[1]
    const items = await kv.lrange(k, 0, -1)
    allLogs[date] = items.map(JSON.parse)
  }
  return { props: { allLogs } }
}

export default function Admin({ allLogs }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Mood Logs</h1>
      {Object.entries(allLogs).map(([date, entries]) => (
        <div key={date} style={{ marginTop:'1rem' }}>
          <h2>{date}</h2>
          <ul>
            {entries.map((e,i) => (
              <li key={i}>
                {new Date(e.timestamp).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}
                → {e.value}% {e.emoji}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
