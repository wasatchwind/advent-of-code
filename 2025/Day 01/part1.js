'use strict';
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 1 Part 1 answer: 1152

  const moves = puzzleInput
    .trim()
    .split("\n")
    .map(line => {
      const [, direction, num] = line.match(/([LR])(\d+)/); // Extract "L" or "R" and number
      return { direction, distance: Number(num) % 100 };    // If triple digit, remove first digit since each 100 repeats the loop
    });

  let dialPosition = 50;
  let zeroCounter = 0;

  const mod100 = n => ((n % 100) + 100) % 100; // Force dialPosition to a possible dial value (0 to 99)

  for (const { direction, distance } of moves) {
    dialPosition = direction === "L"
      ? mod100(dialPosition - distance)  // Rotate dial left
      : mod100(dialPosition + distance); // Rotate dial right

    if (dialPosition === 0) zeroCounter++;
  }

  document.getElementById("answer").innerText = zeroCounter
  console.log("The actual password is", zeroCounter);
});
