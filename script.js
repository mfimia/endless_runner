let playerState = 'run'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', (e) => {
  playerState = e.target.value
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImage = new Image()
playerImage.src = './assets/shadow_dog.png'
const spriteHeight = 523
const spriteWidth = 575

let gameFrame = 0
const staggerFrames = 8 // slow down animation by this amount
const spriteAnimations = []
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
]

animationStates.forEach((state, i) => {
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth
    let positionY = i * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames // map all locations to sprite animations array
})

console.log(spriteAnimations)

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // ctx.fillRect(50, 50, 100, 100)
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length // position will change every 5 gameframes
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y

  // drawImage canvas method takes 9 arguments. crops and displays in another position. signature above
  ctx.drawImage(playerImage, // image
    frameX, frameY, spriteWidth, spriteHeight, // source position
    0, 0, spriteWidth, spriteHeight) // destination position

  gameFrame++
  requestAnimationFrame(animate) // create infinite animation loop
}

animate()