'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 8 Part 2 answer: 2117

  // Split text into individual lines, each line a string to be evaluated
  const strings = puzzleInput.split('\n').map(line => line.trim())
  let originalLength = 0
  let encodedLength = 0

  for (const string of strings) {
    originalLength += string.length

    // Slice string to remove beginning and ending quote characters
    encodedLength += calculateEncodedLength(string.slice(1, -1))
  }

  // Function to calculate encoded string length
  function calculateEncodedLength(string) {
    let result = '"' + '\\' + '"' // Replace the removed starting quote with appropriate escape

    // Continue loop until all characters accounted for
    while (string !== '') {
      const character = string[0] // The first character of the current string
      string = string.slice(1) // Remove the first character of the current string
      result += character
      if (character !== '\\') continue // If no escape, continue loop to keep adding characters
      
      // Escape encountered
      result += '\\' // Add escape characters ('\\')
      if (string.startsWith('"')) result += '\\' // Handle adding a quote character (")
    }

    // After completed while loop:
    result += '\\""' // Replace the removed ending quote with appropriate escape
    return result.length
  }

  document.getElementById('answer').innerText = encodedLength - originalLength
  console.log('The total number of characters is', encodedLength - originalLength)
})
