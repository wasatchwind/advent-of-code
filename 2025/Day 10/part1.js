"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 10 Part 1 answer: 477

  const rawMachineData = puzzleInput.trim().split("\n"); // Split input into lines (machines)
  const machines = rawMachineData.map(parseMachine);     // Parse each machine into structured data

  let minPressesSum = 0;

  // Process each machine starting with all lights off (all lights ".")
  for (const machine of machines) {
    const start = Array(machine.lightsTarget.length).fill(".");
    minPressesSum += minPresses(start, machine.lightsTarget, machine.buttons);
  }

  // Function uses RegEx to parse variable data per machine into an object with target pattern and possible buttons
  function parseMachine(machine) {
    const lightsTarget = Array.from(machine.match(/[#\.]/g));

    const buttonMatches = machine.match(/\(([^)]+)\)/g);
    const buttons = buttonMatches.map(button => button.slice(1, -1).split(',').map(Number));

    return { lightsTarget, buttons };
  }

  // Returns a new light pattern after applying a button
  function toggleArray(pattern, button) {
    const newPattern = [...pattern]; // Copy to ensure the original pattern isn't mutated

    for (const idx of button) {
      newPattern[idx] = newPattern[idx] === "." ? "#" : ".";
    }

    return newPattern;
  }

  // Uses BFS (Breadth First Search) to find the minimum number of button presses
  // Each state is a light pattern, each edge is pressing one button
  function minPresses(startArr, targetArr, buttons) {
    const visited = new Set();
    const targetKey = targetArr.join("");

    // Queue entries: [patternArray, patternKey, presses]
    const queue = [[startArr, startArr.join(""), 0]];

    while (queue.length > 0) {
      const [pattern, key, presses] = queue.shift();

      if (key === targetKey) return presses; // Target reached
      if (visited.has(key)) continue;
      visited.add(key);

      // Try pressing each button once
      for (const button of buttons) {
        const nextPattern = toggleArray(pattern, button);
        const nextKey = nextPattern.join("");
        queue.push([nextPattern, nextKey, presses + 1]);
      }
    }
  }

  document.getElementById("answer").innerText = minPressesSum;
  console.log("The fewest button presses is:", minPressesSum);
});
