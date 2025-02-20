'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 1 Part 1 answer: 1223326

  // Split puzzle input text into rows and map to a 2 element array of numbers
  const lists = puzzleInput.split('\n').map(line => line.match(/\d+/g).map(Number))

  // Create separate lists via shift() for list1 and pop() for list2, then sort each small to large
  const list1 = lists.map(item => item.shift()).sort((a, b) => a - b)
  const list2 = lists.map(item => item.pop()).sort((a, b) => a - b)

  let total = 0

  // Loop through all rows and sum the distance between list elements (absolute value) into total
  for (let i = 0; i < lists.length; i++) {
    total += Math.abs(list1[i] - list2[i])
  }

  document.getElementById('answer').innerText = total
  console.log('The total distance between lists is', total)
})
