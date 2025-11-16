const OPENAI_API_KEY = "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";
const BOT_NAME = "Twenty35";

const chatIcon = document.getElementById('chatIcon');
const chatOverlay = document.getElementById('chatOverlay');
const sendBtn = document.getElementById('send');
const userInput = document.getElementById('input');
const chatMessages = document.getElementById('chatMessages');

// --- Floating icon behavior ---
let isDragging = false, offsetX, offsetY;

chatIcon.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - chatIcon.offsetLeft;
  offsetY = e.clientY - chatIcon.offsetTop;
  chatIcon.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if(isDragging) {
    chatIcon.style.left = e.clientX - offsetX + 'px';
    chatIcon.style.top = e.clientY - offsetY + 'px';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  chatIcon.style.cursor = 'grab';
});

// --- Overlay appears near icon ---
chatIcon.addEventListener('click', () => {
  if(chatOverlay.style.display === 'flex') {
    chatOverlay.style.display = 'none';
  } else {
    chatOverlay.style.display = 'flex';
    const iconRect = chatIcon.getBoundingClientRect();
    const overlayWidth = chatOverlay.offsetWidth;
    const overlayHeight = chatOverlay.offsetHeight;

    let top = iconRect.top - overlayHeight - 10;
    if(top < 10) top = iconRect.bottom + 10;

    let left = iconRect.left + iconRect.width/2 - overlayWidth/2;
    if(left < 10) left = 10;
    if(left + overlayWidth > window.innerWidth - 10) left = window.innerWidth - overlayWidth - 10;

    chatOverlay.style.top = top + 'px';
    chatOverlay.style.left = left + 'px';

    // Send welcome message
    if(!chatMessages.hasChildNodes()) {
      addMessage(BOT_NAME, "Hi! Tell me your mood or favorite songs, and I’ll recommend music — I can reply in English, Japanese, or Burmese!");
    }
  }
});

// --- OpenAI Chat Logic ---
async function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;
  addMessage("You", message);
  userInput.value = "";

  const loadingId = addMessage(BOT_NAME, "Thinking");
  const dotsInterval = startThinkingAnimation(loadingId);

  try {
    const systemMessage = `You are a music recommendation chatbot.
Always respond in the same language as the user input.
Recommend 3–5 songs based on the user's mood, feelings, or favorite artists.
For each recommendation, ALWAYS include:
1. Song title
2. Artist name
3. Spotify search link
4. Apple Music search link
5. YouTube search link
Give sweet messages for users, depend on user's mood.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    clearInterval(dotsInterval);
    updateMessage(loadingId, botMessage);
  } catch (err) {
    console.error(err);
    clearInterval(dotsInterval);
    updateMessage(loadingId, "Oops! Something went wrong.");
  }
}

// --- Helper functions ---
function addMessage(sender, text) {
  let htmlText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  const lines = htmlText.split(/\n|(?=\d+\.)/);
  const formatted = lines.map(l=>l.trim()).filter(l=>l).map(l=>`<p>${l}</p>`).join("");

  const id = `msg-${Date.now()}`;
  chatMessages.innerHTML += `<div id="${id}"><strong>${sender}:</strong>${formatted}</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return id;
}

function updateMessage(id, text) {
  const msgDiv = document.getElementById(id);
  if(!msgDiv) return;
  let htmlText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  const lines = htmlText.split(/\n|(?=\d+\.)/);
  const formatted = lines.map(l=>l.trim()).filter(l=>l).map(l=>`<p>${l}</p>`).join("");
  msgDiv.innerHTML = `<strong>${BOT_NAME}:</strong>${formatted}`;
}

function startThinkingAnimation(id) {
  let dots = 0;
  return setInterval(() => {
    const msgDiv = document.getElementById(id);
    if(!msgDiv) return;
    dots = (dots+1)%4;
    msgDiv.innerHTML = `<strong>${BOT_NAME}:</strong> Thinking${'.'.repeat(dots)}`;
  }, 500);
}

// --- Event listeners ---
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e=>{ if(e.key==="Enter") sendMessage(); });