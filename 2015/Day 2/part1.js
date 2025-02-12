'use strict'
const file = document.getElementById('input')

file.addEventListener('change', (event) => {
  const fileText = event.target.files[0]
  const reader = new FileReader()
  reader.readAsText(fileText)
  reader.onload = (load) => {
    const puzzleInput = load.target.result

    // -----------------------------------------------------------------------------------------
    // Day 2 Part 1: 1606483 (https://adventofcode.com/2015)
    const presentDimensions = puzzleInput.split('\n')
    let totalsqft = 0

    for (const currentDimension of presentDimensions) {

      // Use regular expression to find Length, Width, and Height
      const [L, W, H] = currentDimension.match(/\d{1,2}/g).map(Number)
      
      const extraLength = Math.min(L * W, W * H, H * L)
      const surfaceArea = 2 * (L * W + W * H + H * L)
      
      totalsqft += surfaceArea + extraLength
    }
    console.log('Total feet of ribbon needed:', totalsqft)
    // -----------------------------------------------------------------------------------------
  }
})
