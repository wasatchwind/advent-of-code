"use strict";
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener("puzzleInputLoaded", () => {

  // Day 8 Part 1 answer: 98696

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
  pairs = pairs.slice(0, 1000); // Only keep the first 1,000 closest pairs (of 499,500)

  // Loop through the 1,000 closest pairs already in ascending order
  for (let i = 0; i < 1000; i++) {

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

      // Handle merging circuits when both boxes are in circuits but different circuits
      if (typeof inACircuit === "object") mergeCircuits(inACircuit);
    } else {

      // Handle null case (neither of the pair of boxes has a circuit) creating a new circuit
      pairs[i].circuit = Math.max(...pairs.map(pair => pair.circuit)) + 1;
    }
  }

  const circuitBoxSets = {}; // For grouping boxes in the same circuit into sets

  for (const pair of pairs) {
    const circuit = pair.circuit;

    if (!circuitBoxSets[circuit]) circuitBoxSets[circuit] = new Set();

    circuitBoxSets[circuit].add(pair.box1);
    circuitBoxSets[circuit].add(pair.box2);
  }

  // Calculate the top 3 and multiply them together to get the answer
  const top3 = Object.values(circuitBoxSets).map(set => set.size).sort((a, b) => b - a).slice(0, 3);
  const answer = top3.reduce((accumulator, number) => accumulator * number, 1);

  // Functions

  // Check each Box in a pair to see if neither, either, or both are already in a circuit
  function alreadyInACircuit([box1, box2]) {
    let box1Circuit = pairs.find(pair => pair.circuit && (pair.box1 === box1 || pair.box2 === box1));
    let box2Circuit = pairs.find(pair => pair.circuit && (pair.box1 === box2 || pair.box2 === box2));
    box1Circuit = box1Circuit ? box1Circuit.circuit : null;
    box2Circuit = box2Circuit ? box2Circuit.circuit : null;

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
    const circuit1Group = pairs.filter(pair => pair.circuit === circuit1);
    const circuit2Group = pairs.filter(pair => pair.circuit === circuit2);

    const smallerGroup = circuit1Group.length < circuit2Group.length ? circuit1 : circuit2;
    const largerGroup = smallerGroup === circuit1 ? circuit2 : circuit1;

    pairs.forEach(pair => {
      if (pair.circuit === smallerGroup) pair.circuit = largerGroup;
    })
  }

  // Calculate 3D distance between Boxes
  function calculateDistance3D(box1, box2) {
    const dx = box1[0] - box2[0];
    const dy = box1[1] - box2[1];
    const dz = box1[2] - box2[2];
    return Math.hypot(dx, dy, dz);
  }

  document.getElementById("answer").innerText = answer;
  console.log("Multiplying the sizes of the 3 largest circuits yields:", answer);
});
