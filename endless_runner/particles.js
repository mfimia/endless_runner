import { PARTICLE_COLORS } from "./constants.js"

class Particle {
  constructor(game) {
    this.game = game
    this.markedForDeletion = false
  }

  update() {
    this.x -= this.speedX + this.game.speed
    this.y -= this.speedY
    this.size *= 0.97
    if (this.size < 0.5) this.markedForDeletion = true
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game)
    this.size = (Math.random() * 10) + 10
    this.x = x
    this.y = y
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = PARTICLE_COLORS.DUST
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
  }
}

export class Splash extends Particle {

}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game)
    this.image = document.getElementById('fire')
    this.size = Math.random() * 100 + 50
    this.x = x
    this.y = y
    this.speedX = 1
    this.speedY = 1
    this.angle = 0
    this.angleVelocity = Math.random() * 0.2 - 0.3
  }

  update() {
    super.update()
    this.angle += this.angleVelocity
    this.x += Math.sin(this.angle * 5)
  }

  draw(context) {
    // save-restore pattern ensures that we only influence this canvas code
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size)
    context.restore()
  }
}
