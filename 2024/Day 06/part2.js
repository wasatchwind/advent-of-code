'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 6 Part 2 answer: 1530

  // Split puzzle input text into rows and each row into an array of elements
  const baseMap = puzzleInput.split('\n').map(line => line.trim()).map(line => line.split(''))
  const gridLength = baseMap.length
  const gridWidth = baseMap[0].length

  // Function findStartCoordinates() looks for a unique character that indicates the starting position
  // and direction of the guard. To mitigate all possible directions, a regular expression looks
  // for all of them (^, v, <, >).
  let guardCoordinates = findStartCoordinates()

  // Anonymous IIFE to check the character at the starting coordinates and assign a number accordingly
  // for easy sequential incrementation as the guard always turns right at an obstacle.
  let guardDirection = (() => {
    switch(baseMap[guardCoordinates.row][guardCoordinates.col]) {
      case '^':
        return 0 // North/Up
      case '>':
        return 1 // East/Right
      case 'v':
        return 2 // South/Down
      default:
        return 3 // West/Left (the only possible option left is the default)
    }
  })()

  let guardOnMap = true

  // Create restore points for starting coordinates and direction
  const startCoordinates = { ...guardCoordinates } // Object deep copy
  const startDirection = guardDirection
  const visited = new Set() // For tracking turnpoints and direction (infinite loop detection)
  let stuckInLoop = false
  let infiniteLoops = 0
  
  // Loop over entire baseMap placing obstacles in availalbe spots to see if it creates an infinite loop
  for (let row = 0; row < gridLength; row++) {
    for (let col = 0; col < gridWidth; col++) {
      if (baseMap[row][col] !== '.') continue // If obstacle not allowed, skip ahead to next coordinates
      
      baseMap[row][col] = '#' // temporarily add obstacle
      
      // Loop to simulate guard's route
      while (guardOnMap) {
        guardOnMap = updateGuard()
        if (stuckInLoop) break
      }

      // Restore original settings for next baseMap variation
      baseMap[row][col] = '.' // Remove temporary obstacle
      guardOnMap = true
      guardCoordinates = { ...startCoordinates } // Reset start coordinates via object deep copy
      guardDirection = startDirection
      visited.clear()
      stuckInLoop = false
    }
  }

  function findStartCoordinates() {
    for (let x = 0; x < baseMap.length; x++) {
      const row = baseMap[x]
      const regex = new RegExp(/[\^v<>]/)
      for (let y = 0; y < row.length; y++) {
        if (regex.test(row[y])) {
          return { 'row': x, 'col': y }
        }
      }
    }
  }

  // Calls moveOrTurn() with details unique to each 2D direction
  function updateGuard() {
    switch (guardDirection) {
      case 0:
        return moveOrTurn(guardCoordinates.row > 0, -1, 0)
      case 1:
        return moveOrTurn(guardCoordinates.col + 1 < gridWidth, 0, 1)
      case 2:
        return moveOrTurn(guardCoordinates.row + 1 < gridLength, 1, 0)
      case 3:
        return moveOrTurn(guardCoordinates.col > 0, 0, -1)
    }

    // Helper Function to reduce redundancy in moving/turning the guard; works for any direction
    function moveOrTurn (onGrid, row, col) {
      // console.log(guardCoordinates.row, guardCoordinates.col)
      if (!onGrid) return false // If the next move exits the grid return false and end the loop

      // If the guard doesn't have an obstacle (#) then move the guard,
      // record the current coordinates, and then update the coordinates.
      if (onGrid && baseMap[guardCoordinates.row + row][guardCoordinates.col + col] !== '#') {
        guardCoordinates.row += row
        guardCoordinates.col += col
      }

      // If there is an obstacle, the guard turns to the right but doesn't move. Direction resets
      // back to zero if incrementing it would be greater than 3.
      else if (baseMap[guardCoordinates.row + row][guardCoordinates.col + col] === '#') {
        guardDirection = guardDirection === 3 ? 0 : guardDirection += 1

        // Track turnpoints and direction in a Set() (visited)
        const turnPoint = `${guardCoordinates.row},${guardCoordinates.col},${guardDirection}`
        
        // If the turnpoint and direction match data already in the set the guard is in an infinite loop
        if (visited.has(turnPoint)) {
          infiniteLoops++
          stuckInLoop = true
        }
        visited.add(turnPoint)
      }

      return true // Guard still on grid and move or turn executed
    }
  }

  document.getElementById('answer').innerText = infiniteLoops
  console.log('The count of different obstruction positions is', infiniteLoops)
})
