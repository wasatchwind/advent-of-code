'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 8 Part 1 answer: 1371

  // Split text into individual lines, each line a string to be evaluated
  const strings = puzzleInput.split('\n').map(line => line.trim())
  let originalLength = 0
  let inMemoryLength = 0

  for (const string of strings) {
    originalLength += string.length

    // Slice string to remove beginning and ending quote characters
    inMemoryLength += calculateMemoryLength(string.slice(1, -1))
  }

  console.log('The total number of characters is', originalLength - inMemoryLength)
  document.getElementById('answer').innerText = originalLength - inMemoryLength

  // Function to calculate string length in memory
  function calculateMemoryLength(coreString) {
    let memoryLength = 0
    for (let i = 0; i < coreString.length; i++) {

      // Check for escape pattern
      if (coreString[i] === '\\') {

        // Check for hexadecimal notation escape
        if (coreString[i + 1] === 'x') i += 3 // Skip ahead for \xNN pattern
        else i++ // Skip index ahead +1 for \ or \\
      }
      memoryLength++
    }
    return memoryLength
  }
})
