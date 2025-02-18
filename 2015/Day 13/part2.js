'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 13 Part 2 answer: 668

  // Process input text line by line into an array of arrays
  const happinessRules = puzzleInput.split('\n').map(line => line.trim()).map(line => line.split(' '))
  
  const relationships = {}
  let maxHappiness = 0
  let arrangementSum = 0

  // Construct relationships object: [0]: person, [2]: gain/lose, [3]: units, [10]: companion
  for (const rule of happinessRules) {

    // Set happiness number positive/negative based on gain/lose
    const happiness = (rule[2] === 'gain' ? 1 : -1) * Number(rule[3])

    // Set relationshiop rule per person (rule[0]) or empty object if already exists
    relationships[rule[0]] = relationships[rule[0]] || {}
    relationships[rule[0]][rule[10].slice(0, -1)] = happiness // Slice to remove the period '.'
  }

  // Part 2 modification: adding yourself to the table with 0 happniness change per guest
  relationships['Me'] = {}
  for (const guest of Object.keys(relationships)) {
    relationships[guest]['Me'] = 0
    relationships['Me'][guest] = 0
  }
  // End of Part 2 modification

  const guests = [...Object.keys(relationships)] // Array of unique guest names
  const arrangements = generateArrangements(guests)

  // Evaluate each arrangement for happiness units
  for (const arrangement of arrangements) {
    for (let i = 0; i < arrangement.length; i++) {
      const guest = arrangement[i]
      const rightCompanion = i < arrangement.length - 1 ? arrangement[i + 1] : arrangement[0]
      const leftCompanion = i >= 1 ? arrangement[i - 1] : arrangement[arrangement.length - 1]
      
      arrangementSum += (relationships[guest][rightCompanion] + relationships[guest][leftCompanion])
    }

    // Only update maxHappiness if arrangementSum is greater than current maxHappiness
    maxHappiness = arrangementSum > maxHappiness ? arrangementSum : maxHappiness
    arrangementSum = 0 // Reset to zero for next round
  }

  // Function to generate an array of arrays of all possible unique guest arrangements
  function generateArrangements(guests) {
    const fixedGuest = guests[0]
    const otherGuests = guests.slice(1)
    const permutations = permute(otherGuests)
    const uniqueArrangements = new Set()

    // Loop to remove reverse order arrangements since they don't change happiness
    for (const arrangement of permutations) {
      const table = [fixedGuest, ...arrangement]
      const reversed = [fixedGuest, ...arrangement.reverse()]
      const key1 = table.join(',')
      const key2 = reversed.join(',')
      if (!uniqueArrangements.has(key2)) uniqueArrangements.add(key1)
    }

    return [...uniqueArrangements].map(line => line.split(',')) // return as an array

    // Recursive Helper function to generate all possible permutations
    function permute(array) {
      if (array.length <= 1) return [array]
      return array.flatMap((element, index) =>
        permute(array.slice(0, index).concat(array.slice(index + 1))).map(permutation => [element, ...permutation])
      )
    }
  }

  document.getElementById('answer').innerText = maxHappiness
  console.log('The total change in happiness is', maxHappiness)
})
