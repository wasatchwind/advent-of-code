'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 1 Part 2 answer: 21070419

  // Split puzzle input text into rows and map to a 2 element array of numbers
  const lists = puzzleInput.split('\n').map(line => line.match(/\d+/g).map(Number))

  // Create separate lists via shift() for list1 and pop() for list2, then sort each small to large
  const list1 = lists.map(item => item.shift()).sort((a, b) => a - b)
  const list2 = lists.map(item => item.pop()).sort((a, b) => a - b)

  let total = 0

  // Loop through all elements of list1 and if current element is in list2, multiply
  // the current list1 element by the occurrences of itself in list2
  for (let i = 0; i < lists.length; i++) {
    total += list1[i] * list2.filter(item => item === list1[i]).length
  }

  document.getElementById('answer').innerText = total
  console.log('The similarity score is', total)
})
