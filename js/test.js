const messagesArea = document.getElementById("messagesArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const emptyState = document.getElementById("emptyState");

const suggestedPrompts = [
  "Explain quantum computing in simple terms",
  "Write a creative story about space exploration",
  "Help me debug my code",
  "Suggest healthy meal ideas for the week"
];

// Load suggestions
const suggestContainer = document.querySelector(".suggestions");
suggestedPrompts.forEach((text) => {
  const card = document.createElement("div");
  card.className = "suggestion-card";
  card.textContent = text;
  card.onclick = () => sendMessage(text);
  suggestContainer.appendChild(card);
});

function sendMessage(content) {
  if (!content.trim()) return;

  emptyState.style.display = "none";

  addMessage(content, "user");

  messageInput.value = "";

  // Fake AI typing delay
  setTimeout(() => {
    addMessage(
      "I'm a demo AI assistant. In a real application, I'd respond intelligently.",
      "assistant"
    );
  }, 1000);
}

function addMessage(text, role) {
  const div = document.createElement("div");
  div.className = "message " + role;
  div.textContent = text;
  messagesArea.appendChild(div);

  // Auto-scroll
  messagesArea.scrollTo({
    top: messagesArea.scrollHeight,
    behavior: "smooth"
  });
}

// Enter key send
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(messageInput.value);
  }
});

// Button send
sendBtn.addEventListener("click", () => {
  sendMessage(messageInput.value);
});
