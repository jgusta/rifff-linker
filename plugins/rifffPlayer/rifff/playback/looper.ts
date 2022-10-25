/**
 * This file is adapted from code originally authored by Endlesss Ltd.
 * https://endlesss.fm
 * Copyright 2022 Endlesss Ltd.
 */

export default class Looper {
  constructor(audioCtx, loop, buffer) {
    this.audioCtx = audioCtx
    this.loop = loop

    this.source = null

    this.startTime = 0
    this.isPlaying = false
    this.ended = false
    this.playbackRate = 1.0
    this.gain = 0.0
    this.outputNode = null

    this.buffer = buffer

    this.gainNode = audioCtx.createGain()
    this.gainNode.gain.setValueAtTime(0.0, this.audioCtx.currentTime)
  }

  createSource() {
    this.source = this.audioCtx.createBufferSource()
    this.source.buffer = this.buffer
    this.source.loop = true
    this.source.loopEnd = this.loop.length / this.loop.sampleRate
    this.source.playbackRate.value = this.playbackRate

    this.source.connect(this.gainNode)
  }

  setRate(rate) {
    this.playbackRate = rate
  }

  setGain(gain) {
    this.gain = gain

    if (this.getIsPlaying()) {
      this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime)
      this.gainNode.gain.setValueAtTime(gain, this.audioCtx.currentTime)
    }
  }

  getId() {
    return this.loop._id
  }

  getCurrentTime() {
    return (this.audioCtx.currentTime - this.startTime) * this.playbackRate
  }

  getDuration() {
    return this.buffer.duration * (1.0 / this.playbackRate)
  }

  getLengthInBeats() {
    return this.loop.length16ths / 4
  }

  getIsPlaying() {
    return this.isPlaying && this.source
  }

  play(startTime = -1, offset = 0) {
    if (this.getIsPlaying() || this.ended) {
      return
    }

    this.createSource()

    this.startTime = startTime

    this.source.start(this.startTime, offset * this.playbackRate)
    this.gainNode.gain.setTargetAtTime(this.gain, this.startTime, 0.015)

    this.isPlaying = true
  }

  pause() {
    if (!this.ended && this.isPlaying) {
      this.source.stop()
    }
    this.isPlaying = false
  }

  stop() {
    this.source.loop = false
    this.source.onended = () => {
      // console.log('Source Ended: ' + this.getId());
      this.stopImmediately()
    }
    this.isPlaying = false
  }

  stopImmediately() {
    if (!this.source) {
      return
    }

    this.source.loop = false

    if (this.getIsPlaying()) {
      // Fade out and stop
      this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime)
      this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.1)

      this.source.stop(this.audioCtx.currentTime + 0.2)
    } else if (this.source && this.outputNode) {
      this.gainNode.disconnect(this.outputNode)
      this.outputNode = null
    }

    this.isPlaying = false
    this.ended = true
  }

  connect(destination) {
    this.gainNode.connect(destination)
    this.outputNode = destination
  }
}
