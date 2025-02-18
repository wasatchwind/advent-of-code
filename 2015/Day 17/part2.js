'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 17 Part 2 answer: 4

  // Process input text line by line into a flat array of numbers
  const containers = puzzleInput.split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .map(Number)
    .sort((a, b) => b - a) // Starting with sorted large to small seems to speed things up

  const targetCapacity = 150
  const combinations = []
  const lengths = []
  let count = 0
  allCombos(0, targetCapacity, [])

  // Loop to generate an array of all valid combo lengths (number of containers)
  for (const combo of combinations) {
    lengths.push(combo.length)
  }

  // Minimum number of containers that can be used to exactly fill the target capacity
  const minContainers = Math.min(...lengths)

  // Loop to count the number of combos that use the minimum number of containers
  for (const combo of combinations) {
    if (combo.length === minContainers) count++
  }

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

  document.getElementById('answer').innerText = count
  console.log('The count of different ways to fill the minimum number of containers is', count)
})
