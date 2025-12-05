"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 1 Part 2 answer: 6671

  const moves = puzzleInput
    .trim()
    .split("\n")
    .map(line => {
      const [, direction, num] = line.match(/([LR])(\d+)/); // Extract "L" or "R" and number
      return { direction, distance: Number(num) };
    });

  let dialPosition = 50, zeroCounter = 0;

  for (const { direction, distance } of moves) {
    zeroCounter += Math.floor(distance / 100); // Count zero positions for distances with more than 1 full revolution

    const mod100 = n => ((n % 100) + 100) % 100; // Force dial position to a real dial value (0 to 99)
    const partial = distance % 100;
    const newPosition = direction === "L" ? dialPosition - partial : dialPosition + partial;
    const zeroExact = direction === "L" ? 0 : 100;
    const zeroCrossed = direction === "L" ? newPosition < 0 : newPosition > 100;

    if (newPosition === zeroExact) dialPosition = 0;
    else {
      if (zeroCrossed && dialPosition !== 0) zeroCounter++; // Count times zero position is crossed on the dial
      dialPosition = mod100(newPosition);
    }

    if (dialPosition === 0) zeroCounter++; // Count zero positions for when the dial lands exactly on zero
  }

  document.getElementById("answer").innerText = zeroCounter
  console.log("The password is", zeroCounter);
});
