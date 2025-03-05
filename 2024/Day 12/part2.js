'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 12 Part 2 answer: 862486

  // Split puzzle input text into rows and then rows into arrays of map coordinate elements
  // const map = puzzleInput.split('\n').map(line => line.trim().split(''))
  const map = puzzleInput.split('\n').map(line => line.trim().split(''))
  
  // Create an array of arrays that matches the map but filled with 'false'
  // Coordinates will be marked true as they are counted to prevent double counting
  const visited = Array.from({ length: map.length }, () => new Array(map[0].length).fill(false))
  
  let totalPrice = 0

  // Loop through each map coordinate
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (visited[row][col]) continue // Skip already visited coordinates

      const plantType = map[row][col] // Set the plant symbol/character
      const { size, sides } = calculateAreaAndSides(row, col, plantType)
      totalPrice += size * sides
    }
  }

  function calculateAreaAndSides(startRow, startCol, plantType) {
    let areaSize = 0
    let areaCoords = []

    const coordinates = [{ 'row': startRow, 'col': startCol }]
    visited[startRow][startCol] = true // Mark coordinate as counted

    while (coordinates.length > 0) {
      const { row, col } = coordinates.pop()
      areaCoords.push({ 'row': row, 'col': col })
      areaSize++

      // Check all four directions
      [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach(([destinationRow, destinationCol]) => {
        const newRow = row + destinationRow
        const newCol = col + destinationCol

        // Check if within map boundaries
        if (newRow < 0
          || newRow >= map.length
          || newCol < 0
          || newCol >= map[0].length
          || map[newRow][newCol] !== plantType) {
          return
        }

        if (!visited[newRow][newCol]) { // If not already visited, mark as visited
          visited[newRow][newCol] = true
          coordinates.push({ row: newRow, col: newCol })
        }
      })
    }

    const sides = findSides(areaCoords, plantType)
    return { size: areaSize, sides: sides }
  }

  // Function to find how many sides each plant area has
  // The sum of all outside and inside corners is equivalent to count of sides
  function findSides(coordinates, plantType) {
    let corners = 0

    for (const { row, col } of coordinates) {
      const N = isCorner(row - 1, col)
      const NE = isCorner(row - 1, col + 1)
      const E = isCorner(row, col + 1)
      const SE = isCorner(row + 1, col + 1)
      const S = isCorner(row + 1, col)
      const SW = isCorner(row + 1, col - 1)
      const W = isCorner(row, col - 1)
      const NW = isCorner(row - 1, col - 1)

      // Outside corner can be verified by checking verical and horizontal components
      // Inside corner requires horizontal and vertical plants of the same type but not the diagonal
      if ((W && N) || (!W && NW && !N)) corners++ // NW corner
      if ((E && N) || (!E && NE && !N)) corners++ // NE corner
      if ((E && S) || (!E && SE && !S)) corners++ // SE corner
      if ((W && S) || (!W && SW && !S)) corners++ // SW corner
    }

    // Helper function to avoid repetition and ensure comparisons include map edges
    function isCorner(row, col) {
      return row < 0 || col < 0 || row >= map.length || col >= map[0].length || map[row][col] !== plantType
    }

    return corners
  }
  
  document.getElementById('answer').innerText = totalPrice
  console.log('The total price of fencing all regions is', totalPrice)
})
