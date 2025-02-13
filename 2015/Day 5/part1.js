'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 5 Part 1 answer: 238
  // Split text into individual lines, each line a string to evaluate as naughty or nice
  const strings = puzzleInput.split('\n')
  let niceStrings = 0

  // Loop through each string
  for (const string of strings) {

    // Use a regular expression to identify vowels
    let vowels = string.match(/[aeiou]/g)

    // If there are vowels and at least 3, set to true; otherwise false
    vowels = vowels && vowels.length > 2 ? true : false

    // Use a regular expression to identify if there are letters that appear twice in a row (true or false)
    const doubleLetters = /([a-z])\1/.test(string)

    // Use a regular expression to omit specific pairs of letters (true or false)
    const omitPairs = /[a][b]|[c][d]|[p][q]|[x][y]/.test(string)

    // If all rules are met, increment count of 'nice' strings
    if (vowels && doubleLetters && !omitPairs) niceStrings++
  }
  console.log('Count of "nice" strings:', niceStrings)
  document.getElementById('answer').innerText = niceStrings
})
