
'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 7 Part 2 answer: 14134
  const wires = {}

  // Parse and format each raw instruction line into an array of objects (instructions)
  const instructions = puzzleInput.split('\n').map(instruction => {
    const parsed = instruction.trim().split(' ')
    const destinationWire = parsed.pop()
    parsed.pop() // Remove unnecessary last element ('->')

    // Part 2: modify signal on wire b from 1674 to the answer from Part 1 (46065)
    if (parsed.length === 1 && destinationWire === 'b') parsed[0] = 46065
  
    // When parsed is only 1 element it must be direct assignment, no wire2
    if (parsed.length === 1) return { action: 'DIRECT', wire1: parsed[0], wire2: null, destinationWire }
    
    // 'NOT' only possible when the first element is NOT, no wire2
    if (parsed[0] === 'NOT') return { action: 'NOT', wire1: parsed[1], wire2: null, destinationWire }
    
    // All other actions fall into a wire1 and wire1 scenario (AND, OR, LSHIFT, RSHIFT)
    return { action: parsed[1], wire1: parsed[0], wire2: parsed[2], destinationWire }
  })

  // Continue loop until all instructions executed
  while (instructions.length > 0) {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i]

      // If the instruction works, remove it from the list
      if (tryInstruction(instruction)) instructions.splice(i, 1)
    }
  }

  console.log('The signal on wire "a" is', wires['a'])
  document.getElementById('answer').innerText = wires['a']

  // Function to check if the instruction is ready and execute it if so
  function tryInstruction({ action, wire1, wire2, destinationWire }) {
    const wire1Ready = !wire1 || !isNaN(wire1) || wires.hasOwnProperty(wire1)
    const wire2Ready = !wire2 || !isNaN(wire2) || wires.hasOwnProperty(wire2)

    if (wire1Ready && wire2Ready) {
      wires[destinationWire] = executeInstruction(action, wire1, wire2)
      return true
    }
    return false
  }

  // Function to execute the instruction when ready
  function executeInstruction(action, wire1, wire2) {
    const value1 = parseInt(wire1) ? parseInt(wire1) : wires[wire1]
    const value2 = parseInt(wire2) ? parseInt(wire2) : wires[wire2]

    // Bitwise operators
    switch (action) {
      case 'DIRECT': return value1
      case 'AND': return value1 & value2
      case 'OR': return value1 | value2
      case 'NOT': return ~value1 & 0xFFFF
      case 'LSHIFT': return value1 << value2
      case 'RSHIFT': return value1 >> value2
    }
  }
})
