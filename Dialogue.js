// =======================
// Dialogue System (Game-Friendly)
// =======================

   class Dialogue {
  constructor(lines = []) {
    this.lines = lines;
    this.currentLine = 0;
    this.currentChar = 0;
    this.isTyping = false;
    this.finished = false;

    this.displayText = "";
    this.typingSpeed = 30;
    this.timer = 0;
  }

  start(lines) {
    this.lines = lines;
    this.currentLine = 0;
    this.currentChar = 0;
    this.finished = false;
    this.displayText = "";
    this.isTyping = true;
  }

  update(deltaTime) {
    if (this.finished) return;

    this.timer += deltaTime;

    if (this.isTyping && this.timer >= this.typingSpeed) {
      this.timer = 0;

      const line = this.lines[this.currentLine];
      this.displayText += line[this.currentChar];
      this.currentChar++;

      if (this.currentChar >= line.length) {
        this.isTyping = false;
      }
    }
  }

  next() {
    if (this.finished) return;

    if (this.isTyping) {
      // Skip typing
      this.displayText = this.lines[this.currentLine];
      this.isTyping = false;
      return;
    }

    this.currentLine++;

    if (this.currentLine >= this.lines.length) {
      this.finished = true;
      return;
    }

    this.displayText = "";
    this.currentChar = 0;
    this.isTyping = true;
  }

  draw(ctx) {
    if (this.finished) return;

    // Draw box
    ctx.fillStyle = "black";
    ctx.fillRect(50, 400, 700, 100);

    ctx.strokeStyle = "white";
    ctx.strokeRect(50, 400, 700, 100);

    // Draw text
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(this.displayText, 60, 440);
  }
}
