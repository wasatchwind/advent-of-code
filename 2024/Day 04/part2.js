'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 4 Part 2 answer: 1910

  // Split puzzle input text into an array of strings for each line (grid)
  const grid = puzzleInput.split('\n').map(line => line.trim())
  let total = 0

  // Loop through entire grid looking for string matches, add to total if found
  for (let row = 0; row < grid[0].length - 2; row++) {
    for (let col = 0; col < grid.length - 2; col++) {
      const topString = grid[col][row] + grid[col][row + 2]
      const middleString = grid[col + 1][row + 1]
      const bottomString = grid[col + 2][row] + grid[col + 2][row + 2]
      
      if (topString === 'MS' && middleString === 'A' && bottomString === 'MS') total++
      if (topString === 'MM' && middleString === 'A' && bottomString === 'SS') total++
      if (topString === 'SM' && middleString === 'A' && bottomString === 'SM') total++
      if (topString === 'SS' && middleString === 'A' && bottomString === 'MM') total++
    }
  }

  document.getElementById('answer').innerText = total
  console.log('The count of times X-MAS appears is', total)
})
