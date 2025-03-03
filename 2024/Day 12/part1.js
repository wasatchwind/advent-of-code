'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 12 Part 1 answer: 1402544

  // Split puzzle input text into rows and then rows into arrays of map coordinate elements
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
      const { size, perimeter } = calculateAreaAndPerimeter(row, col, plantType)
      totalPrice += size * perimeter
    }
  }

  function calculateAreaAndPerimeter(startRow, startCol, plantType) {
    let areaSize = 0
    let areaPerimeter = 0

    const perimeterPath = [{ 'row': startRow, 'col': startCol }]
    visited[startRow][startCol] = true // Mark coordinate as counted

    while (perimeterPath.length > 0) {
      const { row, col } = perimeterPath.pop()
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
            areaPerimeter++ // Count boundary as perimeter
            return
        }
  
        if (!visited[newRow][newCol]) { // If not already visited, mark as visited
          visited[newRow][newCol] = true
          perimeterPath.push({ row: newRow, col: newCol })
        }
      })
    }
    return { size: areaSize, perimeter: areaPerimeter }
  }

  document.getElementById('answer').innerText = totalPrice
  console.log('The total price of fencing all regions is', totalPrice)
})
