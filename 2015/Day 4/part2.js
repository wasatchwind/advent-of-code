'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 4 Part 2 answer: 1038736
  // NOTE! Must add this script to the HTML file to enable CryptoJS:
  // <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  
  let md5HashPrefix = ''
  let counter = -1 // -1 since counter is immediately incremented in the while loop

  // Continue loop until the first (lowest) positive number is found that produces the hash when combined with the key (input)
  // Increased speed/efficiency from part 1 by slicing the hash when it's calculated instead of storing the entire hash
  while (md5HashPrefix !== '000000') {
    counter++
    md5HashPrefix = CryptoJS.MD5(puzzleInput + counter).toString().slice(0, 6)
  }
  console.log('The lowest positive number is', counter)
  document.getElementById('answer').innerText = counter
})
