'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 19 Part 2 answer: 200

  // Split input text into individual lines
  const lines = puzzleInput.split('\n').map(line => line.trim())
  let molecule = lines.pop() // The last line is the molecule
  lines.pop() // Remove the (now last line) blank line
  const replacementsList = lines.map(line => line.split(' => ')) // Convert lines to arrays
  let steps = 0

  // Work backwards from full molecule to 'e' (instead of starting with 'e')
  // This eliminates many branches/iterations since it's a direct path in reverse
  while (molecule !== 'e') {

    // If replacement not possible, don't increment steps but try again with updated molecule
    for (const replacement of replacementsList) {
      if (makeReplacement(replacement)) break
    }
    steps++
  }

  // Function to make the replacement
  function makeReplacement(replacement) {
    const startingForm = replacement[0]
    const resultForm = replacement[1]
    const index = molecule.indexOf(resultForm)

    // If resultForm found in molecule, update molecule and return true; otherwise return false
    if (index >= 0) {
      molecule = molecule.slice(0, index) + startingForm + molecule.slice(index + resultForm.length)
      return true
    }
    return false
  }

  document.getElementById('answer').innerText = steps
  console.log('The fewest number of steps is', steps)
})
