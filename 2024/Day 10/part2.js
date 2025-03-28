'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 10 Part 2 answer: 1340
  
  const map = puzzleInput.split('\n')
    .map(line => line.trim().split('')
      .map(elevation => new Object({ 'elevation': Number(elevation), 'trailheads': [] }))
    )

  // Find and store all original trailheads (elevation 0) in the map
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col].elevation === 0) {
        map[row][col].trailheads.push({ 'row': row, 'col': col })
      }
    }
  }

  // Start with elevation 0 (original trailheads) and loop through the map to find coordinates
  // that match the incremented elevation to then explore trail options
  for (let elevation = 0; elevation < 9; elevation++) {
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[0].length; col++) {
        if (map[row][col].elevation === elevation) {
          followTrailOptions(elevation + 1, map[row][col].trailheads, row, col)
        }
      }
    }
  }

  // Function to Look for valid trail path options in all directions
  function followTrailOptions(targetElevation, trailheads, row, col) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] // North, East, South, West

    for (const [x, y] of directions) {
      const newRow = row + x, newCol = col + y

      // Check if a new move is within map boundaries and matches the target elevation
      if (newRow >= 0
        && newCol >= 0
        && newRow < map.length
        && newCol < map[0].length
        && map[newRow][newCol].elevation === targetElevation) {
        addToTrailheads(newRow, newCol, trailheads, targetElevation)
      }
    }
  }

  // Function to add ALL (Part 2) validated trailhead coordinates to trailheads even if already present
  function addToTrailheads(row, col, newTrailheads, targetElevation) {
    const coordinates = map[row][col]
    if (coordinates.elevation !== targetElevation) return
    for (const trailhead of newTrailheads) {
      coordinates.trailheads.push(trailhead)
    }
  }

  // Sum up the trail ratings using reduce()
  const sum = map.flat().reduce((sum, coordinates) =>
    coordinates.elevation === 9 ? sum += coordinates.trailheads.length : sum, 0)
  
  document.getElementById('answer').innerText = sum
  console.log('The sum of ratings for all trailheads on the map is', sum)
})
