'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 18 Part 1 answer: 262

  const fallenBlocks = 1024 // Position of puzzle input to stop "dropping" memory blocks
  const gridSize = 71 // Square grid
  const memoryBlock = puzzleInput.split('\n').map(line => line.split(',').map(Number)).slice(0, fallenBlocks)
  const start = [0, 0]
  const end = [gridSize - 1, gridSize - 1]
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.')) // Create grid populated with all "."

  memoryBlock.forEach(element => { grid[element[1]][element[0]] = '#' }) // Put "#" at memory drop coordinates
  const path = findShortestPath()

  function findShortestPath() {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const queue = [[...start, [start]]]
    const visited = new Set([start.toString()])

    while (queue.length > 0) {
      const [x, y, path] = queue.shift()
      if (x === end[0] && y === end[1]) return path
      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (
          nx >= 0 && nx < gridSize && // If x within grid bounds
          ny >= 0 && ny < gridSize && // If y within grid bounds
          grid[nx][ny] === '.' && // Next position is possible to move to
          !visited.has(`${nx},${ny}`) // Has not been visited before
        ) {
          visited.add(`${nx},${ny}`) // Add to visited Set()
          queue.push([nx, ny, [...path, [nx, ny]]]) // Add to queue array
        }
      }
    }
  }

  document.getElementById('answer').innerText = path.length - 1
  console.log('The minimum number of steps is', path.length - 1)

})
