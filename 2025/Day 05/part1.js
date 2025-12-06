"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 5 Part 1 answer: 735

  // Split input input into 2 parts split by a blank line. The top part is the id ranges and the bottom part is the ids
  const [idRangeLines, idLines] = puzzleInput.trim().split(/\n\s*\n/);

  // Parse id ranges into an object (idRanges) with start and end numbers for the range
  const idRanges = idRangeLines.split("\n").map(line => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
  idRanges.sort((a, b) => a.start - b.start) // Sort id ranges small to large for efficiency

  // Parse ids into an array of numbers
  const ids = idLines.split("\n").map(line => line.trim()).map(Number);
  let freshIdCount = 0;

  // Loop through ids and check if a given id is within an idRange (>= start and <= end)
  for (const id of ids) {
    for (let i = 0; i < idRanges.length; i++) {
      if (id >= idRanges[i].start && id <= idRanges[i].end) {
        freshIdCount++;
        break;
      }
    }
  }

  document.getElementById("answer").innerText = freshIdCount;
  console.log("Count of fresh ingredient IDs:", freshIdCount);
});
