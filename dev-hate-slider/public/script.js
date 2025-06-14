// Set date
const dateBox = document.getElementById('date-box');
if (dateBox) {
  const today = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  dateBox.textContent = today.toLocaleDateString('en-GB', options);
}

let username = '';

function saveName() {
  username = document.getElementById('name').value.trim();
  if (!username) return alert("Tell us your name, sunshine!");
  document.getElementById('nameForm').style.display = "none";
  document.getElementById('sliderArea').style.display = "";
}

// Emoji/slider logic
const slider = document.getElementById('slider');
const fillBar = document.getElementById('fill-bar');
const percentage = document.getElementById('percentage');
const emoji = document.getElementById('emoji');
const submitBtn = document.getElementById('submitBtn');
const thankyou = document.getElementById('thankyou');

function updateUI(value) {
  fillBar.style.width = value + '%';
  percentage.textContent = value + '%';
  if (value > 90) emoji.textContent = '😡';
  else if (value > 80) emoji.textContent = '😠';
  else if (value > 70) emoji.textContent = '😤';
  else if (value > 60) emoji.textContent = '😒';
  else if (value > 50) emoji.textContent = '😕';
  else if (value > 40) emoji.textContent = '😐';
  else if (value > 30) emoji.textContent = '🙂';
  else if (value > 20) emoji.textContent = '😊';
  else emoji.textContent = '😇';
}
if (slider) {
  slider.addEventListener('input', (e) => updateUI(e.target.value));
  // Init state
  updateUI(slider.value);

  submitBtn.onclick = async function() {
    if (!username) return alert("What's your name, cutie?");
    const value = slider.value;
    await fetch('/api/submit', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name: username, value })
    });
    thankyou.style.display = '';
    setTimeout(()=>{ thankyou.style.display='none'; }, 2000);
  }
}
