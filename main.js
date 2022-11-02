import { BOUNDARIES, ENEMY_RATIO, GAME_SPEED, GAME_SETTINGS } from "./constants.js"
import InputHandler from "./input.js"
import { Player } from "./player.js"
import { Background } from './background.js'
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js"
import { UI } from "./UI.js"

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundMargin = BOUNDARIES.GROUND
      this.speed = GAME_SPEED.PAUSED // pixels per frame
      this.maxSpeed = GAME_SETTINGS.MAX_SPEED
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.enemyTimer = 0
      this.enemyInterval = 1000 // add one enemy per second
      this.debug = false
      this.score = 0
      this.fontColor = 'black'
      this.time = 0
      this.maxTime = GAME_SETTINGS.END_TIME
      this.gameOver = false
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter() // initialize default state
    }
    update(deltaTime) {
      this.time += deltaTime
      if (this.time > this.maxTime) this.gameOver = true
      this.background.update()
      this.player.update(this.input.keys, deltaTime)
      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy()
        this.enemyTimer = 0
      } else this.enemyTimer += deltaTime
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
      })
      // handle particles
      this.particles.forEach((particle, index) => {
        particle.update()
        if (particle.markedForDeletion) this.particles.splice(index, 1)
      })
      if (this.particles.length > GAME_SETTINGS.MAX_PARTICLES)
        this.particles.length = GAME_SETTINGS.MAX_PARTICLES
      // handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime)
        if (collision.markedForDeletion) this.collisions.splice(index, 1)
      })
    }
    draw(context) {
      this.background.draw(context) // background drawn behind player
      this.player.draw(context)
      this.enemies.forEach(enemy => {
        enemy.draw(context)
      })
      this.particles.forEach(particle => {
        particle.draw(context)
      })
      this.collisions.forEach(collision => {
        collision.draw(context)
      })
      this.UI.draw(context)
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < ENEMY_RATIO.PLANT) this.enemies.push(new GroundEnemy(this))
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
      this.enemies.push(new FlyingEnemy(this))
    }
  }

  const game = new Game(canvas.width, canvas.height)

  let lastTime = 0

  const animate = (timestamp) => {
    const deltaTime = timestamp - lastTime // how long it takes to serve a frame
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    if (!game.gameOver) requestAnimationFrame(animate)
  }
  animate(0)
})