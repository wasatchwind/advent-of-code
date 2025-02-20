'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 1 answer: 187833789

  // Use regular expression to extract all valid multiply instructions:
  // Must be format: mul({1-3 digit number},{1-3 digit number}) e.g. mul(123,4)
  const validInstructions = puzzleInput.match(/(?<=mul\()\d{1,3},\d{1,3}\)/g)

  // Map valid instructions into an array of arrays, each a pair of multiplier numbers
  const multipliers = validInstructions.map(item => item.match(/\d{1,3}/g).map(Number))

  let total = 0

  // Loop through each array of multipliers and add their product to the running total
  for (const multiply of multipliers) {
    total += multiply[0] * multiply[1]
  }

  document.getElementById('answer').innerText = total
  console.log('Adding up all of the multiplication results is', total)
})
