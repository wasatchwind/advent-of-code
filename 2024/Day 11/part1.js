'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 11 Part 1 answer: 186424
  
  const stones = puzzleInput.match(/\d+/g).map(Number)
  const blinks = 25

  for (let blink = 0; blink < blinks; blink++) {
    let index = 0
    while (true) {
      if (index > stones.length - 1) break // End of current blink

      if (stones[index] === 0) stones[index] = 1 // Rule 1: replace any stone with "0" as a "1"
      
      // Rule 2: if stone is even, split into 2 halves
      else if (stones[index].toString().length % 2 === 0) {
        const evenStoneToSplit = stones[index].toString() // Change to string for splitting
        const middleIndex = Math.floor(evenStoneToSplit.length / 2)
        const left = Number(evenStoneToSplit.substring(0, middleIndex))
        const right = Number(evenStoneToSplit.substring(middleIndex))
        stones[index] = left
        stones.splice(index + 1, 0, right) // Add in newly created right side of split stone
        index++ // Need to increment index here because the length of stones just increased
      }

      // Rule 3: multiply stone by 2024
      else stones[index] *= 2024
      
      index++ // Continue on the the next stone
    }
  }  

  document.getElementById('answer').innerText = stones.length
  console.log('The count of stones after blinking 25 times is', stones.length)
})
