'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 1 answer: 2592
  
  // Declare x and y coordinates for a 2D grid
  let x = 0, y = 0

  // Use a Set to only count visited houses once
  const visited = new Set(['0,0'])

  // Loop through each character of the input string (up, down, left, right)
  for (const char of puzzleInput) {

    // Update x, y coordinates based on current instruction and add to the set
    if (char === '^') y++
    else if (char === '>') x++
    else if (char === 'v') y--
    else x--
    visited.add(`${x},${y}`)
  }
  
  document.getElementById('answer').innerText = visited.size
  console.log('Houses receiving at least one present:', visited.size)
})
