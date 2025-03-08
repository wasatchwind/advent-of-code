'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 13 Part 1 answer: 224357412

  const robotList = puzzleInput.split('\n').map(line => line.match(/[+-]?\d+/g).map(Number))
  const seconds = 100
  const gridWidth = 101
  const gridHeight = 103
  const quadrants = { 'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0 }
  const midX = Math.floor(gridWidth / 2)
  const midY = Math.floor(gridHeight / 2)
  const robots = {}
  let safetyFactor = 0
  
  // Parse puzzle input an object that tracks each robot and it's coordinates and movement
  robotList.forEach((robot, index) => {
    robots[index] = { 'col': robot[0], 'row': robot[1], 'colMove': robot[2], 'rowMove': robot[3] }
  })
  

  for (let i = 0; i < seconds; i++) { // Per second loop
    for (const robot of Object.values(robots)) { // Move each robot before next second begins
      robot.col += robot.colMove
      robot.row += robot.rowMove
  
      // Ensure coordinates that go off grid loop back around
      robot.row = (robot.row + gridHeight) % gridHeight
      robot.col = (robot.col + gridWidth) % gridWidth
    }
  }
  
  // Count each robot present in each quadrant at the end of 100 seconds
  // Ignore middle coordinate col & row
  for (const { col, row } of Object.values(robots)) {
    if (col < midX && row < midY) quadrants.q1++
    else if (col > midX && row < midY) quadrants.q2++
    else if (col < midX && row > midY) quadrants.q3++
    else if (col > midX && row > midY) quadrants.q4++
  }
  
  // Spread operator to use reduce() on the quadrant object
  safetyFactor = [...Object.values(quadrants)].reduce((product, quadrant) => product * quadrant)

  document.getElementById('answer').innerText = safetyFactor
  console.log('The safety factor is', safetyFactor)
})
