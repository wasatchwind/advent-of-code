'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 24 Part 2 answer: 77387711

  // Split puzzle input text into array of numbers
  const weightsArray = puzzleInput.split('\n').map(item => Number(item))

  const targetGroups = 4 // Part 2: change to 4 groups
  const totalWeight = weightsArray.reduce((total, item) => total += item)
  const weightPerGroup = totalWeight / targetGroups
  const smallestGroup = findMinSubsetLength(weightsArray, weightPerGroup)
  const qe = smallestGroup.reduce((product, element) => product *= element)

  function findMinSubsetLength(weights) {
    let minLength = Infinity // Start with infinity for first comparison
    let bestSubset = []
    backtrack(0, 0, [])

    // Recursive helper function to compare all combinations of weights
    function backtrack(start, currentSum, path) {
      
      // If the sum of weights equals target, compare the number of weights to the current lowest number
      if (currentSum === weightPerGroup) {
        if (path.length < minLength) {
          minLength = path.length // If true, record the new lowest number of weights
          bestSubset = path.slice() // bestSubset a shallow copy of path
        }
        return
      }

      for (let i = start; i < weights.length; i++) {
        const next = weights[i]

        // If sum exceeds target weight or (to prune) path length exceeds the existing minimum length
        if (currentSum + next > weightPerGroup || path.length + 1 >= minLength) continue
        
        path.push(next)

        // Recurse
        backtrack(i + 1, currentSum + next, path)
        path.pop() // After recurse, remove last element (weight) from path
      }
    }
    return bestSubset
  }

  document.getElementById('answer').innerText = qe
  console.log('The quantum entanglement of the first group is', qe)
})
