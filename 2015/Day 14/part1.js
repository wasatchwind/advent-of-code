'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 134 Part 1 answer: 2696

  // Process input text line by line into an array of arrays
  const reindeerStats = puzzleInput.split('\n').map(line => line.trim()).map(line => line.split(' '))
  const raceDuration = 2503
  const statsObject = {}

  // Construct object of each reindeer's stats
  for (const reindeer of reindeerStats) {
    statsObject[reindeer[0]] = {
      'SPEED': Number(reindeer[3]), // Cap case indicates fixed number
      'FLYTIME': Number(reindeer[6]), // Cap case indicates fixed number
      'REST': Number(reindeer[13]), // Cap case indicates fixed number
      'elapsed': 0,
      'distance': 0,
      'flew': 0,
      'wait': 0
    }
  }

  // Commence race and evaluate each second
  for (let timer = 1; timer <= raceDuration; timer++) {
    for (const reindeer of Object.values(statsObject)) {
      reindeer.elapsed = timer

      // If wait is zero, reindeer can fly, incrementing fly time and distance
      if (reindeer.wait === 0) {
        reindeer.flew++
        reindeer.distance += reindeer.SPEED
      }
      else reindeer.wait-- // If wait > 0 then reindeer must continue resting
      
      // Check if reindeer must rest; if so set wait timer
      if (reindeer.flew >= reindeer.FLYTIME) {
        reindeer.wait = reindeer.REST
        reindeer.flew = 0
      }
    }
  }

  const winningDistance = Math.max(...Object.values(statsObject).map(reindeer => reindeer.distance))
  document.getElementById('answer').innerText = winningDistance
  console.log('The winning reindeer distance is', winningDistance)
})
