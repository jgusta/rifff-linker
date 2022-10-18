class Compressor {
  // eslint-disable-line no-unused-vars
  constructor(shouldUseLookAhead = false, shouldClipOutput = false) {
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

  prepareToPlay(audioFrameSize, sampleRate) {
    this.sampleRate = sampleRate;

    this.setReleaseTime(this.releaseInSeconds * 1000.0);
    this.setAttackTime(this.attackInSeconds * 1000.0);
  }

  setOutputClipLevelInDecibels(decibels) {
    if (decibels > 0.0) {
      decibels = 0.0;
    }

    this.outputClipGain = this.decibelsToGain(decibels);
  }

  setOutputGainDecibels(g) {
    this.setOutputGain(this.decibelsToGain(g));
  }

  setOutputGain(g) {
    this.outputGain = g;
  }

  setThreshold(t) {
    this.threshold = t;
    this.calculateMakeUpGain();
  }

  setRatio(r) {
    this.ratio = Math.max(r, 1.0);
    this.calculateMakeUpGain();
  }

  setKneeWidth(kw) {
    this.kneeWidth = kw;
  }

  setAttackTime(attackTimeMs) {
    this.attackInSeconds = attackTimeMs / 1000.0;
    this.alphaAttack = this.calculateAlphaFromTime(
      this.attackInSeconds,
      this.sampleRate
    );
  }

  setReleaseTime(releaseTimeMs) {
    this.releaseInSeconds = releaseTimeMs / 1000.0;
    this.alphaRelease = this.calculateAlphaFromTime(
      this.releaseInSeconds,
      this.sampleRate
    );
  }

  calculateMakeUpGain() {
    const differenceVs0Decibels = 0.0 - this.threshold;
    const levelAfterCompression = differenceVs0Decibels / this.ratio;
    const makeUpGainDecibels =
      (differenceVs0Decibels - levelAfterCompression) / 2.0; // the amount of reduction halved
    this.makeUpGain = Math.pow(10.0, makeUpGainDecibels / 20.0);
  }

  calculateControlValueInDecibels(x) {
    // level detector in the log domain

    const eps = Number.MIN_VALUE * 10.0;

    const xG = 20.0 * Math.log10(Math.abs(x) + eps);
    const yG = this.compressionCharacteristic(
      xG,
      this.threshold,
      this.kneeWidth,
      this.ratio
    );
    const xL = xG - yG;
    const yL = this.levelDetectDecoupledSmooth(xL);
    const controlSignalDecibels = -1.0 * yL;

    return controlSignalDecibels;
  }

  compressionCharacteristic(logInputLevel, threshold, kneeWidth, ratio) {
    let Z = logInputLevel - threshold;

    if (Z === 0) {
      Z = Number.MIN_VALUE * 10.0;
    }

    // before knee transition
    if (2.0 * Z < -1.0 * kneeWidth) {
      return logInputLevel;
    } else if (2.0 * Z > kneeWidth) {
      // after knee transition
      return threshold + (logInputLevel - threshold) / ratio;
    } else {
      // during knee transition
      const t1 = logInputLevel - threshold + kneeWidth / 2.0;
      const divisor = 2.0 * kneeWidth;

      if (divisor === 0.0) {
        // safeguard
        return logInputLevel;
      } else {
        return logInputLevel + ((1.0 / ratio - 1.0) * (t1 * t1)) / divisor;
      }
    }
  }

  calculateAlphaFromTime(timeInSeconds, samplingFrequency) {
    timeInSeconds = Math.max(0.000000001, timeInSeconds);
    const alpha = Math.exp(-1.0 / (timeInSeconds * samplingFrequency));
    return alpha;
  }

  levelDetectDecoupledSmooth(x) {
    const y1 = Math.max(
      x,
      this.alphaRelease * this.prev_y1 + (1.0 - this.alphaRelease) * x
    );
    const level =
      this.alphaAttack * this.prev_yL + (1.0 - this.alphaAttack) * y1;

    this.prev_yL = level;
    this.prev_y1 = y1;

    return level;
  }

  decibelsToGain(decibels) {
    return Math.pow(10.0, decibels / 20.0);
  }

  processBlock(inputBuffer, outputBuffer) {
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
          console.log("lookAhead not supported yet");
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
    }

    this.gainReductionInDecibels = maxGainReductionDecibels;
  }
}
