'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 1 Part 2 answer: 1771
  let floor = 0, index = 0

  // Loop through each character of the input string by index
  for (let charIndex = 0; charIndex < puzzleInput.length; charIndex++) {
    
    // Only 2 options: '(' to go up one floor or ')' to go down one floor
    floor = puzzleInput[charIndex] === '(' ? floor += 1 : floor -= 1

    // When floor is -1 Santa has gone into the basement
    if (floor === -1) {
      index = charIndex
      break
    }
  }

  document.getElementById('answer').innerText = index + 1
  console.log('The character position that causes Santa to enter the basement is', index + 1)
})
