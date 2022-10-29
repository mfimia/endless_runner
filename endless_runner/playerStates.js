import { CONTROLS, GAME_SPEED, STATES, STATE_NAMES } from './constants.js'
import { Dust, Fire } from './particles.js'

class State {
  constructor(state, game) {
    this.state = state
    this.game = game
  }
}

export class Sitting extends State {
  constructor(game) {
    super(STATE_NAMES.SITTING, game)
  }
  enter() {
    // set up state conditions
    this.game.player.frameX = 0
    this.game.player.maxFrame = 4
    this.game.player.frameY = 5
  }
  handleInput(input) {
    // define input-based operations
    if (input.includes(CONTROLS.ARROW_LEFT) || input.includes(CONTROLS.ARROW_RIGHT)) this.game.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.game.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Running extends State {
  constructor(game) {
    super(STATE_NAMES.RUNNING, game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 8
    this.game.player.frameY = 3
  }
  handleInput(input) {
    this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
    if (input.includes(CONTROLS.ARROW_DOWN)) this.game.player.setState(STATES.SITTING, GAME_SPEED.PAUSED)
    else if (input.includes(CONTROLS.ARROW_UP)) this.game.player.setState(STATES.JUMPING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.game.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Jumping extends State {
  constructor(game) {
    super(STATE_NAMES.JUMPING, game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    if (this.game.player.onGround()) this.game.player.vy -= this.game.player.jumpPower
    this.game.player.frameY = 1
  }
  handleInput(input) {
    if (this.game.player.vy > this.game.player.weight) this.game.player.setState(STATES.FALLING, GAME_SPEED.NORMAL)
    else if (input.includes(CONTROLS.ROLL)) this.game.player.setState(STATES.ROLLING, GAME_SPEED.FAST)
  }
}

export class Falling extends State {
  constructor(game) {
    super(STATE_NAMES.FALLING, game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 2
  }
  handleInput(input) {
    if (this.game.player.onGround()) this.game.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
  }
}

export class Rolling extends State {
  constructor(game) {
    super(STATE_NAMES.ROLLING, game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
  }
  handleInput(input) {
    this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))
    if (!input.includes(CONTROLS.ROLL) && this.game.player.onGround()) {
      this.game.player.setState(STATES.RUNNING, GAME_SPEED.NORMAL)
    } else if (!input.includes(CONTROLS.ROLL) && !this.game.player.onGround()) {
      this.game.player.setState(STATES.FALLING, GAME_SPEED.NORMAL)
    } else if (input.includes(CONTROLS.ROLL) && input.includes(CONTROLS.ARROW_UP) && this.game.player.onGround()) this.game.player.vy -= 27
  }
}
