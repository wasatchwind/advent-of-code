'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 8 Part 1 answer: 271

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

  // Explore both ways along an axis created by 2 antennas with equal distances for antinode locations
  function findAntinodes(antenna1, antenna2) {
    const y = antenna2.row - antenna1.row
    const x = antenna2.col - antenna1.col
    
    const rowNorth = antenna1.row - y
    const rowSouth = antenna2.row + y
    const colWest = antenna1.col - x
    const colEast = antenna2.col + x
    
    registerAntinode(rowNorth, colWest)
    registerAntinode(rowSouth, colEast)
  }

  // Check antinode coordinates to see if they are within the map; add to antinodes set if true
  function registerAntinode(row, col) {
    if (row < 0 || row >= mapHeight || col < 0 || col >= mapWidth) return
    antinodes.add(JSON.stringify([row, col]))
  }

  document.getElementById('answer').innerText = antinodes.size
  console.log('The count of locations that contain an antinode is', antinodes.size)
})
