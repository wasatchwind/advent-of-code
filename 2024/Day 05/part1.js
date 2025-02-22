'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 5 Part 1 answer: 4924

  // Split puzzle input into a 2 element array by the blank line between them
  const splitPuzzleInput = puzzleInput.split(/\n\s*\n/)
  
  const pageOrderingRules = splitPuzzleInput[0]
  const updatedPageNumbers = splitPuzzleInput[1].split('\n').map(line => line.split(',').map(Number))
  let sum = 0

  // Loop through each update of all updated page numbers
  for (const update of updatedPageNumbers) {

    // Using .every() stops early when checkUpdatedPageNumbers() fails
    // Find the middle index and add it to sum
    if (update.every((_, index) => checkUpdatedPageNumbers(index, update))) {
      const middleIndex = Math.floor(update.length / 2)
      sum += Number(update[middleIndex])
    }
  }

  // Build each step (currentStep) and return false if not included in pageOrderingRules
  // If step is included, return true
  function checkUpdatedPageNumbers(index, update) {
    for (let i = 1; i < update.length - index; i++) {
      const currentStep = update[index] + '|' + update[i + index]
      if (!pageOrderingRules.includes(currentStep)) return false
    }
    return true
  }

  document.getElementById('answer').innerText = sum
  console.log('Adding up the middle page number for correctly ordered updates is', sum)
})
