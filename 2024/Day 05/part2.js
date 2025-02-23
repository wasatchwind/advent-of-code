'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 5 Part 2 answer: 6085

  // Split puzzleInput into an array of two elements, using one or more blank lines as the delimiter.
  // The first element contains Page Ordering Rules, and the second contains Updated Page Numbers.
  const splitPuzzleInput = puzzleInput.split(/\n\s*\n/)
  const pageOrderingRules = splitPuzzleInput[0]

  // Parse splitPuzzleInput[1] into an array of number arrays by splitting on newlines and then commas.
  const updatedPageNumbers = splitPuzzleInput[1].split('\n').map(line => line.split(',').map(Number))
  
  let sum = 0
  let modified = false
  
  // Loop through each update/line of the Updated Page Numbers
  for (const update of updatedPageNumbers) {

    // Loop through each page in the update and check whether its order with the next page
    // follows the Page Ordering Rules.
    for (let index = 0; index < update.length; index++) {

      // If page ordering is not valid the loop breaks
      if (!checkUpdatedPageNumbers(index, update)) break
    }

    // If during checkUpdatedPageNumbers() needToModify is marked true and the function returns true,
    // then set needToModifyUpdate to false for the next loop and add middleIndex to sum.
    if (modified) {
      modified = false
      let middleIndex = Math.floor(update.length / 2)
      sum += update[middleIndex]
    }
  }

  // If a page sequence is invalid, attempt to fix it by moving the problematic page forward by one
  // position and mark "modified" as true so that the middle index can be counted later.
  function checkUpdatedPageNumbers(index, update) {
    for (let i = 1; i < update.length - index; i++) {
      let currentPageSequence = update[index] + '|' + update[i + index]
      if (!pageOrderingRules.includes(currentPageSequence)) {
        // Part 2:
        // If page sequence is not valid, try to make it valid by modifying the sequence order
        // by moving an invalid page/element one index at a time, and set modified to true so
        // the middle index can be counted after function completes.
        modified = true
        const movePagePosition = update.splice(update.indexOf(update[index]), 1)[0]
        update.splice(update.indexOf(update[index]) + 1, 0, movePagePosition)

        // Recursion
        for (let newIndex = 0; newIndex < update.length; newIndex++) {
          if (!checkUpdatedPageNumbers(newIndex, update)) return false
        }
      }
      return true
    }
  }

  document.getElementById('answer').innerText = sum
  console.log('Adding up the middle page number for correctly ordered updates is', sum)
})
