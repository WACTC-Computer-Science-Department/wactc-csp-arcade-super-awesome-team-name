const TOWER_GRID = {
  // Grid organized by [row][column] = {x, y}
  positions: [
    null, // Row 0 (unused, added for indexing)
    {
      // Row 1
      1: { x: 230, y: 85 },
      2: { x: 300, y: 85 },
      3: { x: 370, y: 85 },
      4: { x: 445, y: 85 },
      5: { x: 515, y: 85 },
      6: { x: 585, y: 85 },
      7: { x: 665, y: 85 }
    },
    {
      // Row 2
      1: { x: 225, y: 155 },
      2: { x: 300, y: 155 },
      3: { x: 373, y: 155 },
      4: { x: 440, y: 155 },
      5: { x: 505, y: 155 },
      6: { x: 570, y: 155 },
      7: { x: 670, y: 155 }
    },
    {
      // Row 3
      1: { x: 220, y: 225 },
      2: { x: 300, y: 225 },
      3: { x: 370, y: 225 },
      4: { x: 435, y: 225 },
      5: { x: 505, y: 225 },
      6: { x: 575, y: 225 },
      7: { x: 670, y: 225 }
    },
    {
      // Row 4
      1: { x: 220, y: 295 },
      2: { x: 300, y: 295 },
      3: { x: 370, y: 295 },
      4: { x: 435, y: 295 },
      5: { x: 505, y: 295 },
      6: { x: 575, y: 295 },
      7: { x: 670, y: 295 }
    },
    {
      // Row 5
      1: { x: 220, y: 368 },
      2: { x: 300, y: 371 },
      3: { x: 370, y: 369 },
      4: { x: 435, y: 368 },
      5: { x: 505, y: 368 },
      6: { x: 575, y: 371 },
      7: { x: 670, y: 369 }
    }
  ],

  getPosition(row, column) {
    if (!this.positions[row] || !this.positions[row][column]) {
      return null;
    }
    return this.positions[row][column];
  },

 
  getRow(row) {
    if (!this.positions[row]) return [];
    return Object.values(this.positions[row]);
  },

 
  getColumn(column) {
    let columnPositions = [];
    for (let row = 1; row < this.positions.length; row++) {
      if (this.positions[row] && this.positions[row][column]) {
        columnPositions.push(this.positions[row][column]);
      }
    }
    return columnPositions;
  },

  
  getAllPositions() {
    let allPositions = [];
    for (let row = 1; row < this.positions.length; row++) {
      if (this.positions[row]) {
        allPositions = allPositions.concat(Object.values(this.positions[row]));
      }
    }
    return allPositions;
  },

  
  findNearestPosition(x, y, tolerance = 20) {
    let nearest = null;
    let minDistance = tolerance;

    for (let row = 1; row < this.positions.length; row++) {
      if (!this.positions[row]) continue;
      for (let col = 1; col <= 7; col++) {
        if (!this.positions[row][col]) continue;
        let pos = this.positions[row][col];
        let d = dist(x, y, pos.x, pos.y);
        if (d < minDistance) {
          minDistance = d;
          nearest = pos;
        }
      }
    }
    return nearest;
  },

 
  getStats() {
    return {
      totalPositions: this.getAllPositions().length,
      rows: [1, 2, 3, 4, 5],
      columnsPerRow: 7,
      description: 'Tower defense grid with 5 rows and 7 columns per row'
    };
  }
};
