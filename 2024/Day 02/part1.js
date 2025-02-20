'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 2 Part 1 answer: 559

  // Split puzzle input text into rows and map to arrays of numbers
  const reports = puzzleInput.split('\n').map(line => line.match(/\d+/g).map(Number))
  let total = 0

  for (const report of reports) {
    if (isSafe(report)) total++
  }

  function isSafe(report) {

    // Immediately return false if rules are not met on the first two numbers
    let initialDifference = report[0] - report[1]
    if (initialDifference === 0 || Math.abs(initialDifference) < 1 || Math.abs(initialDifference) > 3) return false
    
    // Establish initial trend to check for continuous consistency
    let trend = report[0] - report[1] < 0 ? 'increasing' : 'decreasing'
    
    // Compare remaining elements pair by pair of the current report
    for (let i = 1; i < report.length - 1; i++) {
      let difference = report[i] - report[i + 1]

      // Rule 1: continuous decrease or continuous increase
      if (difference === 0 || difference < 0 && trend === 'decreasing' || difference > 0 && trend === 'increasing') return false
      
      // Rule 2: Any two adjacent elements must differ by at least one and at most three
      if (Math.abs(difference) < 1 || Math.abs(difference) > 3) return false
    }
    // At this point the report meets all criteria, return true
    return true
  }

  document.getElementById('answer').innerText = total
  console.log('The count of safe reports is', total)
})
