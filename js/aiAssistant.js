const BOT_NAME = "Twenty35";
const sendBtn = document.getElementById('send');
const userInput = document.getElementById('input');
const chatMessages = document.getElementById('chatMessages');
const historyList = document.getElementById('historyList');
const quickSuggestionsContainer = document.getElementById('quickSuggestions');
const suggestBtns = quickSuggestionsContainer.querySelectorAll('.suggest-btn');


//  overlays
const overlayHistory = document.getElementById('overlayHistory');
const overlayGuide   = document.getElementById('overlayGuide');


// Quick Chat Suggestions
const quickSuggestions = [
    "I'm feeling happy, recommend some upbeat songs!",
    "What are some relaxing Japanese songs?",
    "Suggest some Burmese folk music.",
    "I like rock music, any English band recommendations?",
    "Recommend songs for studying.",
    "What are some good K-pop songs right now?",
    "I need some motivational music.",
    "Suggest songs for a workout.",
    "What's a good song for a road trip?",
    "Recommend some instrumental music.",
    "I'm in the mood for some sad songs.",
    "Suggest some classical music.",
    "What's popular in Burmese music charts?",
    "Give me some chill lo-fi recommendations."
];




// Get all close buttons
document.querySelectorAll('.overlayBox .close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.overlayBox').parentElement.style.display = 'none';
  });
});

// Close when clicking outside the overlayBox
window.addEventListener('click', (e) => {
  // If click target is overlayHistory itself (outside box)
  if (e.target === overlayHistory) {
    overlayHistory.style.display = 'none';
  }
  // If click target is overlayGuide itself (outside box)
  if (e.target === overlayGuide) {
    overlayGuide.style.display = 'none';
  }
});

// Example: open overlays (you can hook these to icons/buttons)
document.getElementById('commentIcon').onclick = () => {
  overlayHistory.style.display = 'flex';
};
document.getElementById('userGuide').onclick = () => {
  overlayGuide.style.display = 'flex';
};


// Function to display random quick suggestions
function displayRandomSuggestions() {
    const shuffled = [...quickSuggestions].sort(() => 0.5 - Math.random());
    const selectedSuggestions = shuffled.slice(0, 4);

    suggestBtns.forEach((btn, index) => {
        if (selectedSuggestions[index]) {
            btn.textContent = selectedSuggestions[index];
            btn.style.display = 'block'; 
        } else {
            btn.style.display = 'none'; 
        }
    });
    
    if (chatMessages.children.length <= 1) {  
        quickSuggestionsContainer.style.display = 'grid';
    } else {
        quickSuggestionsContainer.style.display = 'none';
    }
}

// Function to handle clicking a suggestion box
function sendSuggestedMessage(element) {
    userInput.value = element.textContent;
    sendMessage();
}

// INITIALIZATION
if(!chatMessages.hasChildNodes()){
    displayRandomSuggestions(); 
    addMessage("", "Hi! Tell me your mood,favorite songs or try one of these suggesitions and I’ll recommend music!", 'bot-message');
}

// Core functions
async function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;
    
    quickSuggestionsContainer.style.display = 'none';

    // Chat window: no prefix
    addMessage("", message, 'user-message');

    // History: keep prefix
    saveHistory(`You: ${message}`);

    userInput.value = "";

    const loadingId = addMessage("", "Thinking", 'bot-message');
    const dotsInterval = startThinkingAnimation(loadingId);

    try{
        const systemMessage = `You are a music recommendation chatbot named Twenty35.
Always respond in the same language as the user input (English / Japanese / Burmese).
Recommend 3–5 songs based on the user's mood, feelings, or favorite artists.
For each recommendation, ALWAYS include:
1. Song title
2. Artist name
3. Spotify search link
4. Apple Music search link
5. YouTube search link
Give sweet messages for users, depend on user's mood.
IMPORTANT: Format ALL links using standard Markdown syntax: [Link Name](URL). Example: [Spotify Link](http://spotify.com/search?q=song) and include a newline after each song/link grouping.`;

        const response = await fetch("/.netlify/functions/openai-proxy", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: message }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content; 
        
        clearInterval(dotsInterval);

        // Chat window: no prefix
        updateMessage(loadingId, botMessage);

        // History: keep prefix
        saveHistory(`${BOT_NAME}: ${botMessage}`);

    }catch(err){
        console.error("Fetch error:", err);
        clearInterval(dotsInterval);
        updateMessage(loadingId, "Oops! Something went wrong. The AI service may be unavailable.");
    }
}

// --- MODIFIED FUNCTION ---
function addMessage(sender, text, className){
    let htmlText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    const lines = htmlText.split(/\n|(?=\d+\.)/);
    const formattedText = lines
        .map(l => l.trim())
        .filter(l => l)
        .map(l => `<p>${l}</p>`)
        .join("");

    const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`; 
    
    const messageDiv = document.createElement('div');
    messageDiv.id = id;
    messageDiv.classList.add(className); 
    
    // Chat window: no sender prefix
    messageDiv.innerHTML = formattedText;  
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

// --- MODIFIED FUNCTION ---
function updateMessage(id, text){
    const msgDiv = document.getElementById(id);
    if(!msgDiv) return;
    
    let htmlText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    const lines = htmlText.split(/\n|(?=\d+\.)/);
    const formattedText = lines
        .map(l => l.trim())
        .filter(l => l)
        .map(l => `<p>${l}</p>`)
        .join("");

    // Chat window: no bot prefix
    msgDiv.innerHTML = formattedText;  
}

function startThinkingAnimation(id){
    let dots = 0;
    return setInterval(()=>{
        const msg = document.getElementById(id);
        if(!msg) return;
        dots = (dots+1)%4;
        msg.innerHTML = `Thinking${'.'.repeat(dots)}`; 
    },500);
}

function saveHistory(msg){
    let htmlText = msg.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    const lines = htmlText.split(/\n|(?=\d+\.)/);
    const formattedText = lines
        .map(l => l.trim())
        .filter(l => l)
        .map(l => `<p>${l}</p>`)
        .join("");
    const div = document.createElement('div');
    div.innerHTML = formattedText;
    div.style.marginBottom = '8px';
    historyList.prepend(div);
}

sendBtn.onclick = sendMessage;
userInput.addEventListener('keypress', e=>{ 
    if(e.key==='Enter') sendMessage(); 
});
