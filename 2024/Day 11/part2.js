'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 11 Part 2 answer: 219838428124832

  const stones = puzzleInput.match(/\d+/g).map(Number)
  const blinks = 75
  let stoneCounts = {} // For Part, use an Object instead of Array and store counts instead of stones

  // Initialize stoneCounts with the initial input stones
  stones.forEach(stone => updateStones(stoneCounts, stone))

  // Loop for each blink
  for (let blink = 0; blink < blinks; blink++) {
    let newCounts = {} // Temporary object for updated stone counts

    // Loop through all the stones to evaluate based on the rules
    for (const [stone, count] of Object.entries(stoneCounts)) {
      const evenStoneToSplit = stone.toString() // Convert to string for splitting logic

      // Rule 1: 0 → 1
      if (stone === "0") updateStones(newCounts, 1, count)
      
      // Rule 2: Split even-length numbers
      else if (evenStoneToSplit.length % 2 === 0) {
        const middleIndex = Math.floor(evenStoneToSplit.length / 2)
        const left = Number(evenStoneToSplit.substring(0, middleIndex))
        const right = Number(evenStoneToSplit.substring(middleIndex))
        updateStones(newCounts, left, count)
        updateStones(newCounts, right, count)
      }
      
      // Rule 3: Multiply by 2024
      else {
        const newStone = Number(stone) * 2024
        updateStones(newCounts, newStone, count)
      }
    }

    stoneCounts = newCounts // Replace old stone counts with the new ones
  }

  // Add up total number of stones
  const totalStones = Object.values(stoneCounts).reduce((sum, count) => sum + count, 0)

  // Function to safely add stones to stoneCounts
  function updateStones(stones, stone, count = 1) {
    if (!stones[stone]) stones[stone] = 0
    stones[stone] += count
  }

  document.getElementById('answer').innerText = totalStones
  console.log('The count of stones after blinking 75 times is', totalStones)
})
