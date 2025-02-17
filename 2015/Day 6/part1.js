'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 6 Part 1 answer: 377891
  
  // Split text into individual lines, each line an instruction to modify the lights grid
  const instructions = puzzleInput.split('\n').map(line => line.trim())

  // Set up a 1000x1000 true/false 2D grid and set all to start/default of false
  const grid = []
  for (let i = 0; i < 1000; i++) {
    const line = new Array(1000).fill(false)
    grid.push(line)
  }

  // Loop through each instruction
  for (const instruction of instructions) {

    // Default action is 'on' but change to 'off' or 'toggle' accordingly
    let action = 'on'
    if (instruction.startsWith('turn off')) action = 'off'
    if (instruction.startsWith('toggle')) action = 'toggle'

    // Extract digits for area coordinates of lights to perform the action
    // Array format: [start column, start row, end column, end row]
    const areaCoordinates = instruction.match(/\d{1,3}/g).map(item => parseInt(item))
    
    updateGrid(action, areaCoordinates)
  }

  // After executing all instructions count all lights that are on in the entire grid
  const lightsCount = grid.flatMap(row => row).filter(cell => cell).length

  // Function to update the grid sub-area per specific instruction action
  function updateGrid(action, [startCol, startRow, endCol, endRow]) {
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (action === 'on') grid[row][col] = true
        else if (action === 'off') grid[row][col] = false
        else grid[row][col] = grid[row][col] ? false : true
      }
    }
  }

  document.getElementById('answer').innerText = lightsCount
  console.log('Count of lit lights', lightsCount)
})
