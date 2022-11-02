import { GAME_SETTINGS } from "./constants.js"

export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(context) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'white'
    context.shadowBlur = 0
    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    // score
    context.fillText(`Score: ${this.game.score}`, 20, 50)
    // timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    context.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80)
    // game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily
      if (this.game.score > GAME_SETTINGS.WIN_SCORE) {
        context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20)
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText('Nice job! Refresh this window to go again :D', this.game.width * 0.5, this.game.height * 0.5 + 20)
      } else {
        context.fillText('You lost!', this.game.width * 0.5, this.game.height * 0.5 - 20)
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText('Refresh this window to try again!', this.game.width * 0.5, this.game.height * 0.5 + 20)
      }
    }
    context.restore()
  }
}