'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 10 Part 2 answer: 5103798
  let sequence = puzzleInput
  const steps = 50

  for (let i = 0; i < steps; i++) {
    sequence = processStr(sequence)
  }

  function processStr(sequence) {
    let newSequence = ''

    // Loop until sequence length is zero
    while (sequence.length > 0) {
      let count = 1

      // Nested while loop to increment count
      // Loop until the sequence first element equals the sequence at the count index
      while (sequence[0] === sequence[count]) count++
      
      newSequence += count + sequence[0] // Update the sequence
      sequence = sequence.slice(count) // Remove updated portion of sequence
    }
    return newSequence
  }

  document.getElementById('answer').innerText = sequence.length
  console.log('The length of the result after 50 steps is', sequence.length)
})
