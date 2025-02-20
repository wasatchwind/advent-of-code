'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 25 Part 1 answer: 2650453

  // Parse puzzle input into row and column numbers (assumed row & column are 4 digit numbers)
  const input = puzzleInput.match(/\d{4}/g).map(item => Number(item))
  const codeCoords = { 'row': input[0], 'col': input[1] }
  
  // The sequence order uses Cantor's diagonal arguement (triangular numbers), a formula can be used
  // to find the position (order number, not code itself) at row 1 and the target column (3083): 4753986
  const orderNumAtRow1TargetCol = (codeCoords.col * (codeCoords.col + 1)) / 2

  // The order number at the top of column 3083 enables moving down the column via formula to row 2978
  // to find the position (order number, not code itself) at target row, col (2978, 3083): 18361853
  const orderNumAtTarget = orderNumAtRow1TargetCol + (codeCoords.row - 1) * codeCoords.col + (codeCoords.row - 1) * (codeCoords.row - 2) / 2
  
  const firstCode = 20151125 // Given
  const multiplier = 252533 // Given
  const divisor = 33554393 // Given

  // Calculate the code at the coordinates using the position/order number
  const code = (firstCode * modularExponentiation(multiplier, orderNumAtTarget - 1, divisor)) % divisor

  // Function that uses modular exponentiation (exponentiation by squaring) for maximum efficiency
  function modularExponentiation(base, exponent, modulus) {
    let code = 1
    while (exponent > 0) {
      if (exponent % 2 === 1) code = (code * base) % modulus
      base = (base * base) % modulus
      exponent = Math.floor(exponent / 2)
    }
    return code
  }

  document.getElementById('answer').innerText = code
  console.log('The code to give the machine is', code)
})
