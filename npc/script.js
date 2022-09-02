/** @type {HTMLCanvasElement} */ // <-- tell js this is a html canvas file (get autocomplete)
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 1000
const enemyAmount = 200
const enemiesArray = []
const enemySizeRatio = 2.5

let gameFrame = 0

class BatEnemy {
  constructor () {
    this.image = new Image()
    this.image.src = './assets/enemy1.png'
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.width = this.spriteWidth / enemySizeRatio
    this.height = this.spriteHeight / enemySizeRatio
    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 9 + 3)
  }
  update () {
    this.x += Math.random() * 4 - 2
    this.y += Math.random() * 4 - 2
    if (gameFrame % this.flapSpeed === 0)
      this.frame > 4 ? this.frame = 0 : this.frame++ // animates sprite frames
  }
  draw () {
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height)
  }
}

class BirdEnemy {
  constructor () {
    this.image = new Image()
    this.image.src = './assets/enemy2.png'
    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 266
    this.spriteHeight = 188
    this.width = this.spriteWidth / enemySizeRatio
    this.height = this.spriteHeight / enemySizeRatio
    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 9 + 3)
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
  draw () {
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height)
  }
}

class GhostEnemy {
  constructor () {
    this.image = new Image()
    this.image.src = './assets/enemy3.png'
    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 218
    this.spriteHeight = 177
    this.width = this.spriteWidth / enemySizeRatio
    this.height = this.spriteHeight / enemySizeRatio
    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 9 + 3)
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
  draw () {
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height)
  }
}

for (let i = 0; i < enemyAmount; i++) {
  // enemiesArray.push(new BatEnemy())
  // enemiesArray.push(new BirdEnemy())
  enemiesArray.push(new GhostEnemy())
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