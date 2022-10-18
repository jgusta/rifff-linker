window.AutoLevelMixer = class AutoLevelMixer { // eslint-disable-line no-unused-vars
  constructor () {
    this.decrementValueReady = false;
    this.smallWindowCounter = 0;
    this.smallWindowSize = 512;
    this.sumOfSquares = 0.0;
    this.rmsHistorySize = 8;
    this.rmsHistory = new Array(this.rmsHistorySize);
    this.rmsHistoryIndex = 0;

    // parameters
    this.thresholdInDecibels = 10.0;
    this.levelReductionFactor = 0.5;

    // observed values
    this.decrementValue = -0.0;
    this.levelDifference = 0.0;
    this.minDecrementValue = 0.0;
    this.maxLevelDifference = 0.0;
  }

  resetMaximumAndMinimumValues () {
    this.minDecrementValue = 0.0;
    this.maxLevelDifference = 0.0;
  }

  /** Returns true if we have a new level decrement value ready */
  hasNewGainLevelReady () {
    return this.decrementValueReady;
  }

  /** \return the value in dB of volume reduction to be applied to all loops */
  getDecrementValue (indicateValueIsConsumed = true) {
    if (indicateValueIsConsumed) {
      this.decrementValueReady = false;
    }

    return this.decrementValue;
  }

  /** \return the minimum decrement value observed */
  getMinDecrementValue () {
    return this.minDecrementValue;
  }

  /** \return the amount over the threshold in dB that the level is currently at */
  getLevelDifference () {
    return this.levelDifference;
  }

  /** \return the maximum level difference observed */
  getMaxLevelDifference () {
    return this.maxLevelDifference;
  }

  /** Sets the auto level mixer detection threshold in decibels */
  setThresholdInDecibels (decibels) {
    this.thresholdInDecibels = decibels;
  }

  /** Sets the factor by which any excess level is scaled to determine the amount to turn down the signal */
  setLevelReductionFactor (v) {
    this.levelReductionFactor = v;
  }

  /** \return the auto level mixer detection threshold in decibels */
  getThresholdInDecibels () {
    return this.thresholdInDecibels;
  }

  /** \return the factor by which any excess level is scaled to determine the amount to turn down the signal */
  getLevelReductionFactor () {
    return this.levelReductionFactor;
  }

  processBlock (buffer) {
    for (let i = 0; i < buffer.length; i++) {
      // sample is the max of the rectified samples from each channel
      let sample = 0.0;

      if (buffer.numberOfChannels > 1) {
        sample = Math.max(Math.abs(buffer.getChannelData(0)[i]), Math.abs(buffer.getChannelData(1)[i]));
      } else {
        sample = Math.abs(buffer.getChannelData(0)[i]);
      }

      // sum the squared values
      this.sumOfSquares += (sample * sample);
      this.smallWindowCounter++;

      // if we have reached the small window size
      if (this.smallWindowCounter >= this.smallWindowSize) {
        // reset counter
        this.smallWindowCounter = 0;

        // caclulate RMS and add to RMS history
        const rms = Math.sqrt(this.sumOfSquares / this.smallWindowSize);
        // console.log ("RMS: " + rms);
        this.sumOfSquares = 0.0;
        this.rmsHistory[this.rmsHistoryIndex] = rms;
        this.rmsHistoryIndex++;

        // if we have reached the RMS history size (i.e. we've done a large window size now)
        if (this.rmsHistoryIndex === this.rmsHistorySize) {
          // reset the rms history index
          this.rmsHistoryIndex = 0;

          let maxVal = 0.0;
          let minVal = Number.MAX_VALUE;

          // calculate max and min values
          for (let i = 0; i < this.rmsHistorySize; i++) {
            if (this.rmsHistory[i] > maxVal) {
              maxVal = this.rmsHistory[i];
            }

            if (this.rmsHistory[i] < minVal) {
              minVal = this.rmsHistory[i];
            }
          }

          // console.log ("Max val " + maxVal);
          // console.log ("Min val " + minVal);

          // take the max of the max value and the min value multiplied by a coefficient
          const chosenValue = Math.max(maxVal, minVal * 5.0);

          // convert to decibels
          const chosenValueDecibels = 20.0 * Math.log10(chosenValue);

          const differenceComparedToThreshold = chosenValueDecibels - this.thresholdInDecibels;
          this.levelDifference = Math.max(0.0, differenceComparedToThreshold);

          this.decrementValue = this.levelDifference * -1.0 * this.levelReductionFactor;
          this.decrementValueReady = true;

          if (this.decrementValue < this.minDecrementValue) {
            this.minDecrementValue = this.decrementValue;
          }

          if (this.levelDifference > this.maxLevelDifference) {
            this.maxLevelDifference = this.levelDifference;
          }
        }
      }
    }
  }
}
