// pages/index.js
import { useState, useEffect } from 'react'

export default function Home() {
  // slider state
  const [value, setValue] = useState(101)
  const emojiFor = v => 
    v>90?'😡':v>80?'😠':v>70?'😤':v>60?'😒':v>50?'😕':v>40?'😐':v>30?'🙂':v>20?'😊':'😇'

  // on mount, restore from localStorage for instant UI
  useEffect(() => {
    const lm = JSON.parse(localStorage.getItem('lastMood'))
    if (lm) setValue(lm.value)
  }, [])

  // whenever `value` changes, push to API & localStorage
  useEffect(() => {
    const ts = new Date().toISOString()
    const entry = { timestamp: ts, value, emoji: emojiFor(value) }
    // 1) Store locally for immediate restore
    localStorage.setItem('lastMood', JSON.stringify(entry))
    // 2) Fire off a log write
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    }).catch(console.error)
  }, [value])

  // date text
  const today = new Date().toLocaleDateString('en-GB', {
    year:'numeric', month:'short', day:'numeric'
  })

  return (
    <div style={{ /* your inline styles or import a CSS file */ }}>
      <div style={{ position:'absolute',top:20,left:20,background:'#fff',padding:'8px'}}>
        {today}
      </div>
      <h1>How Much Do We Hate Dev Today?</h1>
      <div className="slider-container">
        <div className="progress-bar">
          <div className="fill" style={{ width: value + '%' }} />
        </div>
        <div className="percentage">{value}%</div>
        <div className="emoji">{emojiFor(value)}</div>
        <input
          type="range"
          min="0"
          max="101"
          value={value}
          onChange={e => setValue(+e.target.value)}
        />
      </div>
    </div>
  )
}
