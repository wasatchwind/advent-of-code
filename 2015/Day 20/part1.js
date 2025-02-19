'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 20 Part 1 answer: 786240

  const totalPresents = puzzleInput
  const maxHouses = totalPresents / 10 // Guarantee that each house gets at least 10 presents
  const allHouses = new Array(maxHouses).fill(0)
  let lowestHouseNumber = 0

  // Loop through potential numbers of presents per delivery
  for (let elf = 1; elf <= maxHouses; elf++) {

    // Loop through houses that receive presents from the current elf
    for (let house = elf; house <= maxHouses; house += elf) {
      allHouses[house - 1] += 10 * elf
    }
  }

  // Loop through all houses to find the first house where total presents meet/exceed total presents
  for (let house = 0; house < maxHouses; house++) {
    if (allHouses[house] >= totalPresents) {
      lowestHouseNumber = house + 1
      break
    }
  }

  document.getElementById('answer').innerText = lowestHouseNumber
  console.log('The lowest house number is', lowestHouseNumber)
})
