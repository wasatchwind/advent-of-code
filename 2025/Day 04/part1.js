"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 4 Part 1 answer: 1527

  // Parse input into usable data
  const grid = puzzleInput.split("\n").map(line => line.trim()).map(line => line.split(""));
  let totalAccessiblePositions = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  // r for rows, c for columns
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "@") continue; // Skip to next coordinates since this isn't a roll

      let countAdjacent = 0;

      for (const [dr, dc] of directions) { // Try all 8 directions. nr = new row etc.
        const nr = r + dr;
        const nc = c + dc;

        // Check bounds; only proceed if coordinates are legitimate. Count all adjacent rolls
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (grid[nr][nc] === "@") countAdjacent++;
        }
      }

      if (countAdjacent < 4) totalAccessiblePositions++; // Apply logic for roll accessibility
    }
  }

  document.getElementById("answer").innerText = totalAccessiblePositions;
  console.log("Rolls accessible by forklift:", totalAccessiblePositions);
});
