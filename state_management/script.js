/** @type {HTMLCanvasElement} */
import Player from './player.js'
import InputHander from './input.js'
import { drawStatusText } from './utils.js'


window.addEventListener('load', () => {
  const loading = document.getElementById('loading')
  loading.style.display = 'none'
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const player = new Player(canvas.width, canvas.height)
  const input = new InputHander()

  let lastTime = 0
  const animate = (timestamp) => {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update(input.lastKey) // #1 - update the player with input
    player.draw(ctx, deltaTime)
    drawStatusText(ctx, input, player)
    requestAnimationFrame(animate)
  }

  animate(0)
})