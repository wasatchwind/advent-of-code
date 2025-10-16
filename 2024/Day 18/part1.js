
'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 18 Part 1 answer: 262

  const fallenBlocks = 1024
  const gridSize = 71
  const memoryBlock = puzzleInput.split('\n').map(line => line.split(',').map(Number)).slice(0, fallenBlocks)
  const start = [0, 0]
  const end = [gridSize - 1, gridSize - 1]
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.'))

  memoryBlock.forEach(element => {
    grid[element[1]][element[0]] = '#'
  });

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
          nx >= 0 && nx < gridSize &&
          ny >= 0 && ny < gridSize &&
          grid[nx][ny] === '.' &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`)
          queue.push([nx, ny, [...path, [nx, ny]]])
        }
      }
    }
  }

  const path = findShortestPath()
  document.getElementById('answer').innerText = path.length - 1
  console.log('The minimum number of steps is', path.length - 1)

})
