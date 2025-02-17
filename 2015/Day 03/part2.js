'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 2 answer: 2360
  
  // Declare x and y coordinates for Santa and Robo-Santa on a 2D grid
  let [santaX, santaY] = [0, 0]
  let [robotX, robotY] = [0, 0]

  // Use a Set to only count visited houses once
  const visited = new Set(['0,0'])

  // Loop through each character and it's index of the input string
  // Requires conversion of input string to an object (array) via spread operater [...]
  for (const [index, char] of [...puzzleInput].entries()) {
    
    // If the index is even (modulus (%) [number] is 0) Santa moves
    if (index % 2 === 0) {
      if (char === '^') santaY++
      else if (char === '>') santaX++
      else if (char === 'v') santaY--
      else santaX--
      visited.add(`${santaX},${santaY}`)
    }
    // Otherwise Robo-Santa moves
    else {
      if (char === '^') robotY++
      else if (char === '>') robotX++
      else if (char === 'v') robotY--
      else robotX--
      visited.add(`${robotX},${robotY}`)
    }
  }
  
  document.getElementById('answer').innerText = visited.size
  console.log('Houses receiving at least one present:', visited.size)
})
