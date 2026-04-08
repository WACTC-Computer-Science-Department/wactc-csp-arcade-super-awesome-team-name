const TOWER_GRID = {
  // Grid organized by [row][column] = {x, y}
  positions: [
    null, // Row 0 (unused, added for indexing)
    {
      // Row 1
      1: { x: 200, y: 60 },
      2: { x: 270, y: 63 },
      3: { x: 340, y: 61 },
      4: { x: 415, y: 62 },
      5: { x: 485, y: 60 },
      6: { x: 555, y: 61 },
      7: { x: 635, y: 64 }
    },
    {
      // Row 2
      1: { x: 195, y: 130 },
      2: { x: 270, y: 133 },
      3: { x: 343, y: 131 },
      4: { x: 420, y: 136 },
      5: { x: 490, y: 134 },
      6: { x: 555, y: 137 },
      7: { x: 640, y: 135 }
    },
    {
      // Row 3
      1: { x: 190, y: 203 },
      2: { x: 270, y: 206 },
      3: { x: 340, y: 203 },
      4: { x: 420, y: 204 },
      5: { x: 490, y: 203 },
      6: { x: 560, y: 206 },
      7: { x: 640, y: 204 }
    },
    {
      // Row 4
      1: { x: 190, y: 273 },
      2: { x: 270, y: 276 },
      3: { x: 340, y: 273 },
      4: { x: 420, y: 274 },
      5: { x: 490, y: 273 },
      6: { x: 560, y: 276 },
      7: { x: 640, y: 274 }
    },
    {
      // Row 5
      1: { x: 190, y: 343 },
      2: { x: 270, y: 346 },
      3: { x: 340, y: 344 },
      4: { x: 420, y: 343 },
      5: { x: 490, y: 343 },
      6: { x: 560, y: 346 },
      7: { x: 640, y: 344 }
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
