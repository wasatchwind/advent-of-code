"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 6 Part 1 answer: 6757749566978

  // Parse input into individual lines
  const lines = puzzleInput.split("\n");

  // Extract numbers from each line into an array from all but the last line, which are operators
  for (let i = 0; i < lines.length - 1; i++) {
    lines[i] = lines[i].match(/(\d+)/g).map(line => line.trim()).map(Number);
  }

  // Extract operators from the last line into an array
  lines[lines.length - 1] = lines[lines.length - 1].match(/([+*])/g)

  let grandTotal = 0;

  // Loop through each column of lines
  for (let col = 0; col < lines[0].length; col++) {
    const operator = lines[lines.length - 1][col]; // Operator is always from the last line
    let problemResult = operator === "+" ? 0 : 1;  // For addition set to 0, for multiplication set to 1

    // Loop through each column now row by row
    for (let row = 0; row < lines.length - 1; row++) {
      if (operator === "+") {
        problemResult += lines[row][col];
      } else {
        problemResult *= lines[row][col];
      }
    }
    grandTotal += problemResult;
  }

  document.getElementById("answer").innerText = grandTotal;
  console.log("The grand total of all the answers is:", grandTotal);
});
