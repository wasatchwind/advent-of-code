'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 2 Part 1 answer: 1606483
  
  // Split text into individual lines, each line the length, width, and height of a present
  const presentDimensions = puzzleInput.split('\n').map(line => line.trim())
  let totalsqft = 0

  // Loop through each present
  for (const currentDimension of presentDimensions) {

    // Use regular expression to extract length, width, and height and convert string to number
    const [L, W, H] = currentDimension.match(/\d{1,2}/g).map(Number)

    const extraLength = Math.min(L * W, W * H, H * L)
    const surfaceArea = 2 * (L * W + W * H + H * L)

    totalsqft += surfaceArea + extraLength
  }
  
  document.getElementById('answer').innerText = totalsqft
  console.log('Total feet of ribbon needed:', totalsqft)
})
