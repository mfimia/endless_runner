/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// create a collision canvas to avoid browser errors when scanning images
const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight

let score = 0
ctx.font = '50px Impact'
let gameOver = false

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

let ravens = []
class Raven {
  constructor () {
    this.spriteWidth = 271
    this.spriteHeight = 194
    this.sizeModifier = Math.random() * 0.6 + 0.3
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = './assets/raven.png'
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
    this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`
  }
  update (deltaTime) {
    if (this.y < 0 || this.y > canvas.height - this.height) this.directionY = this.directionY * -1
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < 0 - this.width) this.markedForDeletion = true
    this.timeSinceFlap += deltaTime
    if (this.timeSinceFlap > this.flapInterval) {
      this.frame > this.maxFrame
        ? this.frame = 0
        : this.frame++
      this.timeSinceFlap = 0
    }

  }
  draw () {
    // create unique hitbox for each raven. we use color for collision detection
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height)
  }
}

let explosions = []

class Explosion {
  constructor (x, y, size) {
    this.image = new Image()
    this.image.src = './assets/boom.png'
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.size = size
    this.x = x
    this.y = y
    this.frame = 0
    this.sound = new Audio()
    this.sound.src = './assets/boom.wav'
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false
  }
  update (deltaTime) {
    if (this.frame === 0) this.sound.play()
    this.timeSinceLastFrame += deltaTime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++
      this.timeSinceLastFrame = 0
      if (this.frame > 5) this.markedForDeletion = true
    }
  }
  draw () {
    ctx.drawImage(this.image,
      this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y - this.size / 4, this.size, this.size)
  }
}

const drawScore = () => {
  ctx.fillStyle = 'black'
  ctx.fillText(`Score: ${score}`, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText(`Score: ${score}`, 55, 80)
}

window.addEventListener('click', (e) => {
  const { x, y } = e
  const { data } = collisionCtx.getImageData(x, y, 1, 1) // area of 1 pixel
  ravens.forEach(raven => {
    if (raven.randomColors[0] === data[0]
      && raven.randomColors[1] === data[1]
      && raven.randomColors[2] === data[2]) {
      // collision detected by color
      raven.markedForDeletion = true
      score++
      explosions.push(new Explosion(raven.x, raven.y, raven.width))
    }
  })
})

const animate = (timestamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
  let deltaTime = timestamp - lastTime // equals to how long it takes to serve a frame
  // with delta time we make sure game has the same speed in all computers
  lastTime = timestamp
  timeToNextRaven += deltaTime
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven())
    timeToNextRaven = 0
    ravens.sort((a, b) => {
      // sort ravens by width
      // smaller ones have lower prio
      return a.width - b.width
    })
  }
  drawScore(); // draw score before dravens so the latter have layer priority
  [...ravens, ...explosions].forEach(raven => { raven.update(deltaTime) });
  [...ravens, ...explosions].forEach(raven => { raven.draw() })
  ravens = ravens.filter(raven => !raven.markedForDeletion)
  explosions = explosions.filter(raven => !raven.markedForDeletion)
  requestAnimationFrame(animate)
}

animate(0) // pass a value to the first call to have a starting timestamp