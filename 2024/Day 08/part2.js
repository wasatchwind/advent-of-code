'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 8 Part 2 answer: 994

  // Generate 2D map by splitting puzzle input into lines of text
  const map = puzzleInput.split('\n').map(line => line.trim())

  const mapHeight = map.length
  const mapWidth = map[0].length
  const antinodes = new Set()
  const antennas = {}

  // Loop to populate the antennas object, listing all coordinates for each antenna type/symbol
  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      if (map[row][col] !== '.') {
        if (!antennas[map[row][col]]) antennas[map[row][col]] = []
        antennas[map[row][col]].push({ 'row': row, 'col': col})
      }
    }
  }

  // Loop through all coordinates of each antenna
  for (const coordinates of Object.values(antennas)) {
    // Nested loops to iterate over all unique pairs of coordinates
    for (let firstCoordinate = 0; firstCoordinate < coordinates.length - 1; firstCoordinate++) {
      for (let secondCoordinate = firstCoordinate + 1; secondCoordinate < coordinates.length; secondCoordinate++) {
        findAntinodes(coordinates[firstCoordinate], coordinates[secondCoordinate])
      }
    }
  }

  // Explore both ways along an axis created by 2 antennas with equal distances for antinodes
  function findAntinodes(antenna1, antenna2) {
    const y = antenna2.row - antenna1.row
    const x = antenna2.col - antenna1.col

    // Follow positive direction until end of map
    registerAntinode(antenna1.row, antenna1.col, y, x)

    // Follow negative direction until end of map
    registerAntinode(antenna1.row, antenna1.col, y * -1, x * -1)
  }

  // Check antinode coordinates to see if they are within the map; add to antinodes set if true
  function registerAntinode(startRow, startCol, y, x) {
    let row = startRow
    let col = startCol

    // Continue adding antinodes in the given direction until off the map
    while (true) {
      antinodes.add(JSON.stringify([row, col]))
      row += y
      col += x
      if (row < 0 || row >= mapHeight || col < 0 || col >= mapWidth) break
    }
  }

  document.getElementById('answer').innerText = antinodes.size
  console.log('The count of locations that contain an antinode is', antinodes.size)
})
