import { BOUNDARIES, GAME_SPEED, RECOMMENDED_SETTINGS } from "./constants.js"
import InputHandler from "./input.js"
import { Player } from "./player.js"
import { Background } from './background.js'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor (width, height) {
      this.width = width
      this.height = height
      this.groundMargin = BOUNDARIES.GROUND
      this.speed = GAME_SPEED.PAUSED // pixels per frame
      this.maxSpeed = RECOMMENDED_SETTINGS.MAX_SPEED
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler()
    }
    update (deltaTime) {
      this.background.update()
      this.player.update(this.input.keys, deltaTime)
    }
    draw (context) {
      this.background.draw(context) // background drawn behind player
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)

  let lastTime = 0

  const animate = (timestamp) => {
    const deltaTime = timestamp - lastTime // how long it takes to serve a frame
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update(deltaTime)
    requestAnimationFrame(animate)
  }
  animate(0)
})