
'use strict'
document.addEventListener('puzzleInputLoaded', () => {

  // Day 16 Part 2 answer: 533

  const maze = puzzleInput.split('\n').map(line => line.split(''))
  const visited = new Map()
  const paths = []
  const initialDirection = '>'
  let startCoords = {}, endCoords = {}
  let bestScore = Infinity

  // Loop through entire maze to find and set start and end coordinates
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c] === 'S') startCoords = { col: c, row: r }
      if (maze[r][c] === 'E') endCoords = { col: c, row: r }
    }
  }

  const directions = [ // Destination cols and rows
    { move: '^', dc: 0, dr: -1 },
    { move: '>', dc: 1, dr: 0 },
    { move: 'v', dc: 0, dr: 1 },
    { move: '<', dc: -1, dr: 0 }
  ]

  const directionIndex = (m) => directions.findIndex(d => d.move === m)
  const rotationCost = (from, to) => {
    const fromIndex = directionIndex(from), toIndex = directionIndex(to)
    const diff = Math.abs(fromIndex - toIndex)
    const turns = Math.min(diff, 4 - diff)
    return turns * 1000
  }

  // Record start state (score 0) so reverse search can step into Start tile
  visited.set(`${startCoords.col},${startCoords.row},${initialDirection}`, 0)

  // Initial moves from Start
  for (let d of directions) {
    const newCol = startCoords.col + d.dc
    const newRow = startCoords.row + d.dr
    if (maze[newRow][newCol] === '#') continue
    const score = 1 + rotationCost(initialDirection, d.move)
    const key = `${newCol},${newRow},${d.move}`
    if (!visited.has(key) || visited.get(key) > score) visited.set(key, score)
    paths.push({ col: newCol, row: newRow, dir: d.move, score })
  }

  // Forward search
  while (paths.length > 0) {
    const { col, row, dir, score } = paths.pop()
    if (col === endCoords.col && row === endCoords.row) {
      bestScore = Math.min(bestScore, score)
      continue
    }

    for (let next of directions) {
      const newCol = col + next.dc
      const newRow = row + next.dr
      if (maze[newRow][newCol] === '#') continue
      const newScore = score + 1 + rotationCost(dir, next.move)
      const key = `${newCol},${newRow},${next.move}`
      if (visited.has(key) && visited.get(key) <= newScore) continue
      visited.set(key, newScore)
      paths.push({ col: newCol, row: newRow, dir: next.move, score: newScore })
    }
  }

  
})
