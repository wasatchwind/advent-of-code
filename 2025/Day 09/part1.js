"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 9 Part 1 answer: 4733727792

  // Parse input into an array of 2D coordinate arrays
  const coords = puzzleInput.trim().split("\n").map(line => line.split(",").map(Number));
  let maxArea = 0;

  // Loop through all pair combos since only pairs are necessary to determine a rectangle (opposing corners)
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const rect = [coords[i], coords[j]];
      const area = rectArea(rect);

      if (area > maxArea) maxArea = area;
    }
  }

  function rectArea([[x1, y1], [x2, y2]]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }

  document.getElementById("answer").innerText = maxArea;
  console.log("The largest area of any possible rectangle is:", maxArea);
});
