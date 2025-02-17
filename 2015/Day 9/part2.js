'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 9 Part 2 answer: 909

  // Split text into individual lines, and each line into an array that removes the 'to' and '='
  const everyRoute = puzzleInput.split('\n').map(line => line.trim().split(/\sto\s|\s=\s/))

  // Populate an array of all possible cites
  const cities = []
  for (const city of everyRoute) {
    cities.push(city[0])
    cities.push(city[1])
  }

  // Generate a list of all possible routes from a unique array list (Set) of cities
  const routes = permute([...new Set(cities)])

  // Nested loop to calculate the total distance of each possible route
  const distances = []
  let distance = 0
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].length - 1; j++) {
      distance += getDistance(routes[i][j], routes[i][j + 1])
    }
    distances.push(distance)
    distance = 0 // Reset distance to zero for next iteration
  }

  // Function to calculate the total distance of each route
  function getDistance(start, finish) {
    for (const line of everyRoute) {
      if ((start === line[0] && finish === line[1]) || (finish === line[0] && start === line[1])) {
        return Number(line[2])
      }
    }
  }

  // Function to generate a list of route permutations from an input array
  function permute(array) {
    if (array.length <= 1) return [array] // Base case: single element or empty array
    const permutations = []
    
    array.forEach((element, index) => {
      // Exclude the current array element
      const remaining = array.slice(0, index).concat(array.slice(index + 1))

      // Recursive call to permute excluding the current array element
      const subPermutations = permute(remaining)

      // Add the current element to each sub-permutation
      subPermutations.forEach(subPerm => { permutations.push([element, ...subPerm]) })
    })
    return permutations
  }

  // Greatest distance is the largest value of all distance array elements
  document.getElementById('answer').innerText = Math.max(...distances)
  console.log('The shortest route distance is', Math.max(...distances))
})
