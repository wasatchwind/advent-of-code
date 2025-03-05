'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 13 Part 1 answer: 33427

  const lines = puzzleInput.split('\n').map(line => line.trim())
  let fewestTokens = 0

  for (let i = 0; i < lines.length; i += 4) {
    const buttonA = parseInput(lines[i])
    const buttonB = parseInput(lines[i + 1])
    const prize = parseInput(lines[i + 2])

    findCheapestWin(buttonA, buttonB, prize)
  }

  function parseInput(line) {
    const matches = line.match(/\d+/g).map(Number)
    return { X: matches[0], Y: matches[1] }
  }

  function findCheapestWin(buttonA, buttonB, prize) {
    const maxButtonAForX = Math.floor(prize.X / buttonA.X) // Max times button A can be used for prize X
    const maxButtonAForY = Math.floor(prize.Y / buttonA.Y) // Max times button A can be used for prize Y

    // Max of maxes for button A for both X and Y
    // Covers cases where button A alone might overshoot in one direction but be optimal in another
    const maxButtonA = Math.max(maxButtonAForX, maxButtonAForY)
    
    let best = Infinity // Infinity for initial comparison

    // Loop through all possible ways the A button could get to the prize
    for (let a = 0; a <= maxButtonA; a++) {

      // Distance remaining to get to X after using the A button a times
      const remainderX = prize.X - (a * buttonA.X)
      const b = Math.floor(remainderX / buttonB.X) // How many B buttons required to fill remainderX
      if (b * buttonB.X !== remainderX) continue // B button cannot get to the prize at X

      const remainderY = prize.Y - (a * buttonA.Y)
      if (b * buttonB.Y !== remainderY) continue

      const tokensSpent = 3 * a + b
      if (tokensSpent < best) best = tokensSpent
    }

    if (best < Infinity) fewestTokens += best
  }

  document.getElementById('answer').innerText = fewestTokens
  console.log('The fewest tokens possible to win all possible prizes is', fewestTokens)
})
