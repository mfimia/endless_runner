import InputHandler from "./input.js"
import { Player } from "./player.js"

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor (width, height) {
      this.width = width
      this.height = height
      this.player = new Player(this)
      this.input = new InputHandler()
    }
    update () {
      this.player.update()
    }
    draw (context) {
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)


  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update()
    requestAnimationFrame(animate)
  }
  animate()
})