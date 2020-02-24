let previousHealth = 20
const minHealth = 13
let currentDirection = 'backward'
let doWeFaceEnemy = false
let isRested = false
let iAmResting = false

class Player {
  beingAttacked(warrior) {
    return previousHealth > warrior.health()
  }

  needsRest(warrior) {
    if (warrior.health() < minHealth) {
      iAmResting = true
      return true
    }

    if (warrior.health() >= warrior.maxHealth()) {
      iAmResting = false
      return false
    }

    if (iAmResting) {
      return true
    }

    return false
  }

  actToDirection(warrior, direction) {
    warrior.think(isRested)
    if (warrior.feel(direction).isEmpty()) {
      if (this.needsRest(warrior)) {
        if (this.beingAttacked(warrior)) {
          warrior.walk(this.getOppositeDirection(direction))
        } else {
          warrior.rest()
        }
      } else {
        warrior.walk(direction)
      }
    } else {
      if (
        warrior
          .feel(direction)
          .getUnit()
          .isEnemy()
      ) {
        warrior.attack(direction)
      } else {
        warrior.rescue(direction)
      }
    }
    previousHealth = warrior.health()
  }

  playTurn(warrior) {
    //warrior.think(warrior.maxHealth())
    //warrior.think(warrior.feel(currentDirection))
    this.actToDirection(warrior, this.getDirection(warrior))
  }

  getDirection(warrior) {
    if (
      currentDirection !== 'forward' &&
      warrior.feel(currentDirection).isWall()
    ) {
      currentDirection = 'forward'
    }

    return currentDirection
  }

  getOppositeDirection(direction) {
    return direction === 'forward' ? 'backward' : 'forward'
  }
}
