'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 16 Part 1 answer: 213

  // Process input text line by line into an array of arrays
  const sueIdentifiers = puzzleInput.split('\n').map(line => line.trim()).map(line => line.split(' '))

  // Incremented immediately in the while loop so that the output isn't incremented after match found
  let sueNumber = -1

  let sueFound = false
  const tickerTape = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
  }

  // Loop until match found
  while (!sueFound) {
    sueNumber++
    sueFound = isMatch(sueIdentifiers[sueNumber])
  }

  // Function to check for ticker tape matches among the list of Sues
  function isMatch(sueIdentifier) {

    // With each line split into an array, only every other array element needs comparison
    for (let i = 2; i < sueIdentifier.length; i += 2) {
      const key = sueIdentifier[i].slice(0, -1) // Slice to remove the ':' character
      const value = parseInt(sueIdentifier[i + 1]) // parseInt instead of Number to remove comma
      
      // If match found, keep looking for more to find maximum match criteria
      if (tickerTape.hasOwnProperty(key) && tickerTape[`${key}`] === value) continue
      
      // No matches return false
      else return false
    }
    // If loop completes, all possible matching criteria found
    return true
  }

  document.getElementById('answer').innerText = parseInt(sueIdentifiers[sueNumber][1])
  console.log('The number of the gift giving Sue is', parseInt(sueIdentifiers[sueNumber][1]))
})
