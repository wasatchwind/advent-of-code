"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 5 Part 2 answer: 344306344403172

  // Split input input into 2 parts split by a blank line. The top part is the id ranges and the bottom part doesn't matter in part 2
  const inputLines = puzzleInput.trim().split(/\n\s*\n/);
  const idRangeLines = inputLines[0];

  // Parse id ranges into an object (idRanges) with start and end numbers for the range
  const idRanges = idRangeLines.split("\n").map(line => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  let totalFreshIngredientIds = 0;

  // Sort id ranges by start and create a shallow copy of idRanges (intervals) to avoid mutating input
  const intervals = idRanges.slice().sort((a, b) => a.start - b.start);

  // Array "merged" to keep track of merged intervals, start with the start (min) and end (max) of the lowest range (first in sorter order)
  const merged = [];
  let min = intervals[0].start;
  let max = intervals[0].end;

  // Loop starting with the second interval because min/max already set with the first/lowest interval
  for (let i = 1; i < intervals.length; i++) {
    const { start, end } = intervals[i];

    if (start <= max + 1) { // If overlap or touching/same value then extend the range
      max = Math.max(max, end);
    } else { // If no overlap then the entire current interval is valid, add to merged
      merged.push([min, max]);
      min = start; // Reset min to current start, same for max
      max = end;
    }
  }

  merged.push([min, max]); // Add last interval to merged


  for (const [start, end] of merged) {
    totalFreshIngredientIds += (end - start + 1);
  }

  document.getElementById("answer").innerText = totalFreshIngredientIds;
  console.log("Total count of fresh ingredient IDs:", totalFreshIngredientIds);
});
