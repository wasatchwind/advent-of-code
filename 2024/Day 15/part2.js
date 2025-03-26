'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 15 Part 2 answer: 1457703

  // Some funky formatting in the puzzle input mixing \r and \n
  const divideInput = puzzleInput.split('\r\n\r\n')
  const originalWarehouse = divideInput[0].split('\r\n').map(line => [...line])
  const movements = divideInput[1].split('\r\n').flatMap(line => line.split(''))

  let robotLocation = {}
  let sum = 0

  // Alter warehouse map for Part 2 changes
  const warehouse = originalWarehouse.map(row => {
    return row.flatMap(cell => {
      switch (cell) {
        case '.':
          return ['.', '.']
        case '#':
          return ['#', '#']
        case 'O':
          return ['[', ']']
        case '@':
          return ['@', '.']
        default:
          return [item]
      }
    })
  })

  // Find robot and set initial robot location coordinates
  for (let row = 0; row < warehouse.length; row++) {
    let col = warehouse[row].indexOf('@')
    if (col !== -1) robotLocation = { 'row': row, 'col': col }
  }

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

    else if (direction === '<' || direction === '>') { // Try to move box/es horizontally
      moveHoriztonal(direction, row, col)
    }

    else { // Try to move box/es vertically
      const verticalMovePossible = isVerticalMovePossible(direction, row, col)

      // Vertical movement is possible, move boxes and update robot location
      if (verticalMovePossible) {
        moveBoxesVertical(direction, row, col)
        warehouse[robotLocation.row][robotLocation.col] = '.'
        robotLocation.row = direction === '^' ? robotLocation.row -= 1 : robotLocation.row += 1
        warehouse[robotLocation.row][robotLocation.col] = '@'
      }
    }
  })

  // Function to determine if horizontal move is possible and execute the move if so
  function moveHoriztonal(direction, row, col) {

    // Keep checking until a wall is found or move is determined possible
    while (warehouse[row][col] !== '#') {
      ({ row, col } = nextMove(direction, row, col))

      // if space found '.' move boxes and update robot location
      if (warehouse[row][col] === '.') {
        warehouse[row].splice(col, 1)
        warehouse[row].splice(robotLocation.col, 0, '.')
        if (direction === '<') robotLocation.col--
        if (direction === '>') robotLocation.col++
        break
      }
    }
  }

  // Recursive function to determine if vertical move is possible
  function isVerticalMovePossible(direction, row, col) {
    if (warehouse[row][col] === ']') col-- // Right side of box so move index left
    row = direction === '^' ? row -=1 : row += 1 // Look at the future/next row to see what's there

    // If wall return with no action
    if (warehouse[row][col] === '#') return false
    if (warehouse[row][col + 1] === '#') return false

    if (warehouse[row][col] === '[') { // If next cell is another box (left side) keep looking
      if (!isVerticalMovePossible(direction, row, col)) return false
    }

    if (warehouse[row][col] === ']') { // If next cell is another box (right side) keep looking
      if (!isVerticalMovePossible(direction, row, col)) return false
    }

    if (warehouse[row][col + 1] === '[') { // If next cell right of index is a box keep looking
      if (!isVerticalMovePossible(direction, row, col + 1)) return false
    }
    return true
  }

  // Recursive function to execute vertical move if determined possible
  // Only slight differences between this function and isVerticalMovePossible function:
  // Keeps track of current row and next row
  // Keeps full track of variations in column/index
  // Writes new positions of boxes and removes old positions
  function moveBoxesVertical(direction, currentRow, currentCol) {
    if (warehouse[currentRow][currentCol] === ']') currentCol--
    const { row, col } = nextMove(direction, currentRow, currentCol)
    
    if (warehouse[row][col] === '[' || warehouse[row][col] === ']') {
      moveBoxesVertical(direction, row, col)
    }
    if (warehouse[row][col + 1] === '[') {
      moveBoxesVertical(direction, row, col + 1)
    }

    // Remove old box positions
    warehouse[currentRow][currentCol] = '.'
    warehouse[currentRow][currentCol + 1] = '.'

    // Write new box positions
    warehouse[row][col] = '['
    warehouse[row][col + 1] = ']'
  }


  // Calculate the sum (start with 1 for row and 2 for col because borders can't be boxes)
  for (let row = 1; row < warehouse.length - 1; row++) {
    for (let col = 2; col < warehouse[0].length - 2; col++)
    if (warehouse[row][col] === '[') {
      sum += 100 * row + col
    }
  }

  document.getElementById('answer').innerText = sum
  console.log('The sum of all box coordinates is', sum)
})
