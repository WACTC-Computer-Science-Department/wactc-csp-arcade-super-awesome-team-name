// Simple dialogue system in JavaScript
class DialogueNode {
  constructor(text, choices = []) {
    this.text = text;
    this.choices = choices; // array of { text, next }
  }

  display() {
    console.log(`\n${this.text}`);
    this.choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice.text}`);
    });
  }

  choose(index) {
    if (index >= 0 && index < this.choices.length) {
      return this.choices[index].next;
    }

    console.warn('Invalid choice.');
    return this;
  }
}

const endNode = new DialogueNode('The stranger walks away. Conversation over.');
const node2 = new DialogueNode('Stranger: Not many people come here. What do you want?', [
  { text: 'Just passing by.', next: endNode },
  { text: 'Looking for trouble.', next: endNode },
]);
const startNode = new DialogueNode('You see a mysterious stranger.', [
  { text: 'Approach them.', next: node2 },
  { text: 'Ignore them.', next: endNode },
]);

function runDialogue(rootNode) {
  let currentNode = rootNode;

  while (currentNode) {
    currentNode.display();

    if (!currentNode.choices.length) {
      break;
    }

    const choiceInput = window.prompt('Choose a dialogue option (1-' + currentNode.choices.length + '):');
    const choiceIndex = Number(choiceInput) - 1;

    if (Number.isNaN(choiceIndex)) {
      alert('Please enter a valid number.');
      continue;
    }

    currentNode = currentNode.choose(choiceIndex);
  }
}

// Example invocation (uncomment to run in a browser environment):
// runDialogue(startNode);


