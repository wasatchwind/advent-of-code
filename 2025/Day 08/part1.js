"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 8 Part 1 answer: 98696

  // Parse input into an array of coordinate arrays for each box
  const boxes = puzzleInput.trim().split("\n").map(line => line.split(",").map(Number));
  const boxCount = boxes.length;
  const pairLimit = 1000;

  let answer;

  // Step 1: Loop through all possible pairs and calculate each pair's distance
  // Only 1,000 are needed but there are 499,500 unique pairs
  let pairs = [];
  for (let box1 = 0; box1 < boxes.length; box1++) {
    for (let box2 = box1 + 1; box2 < boxes.length; box2++) {
      pairs.push({ box1, box2, distance: calculateDistance3D(boxes[box1], boxes[box2]) });
    }
  }
  pairs.sort((a, b) => a.distance - b.distance); // Sort pairs by ascending distance
  pairs = pairs.slice(0, pairLimit);             // Only keep the closest 1,000 pairs

  // Step 2: Get ready to find unions
  const parent = Array.from({ length: boxCount }, (_, box1) => box1); // parent[i] is the root/leader of box i's circuit
  const touched = Array(boxCount).fill(false);                        // touched[i] is true if box i is one of the first 1,000 closest

  // Step 3: Process the 1,000 closest pairs (merge circuits)
  for (let i = 0; i < pairLimit; i++) {
    const { box1, box2 } = pairs[i];
    touched[box1] = true;
    touched[box2] = true;
    joinToCircuit(box1, box2);
  }

  // Step 4: Group boxes by their root leader
  const rootToMembers = new Map();

  for (let i = 0; i < boxCount; i++) {
    if (!touched[i]) continue;

    const root = findRoot(i);

    if (!rootToMembers.has(root)) rootToMembers.set(root, []);
    rootToMembers.get(root).push(i);
  }

  // Step 5: Assign circuit numbers in the order they appear
  const rootToCircuit = new Map();
  let nextCircuit = 1;

  for (let i = 0; i < pairLimit; i++) {
    const root = findRoot(pairs[i].box1);
    if (!rootToCircuit.has(root)) {
      rootToCircuit.set(root, nextCircuit++);
    }
  }

  // Step 6: Build final circuit mapping (circuitOf[boxIndex] = circuit number)
  const circuitOf = {};

  for (const [root, members] of rootToMembers.entries()) {
    const circuitNum = rootToCircuit.get(root);
    for (const index of members) {
      circuitOf[index] = circuitNum;
    }
  }

  // Group boxes by circuit for final analysis
  const circuits = {};
  for (const [indexString, circuitNum] of Object.entries(circuitOf)) {
    const index = Number(indexString);
    if (!circuits[circuitNum]) circuits[circuitNum] = [];
    circuits[circuitNum].push(boxes[index]);
  }

  // Step 7: Analyze data to calculate the final answer
  const circuitSizes = Object.values(circuits).map(list => list.length).sort((a, b) => b - a);
  const largest3 = circuitSizes.slice(0, 3);
  answer = largest3[0] * largest3[1] * largest3[2];

  // Functions:
  // Calculates 3D distance using built in JS hypotenuse Math function
  function calculateDistance3D(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return Math.hypot(dx, dy, dz);
  }

  // Merge two circuit groups
  function joinToCircuit(a, b) {
    const rootA = findRoot(a);
    const rootB = findRoot(b);
    if (rootA !== rootB) parent[rootB] = rootA; // Make A the leader/parent for both branches
  }

  // Find the root leader/parent of a circuit group
  function findRoot(box) {
    while (parent[box] !== box) {
      parent[box] = parent[parent[box]];
      box = parent[box];
    }
    return box;
  }

  document.getElementById("answer").innerText = answer;
  console.log("Multiplying the sizes of the 3 largest circuits yields:", answer);
});
