'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 16 Part 1 answer: 107468

  const maze = puzzleInput.split('\n').map(line => line.split(''))
  const pathScores = []
  const visited = new Map()
  const paths = []
  const initialDirection = 'right'
  let startCoords = {}
  let endCoords = {}
  let bestScore = Infinity

  // Loop through entire maze to find and set start and end coordinates
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 'S') startCoords = { col, row }
      if (maze[row][col] === 'E') endCoords = { col, row }
    }
  }

  const directions = [
    { move: '^', destinationCol: 0, destinationRow: -1 }, // Up (North)
    { move: '>', destinationCol: 1, destinationRow: 0 }, // Right (East)
    { move: 'v', destinationCol: 0, destinationRow: 1 }, // Down (South)
    { move: '<', destinationCol: -1, destinationRow: 0 } // Left (West)
  ]

  // Turns possible before initial move, each 90 degree turn costs 1000 points
  for (let dir of directions) {
    const nextCol = startCoords.col + dir.destinationCol
    const nextRow = startCoords.row + dir.destinationRow

    if (maze[nextRow][nextCol] !== '#') {
      const turnCost = dir.move === initialDirection ? 0 : 1000
      paths.push({ col: nextCol, row: nextRow, direction: dir.move, steps: 1, score: 1 + turnCost })
      visited.set(`${nextCol},${nextRow},${dir.move}`, 1 + turnCost)
    }
  }

  // Loop until paths has length of zero as it shrinks via .pop()
  while (paths.length > 0) {
    const { col, row, direction, steps, score } = paths.pop()

    // If the end is reached, record the path score and continue exploring other path options
    if (col === endCoords.col && row === endCoords.row) {
      bestScore = Math.min(bestScore, score)
      pathScores.push(score)
      continue
    }

    // Try all possible directions
    for (let dir of directions) {
      const nextCol = col + dir.destinationCol
      const nextRow = row + dir.destinationRow

      if (maze[nextRow][nextCol] === '#') continue // Move not possible, continue exploring

      // Move is possible, add 1 point for a move and 1000 points for a 90 degree turn
      let newScore = score + 1
      if (dir.move !== direction) newScore += 1000
      const key = `${nextCol},${nextRow},${dir.move}`

      // Skip if a better or equal score was previously recorded for current position and direction
      if (visited.has(key) && visited.get(key) <= newScore) continue

      visited.set(key, newScore) // Add key and score

      // Record valid path
      paths.push({ col: nextCol, row: nextRow, direction: dir.move, steps: steps + 1, score: newScore })
    }
  }

  console.log('The lowest score possible is', Math.min(...pathScores))
})
