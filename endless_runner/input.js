export default class InputHandler {
  constructor () {
    this.keys = []
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