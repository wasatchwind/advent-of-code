"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 9 Part 2 answer: 1566346198

  // Parse input into an array of 2D coordinate arrays
  const coords = puzzleInput.trim().split("\n").map(line => line.split(",").map(Number));
  let maxArea = 0;

  // Build polygon edges - rectangles that cross the edges are necessarily invalid
  const edges = coords.map((p, i) => [coords[(i - 1 + coords.length) % coords.length], p]);

  // Loop through all pair combos since only pairs are necessary to determine a rectangle (opposing corners)
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const rect = [coords[i], coords[j]];
      const area = rectArea(rect);

      if (area <= maxArea) continue; // Skip smaller rectangles for efficiency

      if (!intersects(rect, edges)) maxArea = area; // Rectangle is valid, record area in maxArea
    }
  }

  function rectArea([[x1, y1], [x2, y2]]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }

  // Checks if rectangle is invalid:
  // 1) A polygon vertex is inside it - means some of the rectangle must be outside the polygon
  // 2) A polygon edge crosses into it - same as above
  // Touching edges or vertices is allowed (inclusive)
  function intersects(rect, edges) {
    const [[x1, y1], [x2, y2]] = rect;

    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);

    for (const [[ex1, ey1], [ex2, ey2]] of edges) {

      // Rectangle is invalid if a polygon vertex is strictly inside it
      if (ex1 > xMin && ex1 < xMax && ey1 > yMin && ey1 < yMax) return true;

      if (ex1 === ex2) { // Vertical edge
        // Edge crosses rectangle horizontally and overlaps vertically
        if (ex1 > xMin && ex1 < xMax && Math.max(ey1, ey2) > yMin && Math.min(ey1, ey2) < yMax) return true;
      } else { // Horizontal edge
        // Edge crosses rectangle vertically and overlaps horizontally
        if (ey1 > yMin && ey1 < yMax && Math.max(ex1, ex2) > xMin && Math.min(ex1, ex2) < xMax) return true;
      }
    }

    // No invalid intersetions found (invalidity check is false)
    return false;
  }

  document.getElementById("answer").innerText = maxArea;
  console.log("The largest area of any possible rectangle is:", maxArea);
});
