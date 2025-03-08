'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 14 Part 2 answer: 7083

  const robotList = puzzleInput.split('\n').map(line => line.match(/[+-]?\d+/g).map(Number))
  const gridWidth = 101
  const gridHeight = 103
  const robots = {}
  const numberOfRobots = robotList.length
  let easterEgg = false
  let seconds = 0

  // Parse puzzle input an object that tracks each robot and it's coordinates and movement
  robotList.forEach((robot, index) => {
    robots[index] = { 'col': robot[0], 'row': robot[1], 'colMove': robot[2], 'rowMove': robot[3] }
  })

  // Keep moving robots until the Easter egg is found
  while (!easterEgg) {
    seconds++ // Increment seconds every loop where each robot is moved
    for (const robot of Object.values(robots)) { // Move each robot before next round of movement
      robot.col += robot.colMove
      robot.row += robot.rowMove

      // Ensure coordinates that go off grid loop back around
      robot.row = (robot.row + gridHeight) % gridHeight
      robot.col = (robot.col + gridWidth) % gridWidth
    }

    easterEgg = isChristmasTree() // Check if the tree image is formed
  }

  // The tree occurs when there are no robots occupying the same coordinates since
  // all robots are required to form the tree. When the number of robots (500) is equal
  // to the unique Set() then there are no robots sharing coordinates.
  function isChristmasTree() {
    const tree = new Set()
    for (const { col, row } of Object.values(robots)) {
      tree.add(JSON.stringify([col, row]))
    }
    if (numberOfRobots === tree.size) return true
  }

  document.getElementById('answer').innerText = seconds
  console.log('The fewest number of seconds for the Easter egg to appear is', seconds)
})
