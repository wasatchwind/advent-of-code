'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 19 Part 1 answer: 518

  // Split input text into individual lines
  const lines = puzzleInput.split('\n').map(line => line.trim())
  const molecule = lines.pop() // The last line is the molecule
  lines.pop() // Remove the (now last line) blank line
  const replacementsList = lines.map(line => line.split(' => ')) // Convert lines to arrays
  const replacements = {}
  const uniqueMolecules = new Set()
  let index = 0

  // Loop through replacements list to construct the replacements object
  // The replacements object maps all possible options that stem from one replacement source
  for (const replacement of replacementsList) {
    replacements[replacement[0]] = replacements[replacement[0]] || []
    replacements[replacement[0]].push(replacement[1])
  }

  // Iterate left to right through molecule keeping track of the index of the next replacement
  while (index <= molecule.length) {
    index = findNextMatch(index)
    index++
  }

  // Function to find the next possible replacement match and update index accordingly
  function findNextMatch(index) {
    let left = index
    let right = index

    // Loop until match found or end of molecule reached
    // Iterate inner (right) and outer (left) index loops to find string matches of varying lengths
    while (left < molecule.length) {
      right = left // Start with single character
      
      // Inner loop expands to right with current left as anchor
      while (right <= molecule.length) {
        const stringToCheck = molecule.slice(left, right)

        // Check if the current string slice is in replacements object
        // If so, modify the molecule; if not, continue looping
        if (Object.keys(replacements).includes(stringToCheck)) {
          modifyMolecule(left, right - left, stringToCheck)
          return left
        }
        right++
      }
      left++
    }

    // Helper function to modify the molecule when a match is found
    function modifyMolecule(index, removeCount, replacement) {
      for (const value of Object.values(replacements[replacement])) {
        let tempMolecule = molecule.split('')
        tempMolecule.splice(index, removeCount, value)
        tempMolecule = tempMolecule.join('')
        uniqueMolecules.add(tempMolecule)
      }
    }
  }

  document.getElementById('answer').innerText = uniqueMolecules.size
  console.log('The count of distinct molecules that can be created is', uniqueMolecules.size)
})
