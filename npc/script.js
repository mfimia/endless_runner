/** @type {HTMLCanvasElement} */ // <-- tell js this is a html canvas file (get autocomplete)
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 800
const enemyAmount = 5
const enemiesArray = []
const enemySizeRatio = 2.5

let gameFrame = 0

class Enemy {
  constructor (imageSrc, spriteWidth, spriteHeight) {
    this.image = new Image()
    this.image.src = imageSrc
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.width = this.spriteWidth / enemySizeRatio
    this.height = this.spriteHeight / enemySizeRatio
    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 9 + 3)
  }
  draw () {
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height)
  }
}

class Bat extends Enemy {
  constructor () {
    super('./assets/enemy1.png', 293, 155)
  }
  update () {
    this.x += Math.random() * 4 - 2
    this.y += Math.random() * 4 - 2
    if (gameFrame % this.flapSpeed === 0)
      this.frame > 4 ? this.frame = 0 : this.frame++ // animates sprite frames
  }
}

class Bird extends Enemy {
  constructor () {
    super('./assets/enemy2.png', 266, 188)
    this.speed = Math.random() * 4 + 1
    this.angle = 0
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 7
  }
  update () {
    this.x -= this.speed
    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = canvas.width // show up on the other side
    if (gameFrame % this.flapSpeed === 0)
      this.frame > 4 ? this.frame = 0 : this.frame++ // animates sprite frames
  }
}

class Ghost extends Enemy {
  constructor () {
    super('./assets/enemy3.png', 218, 177)
    this.speed = Math.random() * 4 + 1
    this.angle = 0
    this.angleSpeed = Math.random() * 1.5 + 0.5
    this.curve = Math.random() * 200 + 50
  }
  update () {
    this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2)
    this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 270) + (canvas.height / 2 - this.height / 2)
    this.angle += this.angleSpeed
    if (gameFrame % this.flapSpeed === 0)
      this.frame > 4 ? this.frame = 0 : this.frame++ // animates sprite frames
  }
}

class Sun extends Enemy {
  constructor () {
    super('./assets/enemy4.png', 213, 213)
    this.speed = Math.random() * 4 + 1
    this.newX = Math.random() * (canvas.width - this.width)
    this.newY = Math.random() * (canvas.height - this.height) // gets random target within canvas
    this.interval = Math.floor(Math.random() * 200 + 50)
  }
  update () {
    if (gameFrame % this.interval === 0) { // get a new target after some time
      this.newX = Math.random() * (canvas.width - this.width)
      this.newY = Math.random() * (canvas.height - this.height)
    }
    let dx = this.x - this.newX // calculates distance to target
    let dy = this.y - this.newY
    this.x -= dx / 70 // travels to target
    this.y -= dy / 70
    if (gameFrame % this.flapSpeed === 0)
      this.frame > 4 ? this.frame = 0 : this.frame++ // animates sprite frames
  }
}

for (let i = 0; i < enemyAmount; i++) {
  enemiesArray.push(new Bat())
  enemiesArray.push(new Bird())
  enemiesArray.push(new Ghost())
  enemiesArray.push(new Sun())
}

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemiesArray.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })
  gameFrame++
  requestAnimationFrame(animate)
}

animate()