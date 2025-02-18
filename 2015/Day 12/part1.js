'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 12 Part 1 answer: 191164

  const json = JSON.parse(puzzleInput)
  let total = 0
  traverseObject(json)

  // Recursive function to traverse all parts of the puzzle input
  function traverseObject(json) {
    for (const value of Object.values(json)) {
      if (typeof value === 'number') total += value

      // If value exists and is an object (includes arrays) continue recursion
      if (value && typeof value === 'object') traverseObject(value)
    }
  }

  document.getElementById('answer').innerText = total
  console.log('The sum of all the numbers is', total)
})
