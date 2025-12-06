"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 6 Part 2 answer: 10603075273949

  // Parse input into individual lines
  const lines = puzzleInput.split("\n");

  const problemNums = []; // Array to keep track of constructed numbers to be added or multiplied
  let operator = ''; // Either add (+) or multiply (*)
  let grandTotal = 0;

  // Loop through all lines one column at a time
  for (let col = 0; col < lines[0].length; col++) {
    let currentNum = ''; // String to keep track of a number as it's assembled vertically

    // Loop through each row in a given column (col)
    for (let row = 0; row < lines.length; row++) {
      if (Number(lines[row][col])) currentNum += lines[row][col]; // If the character is a number, add it to currentNum

      // Record the operator when it's found
      if (lines[row][col] === "+") operator = "+";
      if (lines[row][col] === "*") operator = "*";
    }

    if (currentNum.length > 0) problemNums.push(Number(currentNum)); // Add the current number to the problemNums array
    else { // Empty currentNum.length signals a blank column and time to perform the calculation
      const problemResult = operator === "+"
        ? problemNums.reduce((total, currentNum) => total + currentNum, 0)  // Addition operation
        : problemNums.reduce((total, currentNum) => total * currentNum, 1); // Multiplication operation

      grandTotal += problemResult;
      problemNums.length = 0; // Reset array for next set of numbers
    }
  }

  document.getElementById("answer").innerText = grandTotal;
  console.log("The grand total of all the answers is:", grandTotal);
});
