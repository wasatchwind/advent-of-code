'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 18 Part 1 answer: 1061

  // Split text into individual lines, each line a row of a grid of lights either on or off
  const lights = puzzleInput.split('\n').map(line => line.trim())
  const gridSize = 100
  const animationSteps = 100
  const height = lights.length - 1
  const width = lights[0].length - 1

  // Set up array of arrays to represent a 100x100 light grid with all values starting false
  let currentGrid = Array.from({ length: gridSize }, () => new Array(gridSize).fill(false))

  // Loop through the grid row by row to map initial true/false values according to puzzle input
  for (let i = 0; i <= height; i++) {
    for (let j = 0; j <= width; j++) {
      currentGrid[j][i] = lights[j][i] === '#'
    }
  }

  // Create a deep copy of the current grid so the entire grid can be updated in one step
  // Otherwise, changes to one light at a time affects neighbor lights before the grid updates 
  const nextGrid = JSON.parse(JSON.stringify(currentGrid))
  
  // Loop through animation steps (frames) with nested loops for traversing the grid row by row
  for (let i = 0; i < animationSteps; i++) {
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        const thisLightOn = currentGrid[y][x] ? true : false // Determine if a light is currently on
        let neighborsOnCount = checkNeighbors(x, y)
        if (thisLightOn) neighborsOnCount-- // If current light is on don't count it with neighbor lights
        
        // Rule 1: Light on stays on when 2 or 3 neighbors are on; off otherwise
        if (thisLightOn && (neighborsOnCount < 2 || neighborsOnCount > 3)) nextGrid[y][x] = false
        
        // Rule 2: Light off turns on if 3 neighbors are on; stays off otherwise
        if (!thisLightOn && neighborsOnCount === 3) nextGrid[y][x] = true
      }
    }
    // Update the copy of the grid (animation changes grid by grid not light by light)
    currentGrid = JSON.parse(JSON.stringify(nextGrid))
  }

  // Function to find neighbor/surrounding light statuses, taking into account grid limits
  function checkNeighbors(x, y) {
    let neighborCount = 0
    const top = y - 1 >= 0 ? y - 1 : y // Set top range to check (3 possible)
    const bottom = y + 1 < height ? y + 1 : height  // Set bottom range to check (3 possible)
    const left = x - 1 >= 0 ? x - 1 : x // Coordinate to check at left
    const right = x + 1 < width ? x + 1 : width // Coordinate to check at right
    
    // Loop through grid row by row and count neighbor lights that are on
    for (let row = top; row <= bottom; row++) {
      neighborCount += currentGrid[row].slice(left, right + 1).filter(value => value === true).length
    }
    return neighborCount
  }

  document.getElementById('answer').innerText = currentGrid.flat().filter(Boolean).length
  console.log('The count of lights on after 100 steps is', currentGrid.flat().filter(Boolean).length)
})
