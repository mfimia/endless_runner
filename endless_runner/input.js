import { CONTROLS } from "./constants.js"

export default class InputHandler {
  constructor(game) {
    this.keys = []
    this.game = game
    window.addEventListener('keydown', e => {
      const { key } = e
      console.log(key)
      if (
        (
          key === CONTROLS.ARROW_DOWN ||
          key === CONTROLS.ARROW_UP ||
          key === CONTROLS.ARROW_LEFT ||
          key === CONTROLS.ARROW_RIGHT ||
          key === CONTROLS.ROLL
        )
        && this.keys.indexOf(key) === -1) this.keys.push(key)
      else if (key === 'd') this.game.debug = !this.game.debug
    })
    window.addEventListener('keyup', e => {
      const { key } = e
      if (key === CONTROLS.ARROW_DOWN ||
        key === CONTROLS.ARROW_UP ||
        key === CONTROLS.ARROW_LEFT ||
        key === CONTROLS.ARROW_RIGHT ||
        key === CONTROLS.ROLL) this.keys.splice(this.keys.indexOf(key), 1)
    })
  }
}