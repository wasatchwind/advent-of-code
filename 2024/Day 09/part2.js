'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 9 Part 2 answer: 6636608781232

  // Split puzzle input text into an array of numbers
  const inputArray = puzzleInput.split('').map(Number)
  const disk = []
  let checksum = 0
  
  // Format puzzle input into individual file blocks
  let blockId = 0
  for (let i = 0; i < inputArray.length; i += 2) { // Every other (even) indices are file ids
    disk.push(...Array(inputArray[i]).fill(blockId++))  // File id block
    if (i + 1 < inputArray.length) disk.push(...Array(inputArray[i + 1]).fill('.'))  // Empty space
  }

  // blockId was incremented to one more than the highest file id in generation of disk
  let fileIdNumber = blockId - 1
  
  // Loop through descending file ids until file id 0
  while (fileIdNumber >= 0) {
    let fileStartIndex
    let fileEndIndex
  
    // Find file block start and end indices
    for (let i = 0; i < disk.length; i++) {
      if (disk[i] === fileIdNumber) {
        fileStartIndex = i
        // When start index found, continue incrementing index until end of block found
        while (disk[i] === fileIdNumber) i++
        fileEndIndex = i
        break
      }
    }
  
    const fileLength = fileEndIndex - fileStartIndex
    let destinationIndex = -1
    let emptyCount = 0
  
    // Find available space to move the file (if available)
    for (let i = 0; i < fileStartIndex; i++) {
      if (disk[i] === '.') emptyCount++
      else emptyCount = 0
  
      if (emptyCount === fileLength) { // Space found to fit the file
        destinationIndex = i - fileLength + 1 // Set desination index
        break
      }
    }
  
    // No space found; leave file as is and move on to the next file id
    if (destinationIndex === -1) {
      fileIdNumber--
      continue
    }
  
    // Move file to destination index, replace previous location with '.'
    for (let i = 0; i < fileLength; i++) {
      disk[destinationIndex + i] = fileIdNumber
      disk[fileStartIndex + i] = '.'
    }
  
    fileIdNumber--
  }
  
  // Calculate checksum
  for (let i = 0; i < disk.length; i++) {
    if (Number.isInteger(disk[i])) checksum += disk[i] * i
  }
  
  document.getElementById('answer').innerText = checksum
  console.log('The filesystem checksum is', checksum)
})
