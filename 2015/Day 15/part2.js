'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 15 Part 2 answer: 1766400

  // Process input text line by line into an array of arrays
  const ingredientDetails = puzzleInput.split('\n').map(line => line.trim()).map(line => line.split(' '))
  const attributes = {}
  const ingredientCount = 100
  let highScore = 0

  // Construct ingredient attributes object
  for (const ingredient of ingredientDetails) {
    attributes[ingredient[0].slice(0, -1)] = {
      'capacity': parseInt(ingredient[2]),
      'durability': parseInt(ingredient[4]),
      'flavor': parseInt(ingredient[6]),
      'texture': parseInt(ingredient[8]),
      'calories': Number(ingredient[10])
    }
  }

  const combinations = createCombinations(ingredientCount)

  for (const cookie of combinations) {
    highScore = cookieScore(cookie)
  }

  // Function to calculate the score of each cookie
  function cookieScore(combo) {
    const ingredients = [...Object.keys(attributes)]

    // Helper function to calculate individual attribute scores
    const calculateAttributeScore = (attribute) => {
      let score = 0
      for (let i = 0; i < ingredients.length; i++) {
        score += combo[i] * attributes[ingredients[i]][attribute]
      }
      return score < 0 ? 0 : score
    }

    const capacity = calculateAttributeScore('capacity')
    const durability = calculateAttributeScore('durability')
    const flavor = calculateAttributeScore('flavor')
    const texture = calculateAttributeScore('texture')

    // Part 2: Add calories; only count score if calories equals 500
    const calories = calculateAttributeScore('calories')

    const currentScore = calories === 500 ? capacity * durability * flavor * texture : 0

    // Only count current score if higher than highest score so far
    return currentScore > highScore ? currentScore : highScore
  }

  // Function to create an array of all possible ingredient combinations
  function createCombinations(total) {
    const combinations = []

    // Nested loop works like an odometer
    for (let a = 1; a <= total; a++) {
      for (let b = 1; b <= total - a; b++) {
        for (let c = 1; c <= total - a - b; c++) {
          const d = total - a - b - c
          if (d > 0) {
            combinations.push([a, b, c, d])
          }
        }
      }
    }
    return combinations
  }
