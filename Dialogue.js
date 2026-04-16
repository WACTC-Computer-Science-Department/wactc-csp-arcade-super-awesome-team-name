// =======================
// Dialogue Data
// =======================
const dialogueLines = [
  "Hey there.",
  "This is a simple dialogue system.",
  "Click to move through the text.",
  "If you click while text is typing...",
  "It will instantly finish the line.",
  "And when it's over...",
  "The dialogue disappears."
];

// =======================
// Variables
// =======================
let currentLine = 0;
let currentChar = 0;
let isTyping = false;
let typingInterval = null;

const dialogueBox = document.getElementById("dialogueBox");
const dialogueText = document.getElementById("dialogueText");

// =======================
// Start Dialogue
// =======================
function startDialogue() {
  currentLine = 0;
  dialogueBox.classList.remove("hidden");
  typeLine();
}

// =======================
// Typewriter Effect
// =======================
function typeLine() {
  dialogueText.textContent = "";
  currentChar = 0;
  isTyping = true;

  const line = dialogueLines[currentLine];

  clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    dialogueText.textContent += line[currentChar];
    currentChar++;

    if (currentChar >= line.length) {
      clearInterval(typingInterval);
      isTyping = false;
    }
  }, 30);
}

// =======================
// Click Handling
// =======================
dialogueBox.addEventListener("click", () => {
  if (isTyping) {
    clearInterval(typingInterval);
    dialogueText.textContent = dialogueLines[currentLine];
    isTyping = false;
    return;
  }

  currentLine++;

  if (currentLine < dialogueLines.length) {
    typeLine();
  } else {
    endDialogue();
  }
});

// =======================
// End Dialogue
// =======================
function endDialogue() {
  dialogueBox.classList.add("hidden");
}

// =======================
// Start on load
// =======================
window.addEventListener("load", startDialogue);
