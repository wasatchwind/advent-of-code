'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 7 Part 1 answer: 1708857123053

  // Split puzzle input text into rows mapped to arrays of numbers
  const equations = puzzleInput.split('\n').map(line => line.trim()).map(line => line.match(/\d+/g).map(Number))
  let testValue, total = 0

  // Loop through each line of formatted puzzle input (each equation)
  for (const equation of equations) {
    testValue = equation[0] // testValue is always the first element of the equation array
    equation.shift() // After assigning testValue, shift array to remove it (the first element)
    if (validateEquation(equation)) total += testValue
  }

  function validateEquation(equation) {
    const operators = ['+', '*']

    // Calculate all possible combos for iteration
    const totalPossibleCombos = Math.pow(operators.length, equation.length - 1)
    const combos = []

    // Loop through all possible combos
    for (let i = 0; i < totalPossibleCombos; i++) {

      // Use array instead of string for combo because of immutable strings (inefficient in JS)
      const combo = [equation[0]] // Start with the first digit
      let index = i // Used to extract operators
      
      // Loop through remaining digits (starting with the second one)
      for (let j = 0; j < equation.length - 1; j++) {
        const operator = operators[index % operators.length] // Ensures operators are chosen for the loop
        combo.push(operator, equation[j + 1])
        index = Math.floor(index / operators.length) // Ensures operators are chosen for the loop
      }
      combos.push(combo.join(''))
    }
    const matchFound = evaluate(combos)
    return matchFound

    // Helper function to evaluate (calculate) the equation
    function evaluate(combos) {
      for (const combo of combos) {
        const tokens = combo.split(/([+*])/)
        let calculationResult = Number(tokens[0])
        
        // Calculate equation using appropriate operator
        for (let index = 1; index < tokens.length; index += 2) {
          const nextNumber = Number(tokens[index + 1])
          if (tokens[index] === '+') calculationResult += nextNumber
          if (tokens[index] === '*') calculationResult *= nextNumber
        }

        // If the calculation equals the test value then the equation is correct
        if (calculationResult === testValue) return true
      }
    }
  }

  document.getElementById('answer').innerText = total
  console.log('The total calibration result is', total)
})
