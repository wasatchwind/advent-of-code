'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 4 Part 1 answer: 2560

  // Split puzzle input text into an array of strings for each line (grid)
  const grid = puzzleInput.split('\n').map(line => line.trim())
  let total = 0

  scanHorizontal(grid)
  scanVertical(grid)
  scanDiagPositiveSlope(grid)
  scanDiagNegativeSlope(grid)

  // Each function below scans the 2D grid for a matching forward or reverse XMAS string
  // in all possible configurations, and counts toward a total if found. While there is some
  // redundancy across each function, the code is easy to read this way.
  function scanHorizontal(lines) {
    for (const row of lines) {
      for (let i = 0; i < row.length - 3; i++) {
        const range = row.slice(i, i + 4)
        if (range === 'XMAS' || range === 'SAMX') total++
      }
    }
  }

  function scanVertical(lines) {
    for (let row = 0; row < lines[0].length; row++) {
      for (let col = 0; col < lines.length - 3; col++) {
        const range = lines[col][row] + lines[col + 1][row] + lines[col + 2][row] + lines[col + 3][row]
        if (range === 'XMAS' || range === 'SAMX') total++
      }
    }
  }

  function scanDiagPositiveSlope(lines) {
    for (let row = 0; row < lines[0].length - 3; row++) {
      for (let col = 0; col < lines.length - 3; col++) {
        const range = lines[col + 3][row] + lines[col + 2][row + 1] + lines[col + 1][row + 2] + lines[col][row + 3]
        if (range === 'XMAS' || range === 'SAMX') total++
      }
    }
  }

  function scanDiagNegativeSlope(lines) {
    for (let row = 0; row < lines[0].length - 3; row++) {
      for (let col = 0; col < lines.length - 3; col++) {
        const range = lines[col][row] + lines[col + 1][row + 1] + lines[col + 2][row + 2] + lines[col + 3][row + 3]
        if (range === 'XMAS' || range === 'SAMX') total++
      }
    }
  }

  document.getElementById('answer').innerText = total
  console.log('The count of times X-MAS appears is', total)
})
