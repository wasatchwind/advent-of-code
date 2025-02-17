'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 2 Part 2 answer: 3842356
  
  // Split text into individual lines, each line the length, width, and height of a present
  const presentDimensions = puzzleInput.split('\n').map(item => item.trim())
  let totalsqft = 0

  // Loop through each present
  for (const currentDimension of presentDimensions) {

    // Use regular expression to extract length, width, and height and convert string to number
    const [L, W, H] = currentDimension.match(/\d{1,2}/g).map(Number)

    // Order dimensions smallest to largest via sort() but omit the largest
    const [smallest, secondSmallest] = [L, W, H].sort((a, b) => a - b)

    const ribbon = 2 * (smallest + secondSmallest)
    const bow = L * W * H

    totalsqft += ribbon + bow
  }
  console.log('Total feet of ribbon needed:', totalsqft)
  document.getElementById('answer').innerText = totalsqft
})
