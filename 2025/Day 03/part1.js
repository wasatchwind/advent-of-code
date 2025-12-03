'use strict';
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 1 answer: 17087

  // Parse input into usable data
  const banks = puzzleInput.split("\n").map(line => line.trim());

  let sum = 0;

  banks.forEach((bank) => {
    bank = bank.split("").map(Number);            // Split bank into array of numeric batteries
    const lastDigit = Number(bank.slice(-1));     // Identify last digit since it can't be the highest
    bank.pop();                                   // Remove last digit from array of batteries
    const batt1 = Math.max(...bank);              // Max charge (tens place) is the maximum of all batteries
    bank.push(lastDigit);                         // Add the last battery back to the end of the bank
    bank = bank.slice(bank.indexOf(batt1) + 1);   // Split the bank at the first instance of the highest value
    const batt2 = Math.max(...bank);              // Second value (ones place) is the maximum of digits remaining
    sum += Number(String(batt1) + String(batt2)); // Add to sum the value of the combined batt1 and batt2 charges
  });

  document.getElementById("answer").innerText = sum;
  console.log("Total joltage output is", sum);
});
