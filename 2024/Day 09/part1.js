'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 9 Part 1 answer: 6607511583593

  const inputArray = puzzleInput.split('').map(Number)
  const disk = []
  let checksum = 0

  inputArray.forEach((blockSize, index) => {
    if (index % 2 === 0) { // For even (every other) index push the index number 'blockSize' times to disk
      for (let i = 0; i < blockSize; i++) {
        disk.push(Math.floor(index / 2)) // index needs to increment one at a time instead of every other
      }
    }
    else { // For odd (every other) index push '.' 'blockSize' times to disk
      for (let i = 0; i < blockSize; i++) disk.push('.')
    }
  })

  // Loop until there no more '.' characters/elements in the disk array
  while (disk.indexOf('.') !== -1) {
    if (disk[disk.length - 1] === '.') { // If the last element is '.' remove it and continue
      disk.pop()
      continue
    }
    const nextOpenSpaceIndex = disk.indexOf('.')
    disk[nextOpenSpaceIndex] = disk[disk.length - 1] // Copy last element (guaranteed digit) to next open space
    disk.pop() // Remove last element/digit
  }

  // Calculate checksum
  disk.forEach((index, fileIdNumber) => {
    checksum += index * fileIdNumber
  })

  document.getElementById('answer').innerText = checksum
  console.log('The filesystem checksum is', checksum)
})
