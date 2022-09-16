import { STATES, STATE_NAMES } from './constants.js'

class State {
  constructor (state) {
    this.state = state
  }
}

export class Sitting extends State {
  constructor (player) {
    super(STATE_NAMES.SITTING)
    this.player = player
  }
  enter () {
    // set up state conditions
    this.player.frameY = 5
  }
  handleInput (input) {
    // define input-based operations
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) this.player.setState(STATES.RUNNING)
  }
}

export class Running extends State {
  constructor (player) {
    super(STATE_NAMES.RUNNING)
    this.player = player
  }
  enter () {
    this.player.frameY = 3
  }
  handleInput (input) {
    if (input.includes('ArrowDown')) this.player.setState(STATES.SITTING)
    else if (input.includes('ArrowUp')) this.player.setState(STATES.JUMPING)
  }
}

export class Jumping extends State {
  constructor (player) {
    super(STATE_NAMES.JUMPING)
    this.player = player
  }
  enter () {
    if (this.player.onGround()) this.player.vy -= this.player.jumpPower
    this.player.frameY = 1
  }
  handleInput (input) {
    if (this.player.vy > this.player.weight) this.player.setState(STATES.FALLING)
  }
}

export class Falling extends State {
  constructor (player) {
    super(STATE_NAMES.FALLING)
    this.player = player
  }
  enter () {
    this.player.frameY = 2
  }
  handleInput (input) {
    if (this.player.onGround()) this.player.setState(STATES.RUNNING)
  }
}
