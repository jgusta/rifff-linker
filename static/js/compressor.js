
export class Compressor { // eslint-disable-line no-unused-vars
  constructor (shouldUseLookAhead = false, shouldClipOutput = false) {
    this.prev_yL = 0.0;
    this.prev_y1 = 0.0;
    this.alphaAttack = 0.0;
    this.alphaRelease = 0.0;
    this.attackInSeconds = 0.01;
    this.releaseInSeconds = 0.05;
    this.sampleRate = 44100;
    this.useLookAhead = false;
    this.shouldClipOutput = false;
    this.threshold = 0;
    this.kneeWidth = 2;
    this.ratio = 2;
    this.outputGain = 1.0;
    this.makeUpGain = 1.0;
    this.gainReductionInDecibels = 0.0;

    this.setAttackTime(1.0);
    this.setReleaseTime(10.0);
    this.setOutputClipLevelInDecibels(-0.1);
    this.setRatio(2.0);
    this.calculateMakeUpGain();
  }

  prepareToPlay (audioFrameSize, sampleRate) {
    this.sampleRate = sampleRate;

    this.setReleaseTime(this.releaseInSeconds * 1000.0);
    this.setAttackTime(this.attackInSeconds * 1000.0);
  }

  setOutputClipLevelInDecibels (decibels) {
    if (decibels > 0.0) {
      decibels = 0.0;
    }

    this.outputClipGain = this.decibelsToGain(decibels);
  }

  setOutputGainDecibels (g) {
    this.setOutputGain(this.decibelsToGain(g));
  }

  setOutputGain (g) {
    this.outputGain = g;
  }

  setThreshold (t) {
    this.threshold = t;
    this.calculateMakeUpGain();
  }

  setRatio (r) {
    this.ratio = Math.max(r, 1.0);
    this.calculateMakeUpGain();
  }

  setKneeWidth (kw) {
    this.kneeWidth = kw;
  }

  setAttackTime (attackTimeMs) {
    this.attackInSeconds = (attackTimeMs / 1000.0);
    this.alphaAttack = this.calculateAlphaFromTime(this.attackInSeconds, this.sampleRate);
  }

  setReleaseTime (releaseTimeMs) {
    this.releaseInSeconds = (releaseTimeMs / 1000.0);
    this.alphaRelease = this.calculateAlphaFromTime(this.releaseInSeconds, this.sampleRate);
  }

  calculateMakeUpGain () {
    const differenceVs0Decibels = 0.0 - this.threshold;
    const levelAfterCompression = differenceVs0Decibels / this.ratio;
    const makeUpGainDecibels = (differenceVs0Decibels - levelAfterCompression) / 2.0; // the amount of reduction halved
    this.makeUpGain = Math.pow(10.0, makeUpGainDecibels / 20.0);
  }

  calculateControlValueInDecibels (x) {
    // level detector in the log domain

    const eps = Number.MIN_VALUE * 10.0;

    const xG = 20.0 * Math.log10(Math.abs(x) + eps);
    const yG = this.compressionCharacteristic(xG, this.threshold, this.kneeWidth, this.ratio);
    const xL = xG - yG;
    const yL = this.levelDetectDecoupledSmooth(xL);
    const controlSignalDecibels = -1.0 * yL;

    return controlSignalDecibels;
  }

  compressionCharacteristic (logInputLevel, threshold, kneeWidth, ratio) {
    let Z = logInputLevel - threshold;

    if (Z === 0) {
      Z = Number.MIN_VALUE * 10.0;
    }

    // before knee transition
    if ((2.0 * Z) < (-1.0 * kneeWidth)) {
      return logInputLevel;
    } else if ((2.0 * Z) > kneeWidth) { // after knee transition
      return threshold + (logInputLevel - threshold) / ratio;
    } else { // during knee transition
      const t1 = (logInputLevel - threshold + (kneeWidth / 2.0));
      const divisor = 2.0 * kneeWidth;

      if (divisor === 0.0) { // safeguard
        return logInputLevel;
      } else {
        return logInputLevel + (1.0 / ratio - 1.0) * (t1 * t1) / divisor;
      }
    }
  }

  calculateAlphaFromTime (timeInSeconds, samplingFrequency) {
    timeInSeconds = Math.max(0.000000001, timeInSeconds);
    const alpha = Math.exp(-1.0 / (timeInSeconds * samplingFrequency));
    return alpha;
  }

  levelDetectDecoupledSmooth (x) {
    const y1 = Math.max(x, this.alphaRelease * this.prev_y1 + (1.0 - this.alphaRelease) * x);
    const level = this.alphaAttack * this.prev_yL + (1.0 - this.alphaAttack) * y1;

    this.prev_yL = level;
    this.prev_y1 = y1;

    return level;
  }

  decibelsToGain (decibels) {
    return Math.pow(10.0, decibels / 20.0);
  }

  processBlock (inputBuffer, outputBuffer) {
    const numOutputChannels = inputBuffer.numberOfChannels;

    let maxGainReductionDecibels = 0.0;

    for (let i = 0; i < inputBuffer.length; i++) {
      let x = 0;

      for (let k = 0; k < numOutputChannels; k++) {
        x += inputBuffer.getChannelData(k)[i];
      }

      x = x / numOutputChannels;

      const controlSignalDecibels = this.calculateControlValueInDecibels(x);

      const controlSignalGain = this.decibelsToGain(controlSignalDecibels);

      // this is for figuring out the gain reduction
      if (controlSignalDecibels < maxGainReductionDecibels) {
        maxGainReductionDecibels = controlSignalDecibels;
      }

      for (let k = 0; k < numOutputChannels; k++) {
        let currentSample;

        if (this.useLookAhead) {
          // lookAheadBuffer.writeSample (k, audioIn[k]);
          // currentSample = lookAheadBuffer.getCurrentSample (k);
          console.log('lookAhead not supported yet');
        } else {
          currentSample = inputBuffer.getChannelData(k)[i];
        }

        currentSample *= controlSignalGain;
        currentSample *= this.makeUpGain;
        currentSample *= this.outputGain;

        // clipping, for limiters
        if (this.shouldClipOutput) {
          if (currentSample > this.outputClipGain) {
            currentSample = this.outputClipGain;
          }

          if (currentSample < -this.outputClipGain) {
            currentSample = -this.outputClipGain;
          }
        }

        outputBuffer.getChannelData(k)[i] = currentSample;
      }

      // if (useLookAhead)
      // {
      //     // this has to happen here as the read and write indices are updated after we
      //     // have written for each channel, otherwise they get updated doubly for stereo
      //     lookAheadBuffer.update();
      // }

      // calculateWindowedGainReduction (gainReductionInDecibels);
    }

    this.gainReductionInDecibels = maxGainReductionDecibels;
  }
}

// Tests

// const data = [
//     0.0182073, -0.0189948, 0.0565231, 0.120187, -0.0896252, 0.0183261, -0.103095, -0.0117436, -0.0764129, -0.0538464, 0.122769, -0.0646331, 0.028178, 0.0446504, -0.0274646, 0.00764038, 0.0781873, 0.0774835, 0.000766337, -0.0815602, 0.0871971, -0.0201082, 0.0752333, -0.0525549, 0.0339414, -0.0310337, -0.0997351, -0.124962, 0.079099, 0.0235249, -0.102393, 0.0963, 0.0398241, -0.0678236, -0.109718, 0.0443116, -0.0216497, -0.0960475, 0.0933719, 0.0693347, -0.0212604, 0.00422242, -0.0571009, 0.0316041, 0.0756638, -0.117378, -0.103243, 0.0750044, -0.0616135, -0.0397728, 0.0211501, 0.11492, 0.0550278, -0.0888961, -0.109496, 0.0704812, 0.0482154, 0.102337, 0.056064, 0.00264582, -0.0744371, -0.124665, -0.111729, -0.0201269
// ];

// const floatArray = new Float32Array (64);
// for (let i = 0; i < floatArray.length; i++)
// {
//   floatArray[i] = data[i];
// }

// var audioBuffer = new AudioBuffer({
//     length: data.length,
//     numberOfChannels: 1,
//     sampleRate: 44100
// })

// audioBuffer.copyToChannel (floatArray, 0, 0);

// // for (let i = 0; i < audioBuffer.length; i++)
// // {
// //   console.log (audioBuffer.getChannelData(0)[i])
// // }

// const c = new Compressor(44100);

// c.setAttackTime (10);
// c.setReleaseTime (50);
// c.setThreshold (-12);

// // console.log (c.calculateControlValueInDecibels (0.5));
// // console.log (c.calculateControlValueInDecibels (1.2));

// c.processBlock (audioBuffer, audioBuffer);

// console.log(c.gainReductionInDecibels);
