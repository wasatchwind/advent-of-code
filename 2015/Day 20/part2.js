'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 20 Part 2 answer: 831600

  const totalPresents = puzzleInput
  const maxHouses = Math.ceil(totalPresents / 11) + 1 // Each house guaranteed at least 11 presents
  const allHouses = new Array(maxHouses).fill(0)
  let lowestHouseNumber
  let elf = 0

  // Calculate presents each house receives
  while (true) {
    elf++
    if (elf > maxHouses) break
    for (let house = elf; house <= maxHouses; house += elf) {
      if (house / elf > 50) continue // Elf stops delivering after 50 houses
      allHouses[house] += 11 * elf
    }
  }

  // Loop through all houses to find the first house where total presents meet/exceed total presents
  for (let house = 0; house < maxHouses; house++) {
    if (allHouses[house] >= totalPresents) {
      lowestHouseNumber = house
      break
    }
  }

  document.getElementById('answer').innerText = lowestHouseNumber
  console.log('The lowest house number is', lowestHouseNumber)
})
