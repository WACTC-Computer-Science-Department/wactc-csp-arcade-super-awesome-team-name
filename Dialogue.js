//make your dialogue here ok
class DialogueNode:
    def __init__(self, text, choices=None):
        self.text = text
        self.choices = choices or []  # list of (choice_text, next_node)

    def display(self):
        print("\n" + self.text)
        for i, (choice_text, _) in enumerate(self.choices):
            print(f"{i + 1}. {choice_text}")

    def choose(self, index):
        if 0 <= index < len(self.choices):
            return self.choices[index][1]
        else:
            print("Invalid choice.")
            return self


# Build dialogue tree
end_node = DialogueNode("The stranger walks away. Conversation over.")

node2 = DialogueNode(
    "Stranger: Not many people come here. What do you want?",
    [
        ("Just passing by.", end_node),
        ("Looking for trouble.", end_node),
    ]
)

start_node = DialogueNode(
    "You see a mysterious stranger.",
    [
        ("Approach them.", node2),
        ("Ignore them.", end_node),
    ]
)


# Run dialogue
current_node = start_node

while current_node:
    current_node.display()
    if not current_node.choices:
        break

    choice = int(input("Choose: ")) - 1
    current_node = current_node.choose(choice)


