import Player from './player.js'
import InputHander from './input.js'

/** @type {HTMLCanvasElement} */

window.addEventListener('load', () => {
  const loading = document.getElementById('loading')
  loading.style.display = 'none'
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const player = new Player(canvas.width, canvas.height)
  player.draw(ctx)
  const input = new InputHander()

  const animate = () => {
    requestAnimationFrame(animate)
  }

  animate()
})