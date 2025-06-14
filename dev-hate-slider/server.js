const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const LOG_FILE = path.join(__dirname, 'log.json');

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// API: Save a slider submission
app.post('/api/submit', (req, res) => {
  const { name, value } = req.body;
  const now = new Date();
  const entry = {
    name,
    value,
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    date: now.toISOString().split('T')[0]
  };
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8') || '[]');
  }
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  res.json({ success: true });
});

// (Optional) Admin logs page
app.get('/logs', (req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.send('<h2>No logs yet!</h2>');
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  let html = '<h1>Dev Hate Slider Logs</h1><table border="1" cellpadding="8"><tr><th>Date</th><th>Time</th><th>Name</th><th>Value</th></tr>';
  logs.reverse().forEach(log => {
    html += `<tr><td>${log.date}</td><td>${log.time}</td><td>${log.name}</td><td>${log.value}%</td></tr>`;
  });
  html += '</table>';
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
