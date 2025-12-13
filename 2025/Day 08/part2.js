"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 8 Part 2 answer: 2245203960

  // Parse input into an array of coordinate arrays for each box
  const boxes = puzzleInput.trim().split("\n").map(line => line.split(",").map(Number));
  let pairs = []; // Array to hold objects for each pair of boxes

  // Loop through all boxes to find all possible unique pairs and calculate the 3D distance of each pair
  for (let box1 = 0; box1 < boxes.length; box1++) {
    for (let box2 = box1 + 1; box2 < boxes.length; box2++) {
      pairs.push({ box1, box2, distance: calculateDistance3D(boxes[box1], boxes[box2]), circuit: null });
    }
  }
  pairs.sort((a, b) => a.distance - b.distance); // Sort pairs ascending order

  // For Part 2
  const boxToCircuit = new Map();
  const allBoxes = new Set();
  let answer;

  // Loop through all pairs until all 1,000 boxes are in a circuit
  for (let i = 0; i < pairs.length; i++) {

    // Check if pair is already in a circuit
    // InACircuit is:
    // null if neither box is in circuit,
    // a circuit number if only one of the 2 is in a circuit,
    // a 2 element array of each circuit if both boxes are in a circuit but different circuits
    const inACircuit = alreadyInACircuit([pairs[i].box1, pairs[i].box2]);

    if (inACircuit) { // When circuit is not null

      // Assign the pair the circuit number or lower of the 2 elements if both boxes are in different circuits
      const circuit = typeof inACircuit === "number" ? inACircuit : Math.min(...inACircuit);
      pairs[i].circuit = circuit;

      // Update Map (Part 2)
      boxToCircuit.set(pairs[i].box1, circuit);
      boxToCircuit.set(pairs[i].box2, circuit);

      if (typeof inACircuit === "object") mergeCircuits(inACircuit);
    } else {

      // Handle null case (neither of the pair of boxes has a ciruit) creating a new circuit
      const nextCircuit = Math.max(0, ...boxToCircuit.values()) + 1;
      pairs[i].circuit = nextCircuit;

      // Update Map (Part 2)
      boxToCircuit.set(pairs[i].box1, nextCircuit);
      boxToCircuit.set(pairs[i].box2, nextCircuit);
    }

    // Add boxes that have a circuit to the Set
    allBoxes.add(pairs[i].box1);
    allBoxes.add(pairs[i].box2);

    // when there are the same number of boxes in a circuit as there are total boxes, calculate the answer and exit the loop
    if (allBoxes.size === boxes.length) {
      answer = boxes[pairs[i].box1][0] * boxes[pairs[i].box2][0];
      break;
    }
  }

  // Functions

  // Check each Box in a pair to see if neither, either, or both are already in a circuit
  function alreadyInACircuit([box1, box2]) {

    // ?? nullish coalescing operator returns right hand operand only if left is null or undefined
    const box1Circuit = boxToCircuit.get(box1) ?? null;
    const box2Circuit = boxToCircuit.get(box2) ?? null;

    if (box1Circuit && !box2Circuit) return box1Circuit; // Box 1 in circuit, Box 2 is not
    if (!box1Circuit && box2Circuit) return box2Circuit; // Box 1 not in circuit, Box 2 is

    // Both Boxes in same circuit (returns circuit number) or neither in a circuit (returns null)
    if (box1Circuit === box2Circuit) return box1Circuit;

    // Both Boxes in a circuit but different circuits (will need to merge)
    return [box1Circuit, box2Circuit];
  }

  // When each Box of a pair is already in a circuit but different circuits
  // Force the group with fewer Boxes to the same circuit as the larger group
  function mergeCircuits([circuit1, circuit2]) {
    const keep = Math.min(circuit1, circuit2);
    const drop = Math.max(circuit1, circuit2);

    for (const [box, circuit] of boxToCircuit.entries()) {
      if (circuit === drop) {
        boxToCircuit.set(box, keep);
      }
    }
  }

  // Calculate 3D distance between Boxes
  function calculateDistance3D(box1, box2) {
    const dx = box1[0] - box2[0];
    const dy = box1[1] - box2[1];
    const dz = box1[2] - box2[2];
    return Math.hypot(dx, dy, dz);
  }

  document.getElementById("answer").innerText = answer;
  console.log("Multiplying the X coordinates of the last two junction boxes yields:", answer);
});
