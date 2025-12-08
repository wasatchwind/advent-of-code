"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 7 Part 2 answer: 24292631346665

  // Parse input into individual lines (rows)
  const grid = puzzleInput.split("\n").map(line => line.trim());
  const startCol = grid[0].indexOf("S");

  let totalTimelines = 0; // Total number of unique timelines

  // Cannot use Set() here because each unique timeline may still share many parts of other timelines. Set() can't handle multiplicity
  // Map() tracks key/value: key = column index, value = number of timelines reaching a given column
  let active = new Map([[startCol, 1]]);

  for (let row = 1; row < grid.length; row++) {
    const line = grid[row];
    if (!line.includes("^")) continue; // Ignore rows without splitters

    const next = new Map(); // Track the number of timelines reaching each column in the next row

    // Loop through each column that has a timeline
    for (const [col, count] of active.entries()) {
      if (line[col] === "^") {
        // Branch left: move to column - 1, then add the number of timelines reaching the current column to the left column
        const leftCol = col - 1;
        next.set(leftCol, (next.get(leftCol) || 0) + count);

        // Branch right: Same as above for moving left but column + 1 and add number of timelines to right column
        const rightCol = col + 1;
        next.set(rightCol, (next.get(rightCol) || 0) + count);
      } else next.set(col, (next.get(col) || 0) + count); // No splitter, continue straight down
    }

    active = next; // Update active columns with the counts for the next row
  }

  for (const count of active.values()) totalTimelines += count;

  document.getElementById("answer").innerText = totalTimelines;
  console.log("Count of different timelines:", totalTimelines);
});
