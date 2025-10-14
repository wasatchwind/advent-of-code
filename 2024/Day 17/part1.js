'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 17 Part 1 answer: 3,5,0,1,5,1,5,1,0

  const inputLines = puzzleInput.split('\n');
  let registerA = parseInt(inputLines[0].match(/\d+/));
  let registerB = 2024;
  let registerC = 43690;
  let pointer = 0;
  let output = [];
  const program = (inputLines[4].split(': ')[1]).split(',').map(Number);

  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];
    executeInstruction(opcode, operand);
    pointer += 2;
  }

  console.log('The answer is string:', output.join(','))

  function executeInstruction(opcode, operand) {
    switch (opcode) {
      case 0: // adv
        registerA = Math.trunc(registerA / (2 ** getComboOperand(operand)));
        break;
      case 1: // bxl
        registerB = registerB ^ operand;
        break;
      case 2: // bst
        registerB = getComboOperand(operand) % 8;
        break;
      case 3: // jnz
        if (registerA !== 0) pointer = operand - 2;
        break;
      case 4: // bxc
        registerB = registerB ^ registerC
        break;
      case 5: // out
        output.push(getComboOperand(operand) % 8);
        break;
      case 6: // bdv
        registerB = Math.trunc(registerA / (2 ** getComboOperand(operand)));
        break;
      default:
        registerC = Math.trunc(registerA / (2 ** getComboOperand(operand)));
    }
  }

  function getComboOperand(operand) {
    if (operand === 4) return registerA;
    if (operand === 5) return registerB;
    if (operand === 6) return registerC;
    return operand;
  }

})
