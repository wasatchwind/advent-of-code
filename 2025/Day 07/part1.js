"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 7 Part 1 answer: 1562

  // Parse input into individual lines (rows)
  const grid = puzzleInput.split("\n").map(line => line.trim());

  const beamCols = new Set();            // Use a set to track unique beams since they can be combined/merged
  const startCol = grid[0].indexOf("S"); // The start column of the initial beam
  beamCols.add(startCol);

  let totalSplits = 0;

  // Loop through each row, ignoring the first row since that's where the beam starts
  for (let row = 1; row < grid.length; row++) {
    if (!grid[row].includes("^")) continue; // Immediately skip checking for splitters if the row doesn't have any

    const splitterCols = splitterIndexes(grid[row]); // Function called for each row with splitters to find their indexes

    // Loop through each index (col) of a splitter and if they are where a beam is, split the beam and remove the current column
    splitterCols.forEach(col => {
      if (beamCols.has(col)) {
        beamCols.delete(col);
        beamCols.add(col - 1);
        beamCols.add(col + 1);
        totalSplits++;
      }
    });
  }

  // Accepts one row at a time and returns an array of indexes for all splitters
  function splitterIndexes(row) {
    const indexes = [];
    let currentIndex = row.indexOf("^");

    while (currentIndex !== -1) {
      indexes.push(currentIndex);
      currentIndex = row.indexOf("^", currentIndex + 1);
    }

    return indexes;
  }

  document.getElementById("answer").innerText = totalSplits;
  console.log("Number of times the beam will be split:", totalSplits);
});
