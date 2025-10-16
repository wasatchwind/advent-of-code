
'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 17 Part 2 answer: 107413700225434

  const inputLines = puzzleInput.split('\n')
  // BigInt() required for Part 2
  let registerA = BigInt(inputLines[0].match(/\d+/))
  let registerB = BigInt(0)
  let registerC = BigInt(0)
  let pointer = 0
  let output = []
  const program = (inputLines[4].split(': ')[1]).split(',').map(Number)

  const lowestRegisterAValue = parseInt(findLowest(BigInt(0), 1))

  // Recursive function to find the lowest value by checking matches at the end of output working backwards
  function findLowest(register, end) {
    for (let i = 0; i < 8; i++) { // Try all possible final digits (0-7) for the current register value
      const newRegister = register * BigInt(8) + BigInt(i) // Shift register left (base 8) and add new digit
      const output = executeInstruction(newRegister)
      if (program.at(-end) != output.at(-end)) continue  // Ends don't match keep looking (loose equality required)
      if (program.length === output.length) return newRegister  // Found lowest
      const ultimateRegister = findLowest(newRegister, end + 1) // Recursive call to check for longer matching end
      if (ultimateRegister !== 0) return ultimateRegister // On the right track
    }
    return 0 // No match found
  }

  function executeInstruction(register) {
    registerA = register
    registerB = BigInt(0)
    registerC = BigInt(0)
    pointer = 0
    output = []
    while (true) {
      const opcode = program[pointer]
      if (opcode === undefined) return output
      const operand = BigInt(program[pointer + 1])
      switch (opcode) {
        case 0: registerA = registerA / (BigInt(2) ** getComboOperand(operand)); break; // adv
        case 1: registerB = registerB ^ operand; break; // bxl
        case 2: registerB = getComboOperand(operand) % BigInt(8); break; // bst
        case 3: if (registerA != 0) pointer = parseInt(operand) - 2; break; // jnz (loose equality required)
        case 4: registerB = registerB ^ registerC; break; // bxc
        case 5: output.push(getComboOperand(operand) % BigInt(8)); break; // out
        case 6: registerB = registerA / (BigInt(2) ** getComboOperand(operand)); break; // bdv
        default: registerC = registerA / (BigInt(2) ** getComboOperand(operand));
      }
      pointer += 2
    }
  }

  function getComboOperand(operand) { // Loose equality required
    if (operand == 4) return registerA
    if (operand == 5) return registerB
    if (operand == 6) return registerC
    return operand
  }

  document.getElementById('answer').innerText = output.join(',')
  console.log('The lowest positive initial value for register A is', lowestRegisterAValue)

})
