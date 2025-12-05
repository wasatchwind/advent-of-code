"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 4 Part 2 answer: 8690

  // Parse input into usable data
  let grid = puzzleInput.split("\n").map(line => line.trim()).map(line => line.split(""));
  const updatedGrid = structuredClone(grid); // structuredClone() required to make a new/separate array without reference
  let totalRollsRemoved = 0, rollsRemoved = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  removeRolls(grid); // Recursive function to iterate each change of the grid as rolls are removed

  function removeRolls(grid) { // See part1.js comments for how most of this section works
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== "@") continue;

        let countAdjacent = 0;

        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr][nc] === "@") countAdjacent++;
          }
        }

        if (countAdjacent < 4) {
          rollsRemoved++;
          updatedGrid[r][c] = ".";
        }
      }
    }
    if (rollsRemoved === 0) return;      // Exit recursion when no more rolls can be removed
    totalRollsRemoved += rollsRemoved;   // Keep a sum of removed rolls each iteration
    rollsRemoved = 0;                    // Reset rolls removed for next iteration
    grid = structuredClone(updatedGrid); // structuredClone() required to make a new/separate array without reference
    removeRolls(grid);                   // Recursion call
  }

  document.getElementById("answer").innerText = totalRollsRemoved;
  console.log("Total rolls removable by forklift:", totalRollsRemoved);
});
