'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 2 answer: 94455185

  // Part 2: remove instructions following "don't" and until "do"
  // Split input text by "don't" string
  const identifyNonexecutables = puzzleInput.split(`don't`)

  // Construct a new instructions string by concatenating only valid sections
  // Start with the first valid section [0]
  let parsedInstructions = identifyNonexecutables[0]

  // Loop to construct a new string validated by beginning with "do"
  for (let i = 1; i < identifyNonexecutables.length; i++) {
    let index = identifyNonexecutables[i].indexOf('do()')
    if (index > 0) { // Next index that has a "do" instruction
      identifyNonexecutables[i] = identifyNonexecutables[i].substring(index)
      parsedInstructions += identifyNonexecutables[i]
    }
  }

  // Use regular expression to extract all valid multiply instructions:
  // Must be format: mul({1-3 digit number},{1-3 digit number}) e.g. mul(123,4)
  const validInstructions = parsedInstructions.match(/(?<=mul\()\d{1,3},\d{1,3}\)/g)

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
