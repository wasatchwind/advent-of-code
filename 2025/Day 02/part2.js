'use strict';
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 2 Part 2 answer: 44143124633

  // Parse input into usable data
  const idRanges = puzzleInput
    .trim()
    .split(',')
    .map(line => {
      const [start, end] = line.split('-').map(Number);
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

    // Loop through all possible evenly divisible segments and count the value if they all match
    for (let segment = length - 1; segment >= 1; segment--) {
      if (length % segment === 0) {
        const options = [];
        for (let i = 0; i < length; i += segment) {
          options.push(string.slice(i, i + segment));
        }
        if (options.every(value => value === options[0])) return Number(string)
      }
    }
  }

  document.getElementById("answer").innerText = sum;
  console.log("The sum of all invalid IDs is", sum);
});
