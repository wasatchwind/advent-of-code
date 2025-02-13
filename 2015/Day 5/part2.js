'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 5 Part 2 answer: 69
  // Split text into individual lines, each line a string to evaluate as naughty or nice
  const strings = puzzleInput.split('\n')
  let niceStrings = 0

  // Loop through each string
  for (const string of strings) {

    // Check new part 2 rules with functions
    const rule1 = checkRule1(string)
    const rule2 = checkRule2(string)

    // If both rules are met, increment count of 'nice' strings
    if (rule1 && rule2) niceStrings++
  }
  console.log('Count of "nice" strings:', niceStrings)
  document.getElementById('answer').innerText = niceStrings

  // Function to evaluate each string for rule 1
  function checkRule1(string) {
    for (let i = 0; i < string.length - 1; i++) {

      // Check each sequential pair of characters
      const charPair = string.slice(i, i + 2)

      // Use regular expression (re) to count occurrences of a pair
      const re = new RegExp(String.raw`${charPair}`, 'g')
      const count = string.match(re)

      // If more than one occurrence return true; otherwise return false
      if (count.length > 1) return true
    }
    return false
  }

  // Function to evaluate each string for rule 2
  function checkRule2(string) {
    for (let i = 0; i < string.length - 1; i++) {

      // If rule 2 pattern is found return true; otherwise return false
      if (string[i] === string[i + 2]) return true
    }
    return false
  }
})
