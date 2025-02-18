'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 12 Part 2 answer: 87842

  const json = JSON.parse(puzzleInput)
  let total = 0
  traverseObject(json)

  // Recursive function to traverse all parts of the puzzle input
  function traverseObject(json) {
    if (typeof json === 'number') total += json // If a number, add to total
    
    // If not a number and is array, continue recursion looping through each value
    else if (Array.isArray(json)) {
      for (const value of json) traverseObject(value)
    }

    // Ignore any object which has any property with the value 'red'; otherwise continue recursion
    else if (json && typeof json === 'object') {
      if (Object.values(json).includes('red')) return
      for (const key in json) traverseObject(json[key])
    }
  }

  document.getElementById('answer').innerText = total
  console.log('The sum of all the numbers is', total)
})
