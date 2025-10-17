'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 18 Part 2 answer: 22,20

  const fallenBlocks = 1024 // A path exists at this point; now start adding individual blocks here
  const gridSize = 71 // Square grid
  const memoryBlock = puzzleInput.split('\n').map(line => line.split(',').map(Number))
  const start = [0, 0]
  const end = [gridSize - 1, gridSize - 1]

  // Create base grid needs to be a function for multiple calls
  function createGrid(walls = []) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.')) // Create grid populated with all "."
    for (const [x, y] of walls) grid[y][x] = '#' // Put "#" at block coordinates
    return grid
  }

  // Function to check if a path exists as new blocks are added
  function pathExists(grid) {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const queue = [[...start]]
    const visited = new Set([start.toString()])

    while (queue.length > 0) {
      const [x, y] = queue.shift()
      if (x === end[0] && y === end[1]) return true

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (
          nx >= 0 && nx < gridSize && // If x within grid bounds
          ny >= 0 && ny < gridSize && // If y within grid bounds
          grid[ny][nx] === '.' && // Next position is possible to move to
          !visited.has(`${nx},${ny}`) // Has not been visited before
        ) {
          visited.add(`${nx},${ny}`) // Add to visited Set()
          queue.push([nx, ny]) // Add to queue array
        }
      }
    }
    return false;
  }

  // Part 2 logic
  let walls = []
  let blockingWall = null
  walls = memoryBlock.slice(0, fallenBlocks) // Add the first 1024 blocks to start
  let grid = createGrid(walls)

  for (let i = fallenBlocks; i < memoryBlock.length; i++) {
    walls.push(memoryBlock[i])
    grid = createGrid(walls)

    if (!pathExists(grid)) {
      blockingWall = memoryBlock[i].toString()
      break
    }
  }

  document.getElementById('answer').innerText = blockingWall
  console.log('Coordinates of the blocking wall are:', blockingWall)
})
