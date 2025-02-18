'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 11 Part 2 answer: vzcaabcc

  let password = puzzleInput
  password = 'vzbxxyzz' // Part 2
  let validPassword = false
  const alphabet = 'abcdefghjkmnpqrstuvwxyz' // Rule 2: password cannot have chars i, o, l
  const alphabetLength = alphabet.length // 23

  // Loop incrementing password until valid next password found
  while (!validPassword) {
    password = incrementPassword()
    validPassword = isValid()
  }

  // Function to increment password
  function incrementPassword() {
    const passwordArray = password.split('')
    let index = passwordArray.length - 1 // Like an odometer, start at last element
    
    // Loop right to left through password characters
    while (index >= 0) {
      const currentCharacter = passwordArray[index]

      // Modulus alphabetLength ensures the index resets after reaching 'z'
      const nextIndex = (alphabet.indexOf(currentCharacter) + 1) % alphabetLength
      
      passwordArray[index] = alphabet[nextIndex] // Update password
      if (nextIndex !== 0) break // Exit loop unless the loop completes (index is zero)
      index--
    }
    return passwordArray.join('')
  }

  // Function to test password validity true or false
  function isValid() {
    const uniquePairs = new Set()
    let straight = false // Rule 1: straight
    let twoPairs = false // Rule 3

    // Since a straight needs 3 sequential letters, loop until 2 from end of alphabet
    for (let i = 0; i < alphabetLength - 2; i++) {
      const straightStr = alphabet.slice(i, i + 3)
      if (password.includes(straightStr)) {
        straight = true
        break
      }
    }

    // Loop through password looking for pairs
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        uniquePairs.add(password[i])
        if (uniquePairs.size >= 2) {
          twoPairs = true
          break
        }
      }
    }

    if (straight && twoPairs) return true
    return false
  }

  document.getElementById('answer').innerText = password
  console.log('The next password is', password)
})
