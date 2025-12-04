'use strict';

// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 3 Part 2 answer: 169019504359949

  // Parse input into usable data
  const banks = puzzleInput.split("\n").map(line => line.trim());
  const batteries = [];

  let sum = 0;

  banks.forEach((bank) => {
    bank = bank.split("").map(Number);
    let availableBank, max, capacity = 11; // Actual capacity is 12 but 11 here to include the first digit/battery

    while (capacity >= 0) {
      // When capacity gets to 0, add the the max of the remaining batteries to the final spot in the bank of 12
      if (capacity === 0) {
        batteries.push(Math.max(...bank));
        break;
      }
      availableBank = bank.slice(0, -capacity); // Remove the segment that's impossible due to new capacity of 12
      max = Math.max(...availableBank);         // Find the highest value of what's left
      batteries.push(max);                      // Add max to the bank of batteries
      bank = bank.slice(bank.indexOf(max) + 1); // Remove the batteries preceding the max just found and used
      capacity--;                               // Count down capacity
    }

    sum += Number(batteries.join(""));
    batteries.length = 0; // Reset batter bank for next iteration
  });

  document.getElementById("answer").innerText = sum;
  console.log("The new total joltage output is", sum);
});
