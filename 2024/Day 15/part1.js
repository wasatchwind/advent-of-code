'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 15 Part 1 answer: 1471826

  // Some funky formatting in the puzzle input mixing \r and \n
  const divideInput = puzzleInput.split('\r\n\r\n')
  const warehouse = divideInput[0].split('\r\n').map(line => [...line])
  const movements = divideInput[1].split('\r\n').flatMap(line => line.split(''))

  let robotLocation = { 'row': 0, 'col': 0 }
  let sum = 0

  // Find initial robot location
  warehouse.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === '@') robotLocation = { row: rowIndex, col: colIndex }
    })
  })

  // Movement for robot and to find open spots boxes can move to
  const nextMove = (direction, row, col) => {
    switch (direction) {
      case '^': row--; break
      case '>': col++; break
      case 'v': row++; break
      case '<': col--; break
    }
    return { row, col }
  }

  // Loop through all movements
  movements.forEach(direction => {
    let { row, col } = nextMove(direction, robotLocation.row, robotLocation.col)

    if (warehouse[row][col] === '#') return // Next move is a wall; do nothing

    if (warehouse[row][col] === '.') { // Move robot to open spot
      warehouse[robotLocation.row][robotLocation.col] = '.'
      warehouse[row][col] = '@'
      robotLocation = { row, col }
    }

    else { // Handle box pushing movement

      // Continue looking for open spots between robot and nearest wall
      while (warehouse[row][col] !== '#') {
        ({ row, col } = nextMove(direction, row, col))
        
        // Fill open spot with a box, mark spot open where robot was, move robot to next spot
        // (replace box currently there to simulate pushing all boxes)
        if (warehouse[row][col] === '.') {
          warehouse[row][col] = 'O'
          warehouse[robotLocation.row][robotLocation.col] = '.'
          robotLocation = nextMove(direction, robotLocation.row, robotLocation.col)
          warehouse[robotLocation.row][robotLocation.col] = '@'
          break
        }
      }
    }
  })

  // Calculate the sum (start with 1 instead of 0 because borders can't be boxes)
  for (let row = 1; row < warehouse.length - 1; row++) {
    for (let col = 1; col < warehouse[0].length - 1; col++)
    if (warehouse[row][col] === 'O') {
      sum += 100 * row + col
    }
  }

  document.getElementById('answer').innerText = sum
  console.log('The sum of all box coordinates is', sum)
})
