'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 21 Part 2 answer: 158

  // Construct boss stats from puzzle input
  const bossStats = puzzleInput.split('\n')
  const perBattleCost = []
  
  const boss = {
    'HP': Number(bossStats[0].match(/\d.+/)[0]),
    'Damage': Number(bossStats[1].match(/\d/)[0]),
    'Armor': Number(bossStats[2].match(/\d/)[0])
  }

  const player = {
    'HP': 100,
    'Damage': 0,
    'Armor': 0,
    'Ring1': null,
    'Ring2': null
  }

  const shop = {
    'Weapons': {
      'Dagger': {
        'Cost': 8,
        'Damage': 4,
        'Armor': 0
      },
      'Shortsword': {
        'Cost': 10,
        'Damage': 5,
        'Armor': 0
      },
      'Warhammer': {
        'Cost': 25,
        'Damage': 6,
        'Armor': 0
      },
      'Longsword': {
        'Cost': 40,
        'Damage': 7,
        'Armor': 0
      },
      'Greataxe': {
        'Cost': 74,
        'Damage': 8,
        'Armor': 0
      },
    },
    'Armor': {
      'Leather': {
        'Cost': 13,
        'Damage': 0,
        'Armor': 1
      },
      'Chainmail': {
        'Cost': 31,
        'Damage': 0,
        'Armor': 2
      },
      'Splintmail': {
        'Cost': 53,
        'Damage': 0,
        'Armor': 3
      },
      'Bandedmail': {
        'Cost': 75,
        'Damage': 0,
        'Armor': 4
      },
      'Platemail': {
        'Cost': 102,
        'Damage': 0,
        'Armor': 5
      },
      'Empty': { // Armor optional (Empty)
        'Cost': 0,
        'Damage': 0,
        'Armor': 0
      },
    },
    'Rings': {
      'Damage1': {
        'Cost': 25,
        'Damage': 1,
        'Armor': 0
      },
      'Damage2': {
        'Cost': 50,
        'Damage': 2,
        'Armor': 0
      },
      'Damage3': {
        'Cost': 100,
        'Damage': 3,
        'Armor': 0
      },
      'Armor1': {
        'Cost': 20,
        'Damage': 0,
        'Armor': 1
      },
      'Armor2': {
        'Cost': 40,
        'Damage': 0,
        'Armor': 2
      },
      'Armor3': {
        'Cost': 80,
        'Damage': 0,
        'Armor': 3
      },
      'Empty': { // Rings optional (Empty)
        'Cost': 0,
        'Damage': 0,
        'Armor': 0
      }
    }
  }

  // Nested loops to traverse all combos of equipped items
  for (const weapon of Object.keys(shop.Weapons)) {
    for (const armor of Object.keys(shop.Armor)) {
      for (const ring1 of Object.keys(shop.Rings)) {
        for (const ring2 of Object.keys(shop.Rings)) {
          if (ring1 !== ring2) { // Ensure rings are not duplicated
            player.Damage = shop.Weapons[weapon].Damage
            player.Armor = shop.Armor[armor].Armor
            player.Ring1 = shop.Rings[ring1]
            player.Ring2 = shop.Rings[ring2]
            const totalCost = shop.Weapons[weapon].Cost + shop.Armor[armor].Cost + shop.Rings[ring1].Cost + shop.Rings[ring2].Cost
            
            const winner = battle()
            if (winner === 'boss') perBattleCost.push(totalCost) // Part 2: change winner to boss

            // Reset HP for next battle
            boss.HP = Number(bossStats[0].match(/\d.+/)[0])
            player.HP = 100
          }
        }
      }
    }
  }

  // Function to simulate alternating turns until the battle has a winner
  function battle() {
    while (true) {
      playerTurn()
      if (boss.HP <= 0) return 'player'
      bossTurn()
      if (player.HP <= 0) return 'boss'
    }

    // Helper function to execute player damage to boss
    function playerTurn() {
      let damage = player.Damage
      if (player.Ring1) damage += player.Ring1.Damage
      if (player.Ring2) damage += player.Ring2.Damage
      damage = damage - boss.Armor > 1 ? damage - boss.Armor : 1 // Min damage always at least 1
      boss.HP -= damage
    }

    // Helper function to execute boss damage to player
    function bossTurn() {
      let armor = player.Armor
      if (player.Ring1) armor += player.Ring1.Armor
      if (player.Ring2) armor += player.Ring2.Armor
      const damage = boss.Damage - armor > 1 ? boss.Damage - armor : 1 // Min damage always at least 1
      player.HP -= damage
    }
  }

  // Part 2: find the max instead of the min
  document.getElementById('answer').innerText = Math.max(...perBattleCost)
  console.log('The least amount of gold for a win is', Math.max(...perBattleCost))
})
