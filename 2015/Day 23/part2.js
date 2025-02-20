'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 23 Part 2 answer: 231

  // Split puzzle input text into individual lines, trim, and format to an array of arrays
  const instructions = puzzleInput.split('\n')
    .map(line => line.trim())
    .map(line => line.replace(',', ''))
    .map(line => line.split(' '))

  let registerA = 1, registerB = 0, instructionRow = 0  // Part 2: start with RegisterA = 1

  // Loop while the instruction row is within the instruction range of rows
  while (instructionRow >= 0 && instructionRow < instructions.length) {
    executeInstruction(instructions[instructionRow])
    instructionRow++ // Move on to next sequential instruction
  }

  function executeInstruction(instruction) {
    const action = instruction[0]
    switch (action) {
      case 'hlf': // Sets registerA to half current value then continues to next row
        registerA /= 2
        break
      case 'tpl': // Sets registerA to triple current value then continues to next row
        registerA *= 3
        break
      case 'inc': // Increments indicated register by 1 then continues to next row
        if (instruction[1] === 'a') registerA++
        if (instruction[1] === 'b') registerB++
        break
      case 'jmp': // Jumps to another row as indicated
        instructionRow += parseInt(instruction[1] - 1)
        break
      case 'jie': // Jumps but only if registerA has an even value
        if (registerA % 2 === 0) instructionRow += parseInt(instruction[2] - 1)
        break
      case 'jio': // Jumps but only if registerA is 1
        if (registerA === 1) instructionRow += parseInt(instruction[2] - 1)
        break
    }
  }

  document.getElementById('answer').innerText = registerB
  console.log('The ultimate value on register b is', registerB)
})
