'use strict'
// Use event listener to execute JS after puzzle input is received via text file
document.addEventListener('puzzleInputLoaded', () => {

  // Day 22 Part 1 answer: 953

  // Get boss stats from puzzle input
  const bossStats = puzzleInput.split('\n')
  const bossHP = Number(bossStats[0].match(/\d.+/)[0])
  const bossDamage = Number(bossStats[1].match(/\d/)[0])

  let minimumMana = Infinity // Infinity for initial comparison
  battle(resetState()) // Begin the battle

  // Function to update battle state each new turn (player and boss)
  // Recursion ensures every possible sequence of valid spells is explorred
  function battle(currentState) {
    spellEffects(currentState) // Apply spell effects at the start of every turn (player and boss)

    if (currentState.bossHP <= 0) { // If boss killed/player wins record mana spent
      updateManaSpent(currentState)
      return
    }

    // In each call to battle() the player attempts to cast spells in order:
    // Drain, Magic Missile, Poison, Recharge, and Shield
    // If a spell cannot be cast due to insufficient mana or being already active it is skipped
    // Since cast() modifies the game state and then calls bossTurn()
    // different spells result in different game states, leading to various possible outcomes

    // Cast Drain (no timer, immediate effect)
    cast(currentState, 'Drain', 73, (newState) => {
      newState.playerHP += 2
      newState.bossHP -= 2
    })
    // Cast Magic Missile (no timer, immediate effect)
    cast(currentState, 'Magic Missile', 53, (newState) => {
      newState.bossHP -= 4
    })
    // Cast Poison
    cast(currentState, 'Poison', 173, (newState) => {
      if (currentState.poisonDuration === 0) newState.poisonDuration = 6 // Reset timer
    })
    // Cast Recharge
    cast(currentState, 'Recharge', 229, (newState) => {
      if (currentState.rechargeDuration === 0) newState.rechargeDuration = 5 // Reset timer
    })
    // Cast Shield
    cast(currentState, 'Shield', 113, (newState) => {
      if (currentState.shieldDuration === 0) newState.shieldDuration = 6 // Reset timer
    })
  }

  // Function to execute active timer-based spell effects and update timer
  function spellEffects(round) {
    // Poison
    if (round.poisonDuration > 0) {
      round.bossHP -= 3
      round.poisonDuration--
    }
    // Recharge
    if (round.rechargeDuration > 0) {
      round.playerMana += 101
      round.rechargeDuration--
    }
    // Shield
    if (round.shieldDuration > 0) {
      round.shieldDuration--
    }
  }

  // Function to cast a spell and update battle state
  // 'applyEffects' is a function that updates battle state
  function cast(currentState, spellName, manaCost, applyEffects) {
    if (currentState.playerMana < manaCost) return // Not enough mana to cast the spell

    const newState = {
      ...currentState,
      playerMana: currentState.playerMana - manaCost,
      manaSpent: currentState.manaSpent + manaCost
    }

    // The first character of each spell name is recorded in 'actions' to track battle sequence
    // D: Drain, M: Magic Missile, P: Poison, R: Recharge, S: Shield
    newState.actions += spellName.charAt(0)

    applyEffects(newState)

    if (newState.bossHP <= 0) { // After state update, if boss killed/player wins record mana spent
      updateManaSpent(newState)
      return
    }

    // After player turn handle boss turn
    bossTurn(newState)
  }

  function bossTurn(currentState) {
    // Recursive pruning: If mana spent exceeds the lowest recorded winning mana, stop the battle
    if (currentState.manaSpent >= minimumMana) return

    spellEffects(currentState) // Apply spell effects at the start of every turn (player and boss)

    if (currentState.bossHP <= 0) { // After spell effects, if boss killed/player wins record mana spent
      updateManaSpent(currentState)
      return
    }

    const shieldDefense = currentState.shieldDuration > 0 ? 7 : 0 // Shield either 7 or 0 based on timer

    currentState.playerHP -= bossDamage - shieldDefense // Boss damage to player
    if (currentState.playerHP > 0) { // If player still alive, resume the battle
      battle(currentState)
    }
  }

  // If battle over, update mana spent if lower than the current recorded minimum
  function updateManaSpent(currentState) {
    if (currentState.manaSpent < minimumMana) {
      minimumMana = currentState.manaSpent
    }
  }

  // Function to reset player, boss, and spells to starting/default status
  function resetState() {
    return {
      actions: '',
      playerHP: 50,
      playerMana: 500,
      manaSpent: 0,
      bossHP: bossHP,
      shieldDuration: 0,
      poisonDuration: 0,
      rechargeDuration: 0
    }
  }

  document.getElementById('answer').innerText = minimumMana
  console.log('The least amount of mana that still wins is', minimumMana)
})
