'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 17 Part 1 answer: 4372

  // Process input text line by line into a flat array of numbers
  const containers = puzzleInput.split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .map(Number)

  const targetCapacity = 150
  const combinations = []
  allCombos(0, targetCapacity, [])

  // Recursive function to generate all valid combinations of containers
  function allCombos(index, targetCapacity, currentCombo) {

    // If target capacity is reached
    if (targetCapacity === 0) {
      combinations.push(currentCombo)
      return
    }

    // Recursion
    for (let i = index; i < containers.length; i++) {
      allCombos(i + 1, targetCapacity - containers[i], [...currentCombo, containers[i]])
    }
  }

  document.getElementById('answer').innerText = combinations.length
  console.log('The total number of different combinations of containers is', combinations.length)
})
