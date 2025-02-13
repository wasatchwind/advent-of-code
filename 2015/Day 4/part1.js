'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 4 Part 1 answer: 254575
  // NOTE! Must enable CryptoJS in the HTML file:
  // <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  
  let md5Hash = ''
  let counter = -1 // -1 since counter is immediately incremented in the while loop

  // Continue loop until the first (lowest) positive number is found that produces the hash when combined with the key (input)
  while (md5Hash.slice(0, 5) !== '00000') {
    counter++
    md5Hash = CryptoJS.MD5(puzzleInput + counter).toString()
  }
  console.log('The lowest positive number is', counter)
  document.getElementById('answer').innerText = counter
})
