export default class InputHandler {
  constructor (game) {
    this.keys = []
    this.game = game
    window.addEventListener('keydown', e => {
      const { key } = e
      if (
        (
          key === 'ArrowDown' ||
          key === 'ArrowUp' ||
          key === 'ArrowLeft' ||
          key === 'ArrowRight' ||
          key === 'Meta'
        )
        && this.keys.indexOf(key) === -1) this.keys.push(key)
      else if (key === 'd') this.game.debug = !this.game.debug
    })
    window.addEventListener('keyup', e => {
      const { key } = e
      if (key === 'ArrowDown' ||
        key === 'ArrowUp' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'Meta') this.keys.splice(this.keys.indexOf(key), 1)
    })
  }
}