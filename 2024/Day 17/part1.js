'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 17 Part 1 answer: 3,5,0,1,5,1,5,1,0

  const inputLines = puzzleInput.split('\n')
  let registerA = parseInt(inputLines[0].match(/\d+/))
  let registerB = 0
  let registerC = 0
  let pointer = 0
  let output = []
  const program = (inputLines[4].split(': ')[1]).split(',').map(Number)

  while (pointer < program.length) {
    const opcode = program[pointer]
    const operand = program[pointer + 1]
    executeInstruction(opcode, operand)
    pointer += 2
  }

  function executeInstruction(opcode, operand) {
    switch (opcode) {
      case 0: registerA = Math.trunc(registerA / (2 ** getComboOperand(operand))); break; // adv
      case 1: registerB = registerB ^ operand; break; // bxl
      case 2: registerB = getComboOperand(operand) % 8; break; // bst
      case 3: if (registerA !== 0) pointer = operand - 2; break; // jnz
      case 4: registerB = registerB ^ registerC; break; // bxc
      case 5: output.push(getComboOperand(operand) % 8); break; // out
      case 6: registerB = Math.trunc(registerA / (2 ** getComboOperand(operand))); break; // bdv
      default: registerC = Math.trunc(registerA / (2 ** getComboOperand(operand)));
    }
  }

  function getComboOperand(operand) {
    if (operand === 4) return registerA
    if (operand === 5) return registerB
    if (operand === 6) return registerC
    return operand
  }

  document.getElementById('answer').innerText = output.join(',')
  console.log('Output into a single string is', output.join(','))

})
