/**
 * This file is adapted from code originally authored by Endlesss Ltd.
 * https://endlesss.fm
 * Copyright 2022 Endlesss Ltd.
 */
// deno-lint-ignore-file

window.PlaybackController = class PlaybackController {
  constructor(rifffPlayer) {
    this.rifffPlayer = rifffPlayer
    this.rifffs = []
    this.timer = null
    this.autoPlay = false
    this.callback = null
    this.setNumBeats(32)
    this.startTimer(this)
  }

  tearDown() {
    this.stopTimer()
  }

  setAutoPlay(autoPlay) {
    this.autoPlay = autoPlay
  }

  setRifffPlayer(player) {
    this.rifffPlayer = player
  }

  setAdvanceCallback(callback) {
    this.callback = callback
  }

  setRifffs(rifffs) {
    this.rifffs = rifffs
  }

  setNumBeats(beats) {
    this.numBeats = beats
  }

  timerCallback(self) {
    const player = self.rifffPlayer

    if (self.autoPlay && player.isPlaying) {
      if (self.rifffs.length > 0) {
        if (self.currentPhase > self.numBeats - 1) {
          // console.log('Queue next rifff');

          if (self.callback) {
            self.callback()
          }

          // Sleep for two bars
          self.stopTimer()
          setTimeout(self.startTimer, player.getBeatLength() * 8 * 1000, self)
        }
      }
    }
  }

  startTimer(self) {
    if (self.timer !== null) {
      self.stopTimer()
    }
    self.timer = setInterval(self.timerCallback, 200, self)
  }

  stopTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  get currentPhase() {
    const currentBeat = this.rifffPlayer.getCurrentBeat()
    return currentBeat % this.numBeats
  }
}
