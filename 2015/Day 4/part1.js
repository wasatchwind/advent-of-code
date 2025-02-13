'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 4 Part 1 answer: 254575
  // NOTE! Must enable CryptoJS in the HTML file:
  // <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  
  let md5Hash = ''
  let counter = -1 // -1 since counter is immedated incremented in the while loop

  // Continue looping until the first hash beginning with five zeros is found
  while (md5Hash.slice(0, 5) !== '00000') {
    counter++
    md5Hash = CryptoJS.MD5(puzzleInput + counter).toString()
  }
  console.log('The first hash starting with five zeros is', counter)
  document.getElementById('answer').innerText = counter
})
