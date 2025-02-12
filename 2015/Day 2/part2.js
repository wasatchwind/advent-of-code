file.addEventListener('change', (event) => {
  const fileText = event.target.files[0]
  const reader = new FileReader()
  reader.readAsText(fileText)
  reader.onload = (load) => {
    const puzzleInput = load.target.result

    // -----------------------------------------------------------------------------------------
    // Day 2 Part 2: 3842356 (https://adventofcode.com/2015)
    const presentDimensions = puzzleInput.split('\n')
    let totalsqft = 0

    for (const currentDimension of presentDimensions) {

      // Use regular expression to find Length, Width, and Height
      const [L, W, H] = currentDimension.match(/\d{1,2}/g).map(Number)
      
      // Set smallest to largest via sort() but only keep the first 2 (omit the largest)
      const [smallest, secondSmallest] = [L, W, H].sort((a, b) => a - b)
      
      const ribbon = 2 * (smallest + secondSmallest)
      const bow = L * W * H
      
      totalsqft += ribbon + bow
    }
    console.log('Total feet of ribbon needed:', totalsqft)
    // -----------------------------------------------------------------------------------------
  }
})
