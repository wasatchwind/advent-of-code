"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 2 Part 1 answer: 23560874270

  // Parse input into usable data
  const idRanges = puzzleInput
    .trim()
    .split(",")
    .map(line => {
      const [start, end] = line.split("-").map(Number);
      return { start, end };
    });

  let sum = 0;

  for (const { start, end } of idRanges) {
    for (let i = start; i <= end; i++) {
      if (checkValidity(i)) sum += i;
    }
  }

  function checkValidity(num) {
    const string = String(num); // Convert to string to compare digits
    const length = string.length;
    if (length % 2 !== 0) return false; // Only an even number of digits can be invalid
    const half = length / 2;
    return string.slice(0, half) === string.slice(half); // Count it if it's invalid
  }

  document.getElementById("answer").innerText = sum;
  console.log("The sum of all invalid IDs is", sum);
});
