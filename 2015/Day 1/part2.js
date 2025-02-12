'use strict'
const file = document.getElementById('input')

file.addEventListener('change', (event) => {
  const fileText = event.target.files[0]
  const reader = new FileReader()
  reader.readAsText(fileText)
  reader.onload = (load) => {
    const puzzleInput = load.target.result

    // -----------------------------------------------------------------------------------------
    // Day 1 Part 2: 1771 (https://adventofcode.com/2015/day/1)
    let floor = 0
    
    for (let charIndex = 0; charIndex < puzzleInput.length; charIndex++) {
      floor = puzzleInput[charIndex] === '(' ? floor += 1 : floor -= 1
      
      if (floor === -1) {
        console.log('The character position that causes Santa to enter the basement is', charIndex + 1)
        break
      }
    }
    // -----------------------------------------------------------------------------------------
  }
})
