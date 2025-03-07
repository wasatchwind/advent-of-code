'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 13 Part 2 answer: 91649162972270

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
    return { X: BigInt(matches[0]), Y: BigInt(matches[1]) } // Need BigInt() for part 2
  }

  function findCheapestWin(buttonA, buttonB, prize) {
    // Need BigInt() for part 2, adjust prize locations by adding 10000000000000
    prize.X += BigInt(10000000000000)
    prize.Y += BigInt(10000000000000)

    // Unlike Part 1 a brute force loop won't work
    // Derive a mathematical equation using algebraic "2 equations/2 unknowns":
    // EQ1: aPushes * buttonA.X + bPushes * buttonB.X = prize.X
    // EQ1: aPushes * buttonA.Y + bPushes * buttonB.Y = prize.Y
    // Solve both for aPushes age:
    // EQ1: aPushes = (prize.X - bPushes * buttonB.X) / buttonA.X
    // EQ2: aPushes = (prize.Y - bPushes * buttonB.Y) / buttonA.Y
    // Combine since one aPushes equation equals the other:
    // (prize.X - bPushes * buttonB.X) / buttonA.X = (prize.Y - bPushes * buttonB.Y) / buttonA.Y
    // Solve for bPushes, then "plug in" bPushes to obtain the aPushes equation:

    const bPushes = (buttonA.X * prize.Y - buttonA.Y * prize.X) / (buttonA.X * buttonB.Y - buttonA.Y * buttonB.X)
    const aPushes = (prize.X - bPushes * buttonB.X) / buttonA.X

    // If both original equations are true, the machine has a solution:
    if (aPushes * buttonA.X + bPushes * buttonB.X !== prize.X) return // has no solution
    if (aPushes * buttonA.Y + bPushes * buttonB.Y !== prize.Y) return // has no solution

    fewestTokens += 3 * parseInt(aPushes) + parseInt(bPushes)
  }

  document.getElementById('answer').innerText = fewestTokens
  console.log('The fewest tokens possible to win all possible prizes is', fewestTokens)
})
