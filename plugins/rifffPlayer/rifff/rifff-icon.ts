/**
 * This file is adapted from code originally authored by Endlesss Ltd.
 * https://endlesss.fm
 * Copyright 2022 Endlesss Ltd.
 */
// deno-lint-ignore-file

/* eslint-disable */
export function degreesToRadians(degrees) {
  const pi = Math.PI
  return degrees * (pi / 180)
}
export function render(
  rifff,
  canvas,
  player,
  animate,
  alpha = false,
  backgroundColor = "blue"
) {
  // Assign the waveform, removing every other element to simplify shape
  let peakData = rifff.peakData.filter(function (value, i) {
    return i % 3 === 0 && value > 0
  })

  const maxValue = Math.max(...peakData)

  if (maxValue > 1.0) {
    peakData = peakData.map((x) => (x * 1.0) / maxValue)
  }

  // Parse colours and remove duplicates
  const layerColours = rifff.layerColours
  const colours = []

  for (let c = 0; c < layerColours.length; c++) {
    let str = layerColours[c]
    str = "#" + layerColours[c].substring(2, str.length)
    // console.log(str);
    if (!colours.includes(str)) {
      colours.push(str)
    }
  }

  let ctx

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext("2d", { alpha: alpha })

    // Store the current transformation matrix
    ctx.save()

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    if (alpha) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    } else {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Translate to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // animate
    let playPos = 0
    let scale = 0.8

    if (player && player.rifffData) {
      if (player.rifffData._id === rifff._id) {
        playPos = (player.getCurrentBeat() % 16) / 16

        scale += player.getRMS() * 0.5
        scale = clamp(scale, 0, 0.9)
      }
    }

    ctx.scale(scale, scale)

    draw(playPos)

    // Restore the transform
    ctx.restore()
  }

  function blendColors(colorA, colorB, amount) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16))
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16))
    const r = Math.round(rA + (rB - rA) * amount)
      .toString(16)
      .padStart(2, "0")
    const g = Math.round(gA + (gB - gA) * amount)
      .toString(16)
      .padStart(2, "0")
    const b = Math.round(bA + (bB - bA) * amount)
      .toString(16)
      .padStart(2, "0")
    return "#" + r + g + b
  }

  function draw(playPos) {
    // Set the scale step for inner shapes
    const scaleStep = 1.0 / colours.length
    let lastScale = 1.0

    for (let c = 0; c < colours.length; c++) {
      ctx.shadowColor = blendColors("#000000", colours[0], 0.2)
      // ctx.shadowBlur = 1;
      ctx.shadowOffsetX = -1
      ctx.shadowOffsetY = 1

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )

      // Add three color stops
      gradient.addColorStop(0, blendColors("#FFFFFF", colours[c], 0.8))
      gradient.addColorStop(0.2, colours[c])
      gradient.addColorStop(1, colours[c])

      ctx.fillStyle = gradient

      ctx.scale(lastScale, lastScale)

      drawRifff(peakData, canvas.width, playPos)

      lastScale -= scaleStep

      ctx.fill()
    }

    if (player && animate) {
      requestAnimationFrame(() => {
        render(rifff, canvas, player, animate)
      })
    }
  }

  function drawRifff(waveform, size, playPos) {
    ctx.beginPath()
    ctx.moveTo(0, 0)

    const startIndex = Math.trunc(playPos * waveform.length)

    const thetaStep = (Math.PI * 2) / waveform.length

    for (let i = startIndex; i < waveform.length + startIndex; i += 1) {
      const index = i % waveform.length

      let theta = index * thetaStep
      theta -= Math.PI / 2 // Set the zero point at the top

      let waveformValue = clamp(
        Math.sqrt(Math.sqrt(waveform[index])),
        0.35,
        1.0
      )

      if (i === startIndex) {
        // Simulate playhead by putting a gap in the waveform
        waveformValue = 0
      }

      const r = waveformValue * (size / 2)

      ctx.lineTo(r * Math.cos(theta), r * Math.sin(theta))
    }

    ctx.closePath()
  }

  function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val
  }
}

let canv
export function setCanvas(canv2) {
  canv = canv2
}
export function getCanvas() {
  return canv
}

const rifffIcon = {
  degreesToRadians,
  render,
  getCanvas,
  setCanvas,
}

export { rifffIcon }