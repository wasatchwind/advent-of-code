'use strict'
const file = document.getElementById('input')

file.addEventListener('change', (event) => {
  const fileText = event.target.files[0]
  const reader = new FileReader()
  reader.readAsText(fileText)
  reader.onload = (load) => {
    const puzzleInput = load.target.result

    // -----------------------------------------------------------------------------------------
    // Day 1 Part 1: 138 (https://adventofcode.com/2015/day/1)
    let floor = 0
    
    for (const char of puzzleInput) {
      floor = char === '(' ? floor += 1 : floor -= 1
    }
    
    console.log(`Santa's target floor is:`, floor)
    // -----------------------------------------------------------------------------------------
  }
})
