'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 1 Part 1 answer: 138
  let floor = 0

  // Loop through each character of the input string
  for (const char of puzzleInput) {

    // Only 2 options: '(' to go up one floor or ')' to go down one floor
    floor = char === '(' ? floor += 1 : floor -= 1
  }

  console.log(`Santa's target floor is:`, floor)
  document.getElementById('answer').innerText = floor
})
