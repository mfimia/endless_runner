import { CONTROLS, GAME_SPEED, STATES, STATE_NAMES } from './constants.js'

class State {
  constructor(state) {
    this.state = state
  }
}

export class Sitting extends State {
  constructor(player) {
    super(STATE_NAMES.SITTING)
    this.player = player
  }
  enter() {
    // set up state conditions
    this.player.frameX = 0
    this.player.maxFrame = 4
    this.player.frameY = 5
  }
  handleInput(input) {
    // define input-based operations
    if (input.includes(CONTROLS.ARROW_LEFT) || input.includes(CONTROLS.ARROW_RIGHT)) this.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Running extends State {
  constructor(player) {
    super(STATE_NAMES.RUNNING)
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 8
    this.player.frameY = 3
  }
  handleInput(input) {
    if (input.includes(CONTROLS.ARROW_DOWN)) this.player.setState(STATES.SITTING, GAME_SPEED.PAUSED)
    else if (input.includes(CONTROLS.ARROW_UP)) this.player.setState(STATES.JUMPING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Jumping extends State {
  constructor(player) {
    super(STATE_NAMES.JUMPING)
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 6
    if (this.player.onGround()) this.player.vy -= this.player.jumpPower
    this.player.frameY = 1
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight) this.player.setState(STATES.FALLING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Falling extends State {
  constructor(player) {
    super(STATE_NAMES.FALLING)
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 2
  }
  handleInput(input) {
    if (this.player.onGround()) this.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
  }
}

export class Rolling extends State {
  constructor(player) {
    super(STATE_NAMES.ROLLING)
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 6
  }
  handleInput(input) {
    if (!input.includes(CONTROLS.ROLL) && this.player.onGround()) {
      this.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
    } else if (!input.includes(CONTROLS.ROLL) && !this.player.onGround()) {
      this.player.setState(STATES.FALLING, GAME_SPEED.NORMAL)
    } else if (input.includes(CONTROLS.ROLL) && input.includes(CONTROLS.ARROW_UP) && this.player.onGround()) this.player.vy -= 27
  }
}
