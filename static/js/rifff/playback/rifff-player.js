window.RifffPlayer = class RifffPlayer {
  isPlaying = false;
  shouldPlay = false;
  needsReload = false;
  rms = 0.0;
startTime = 0;
pausedAt  = 0;
cancelTokens = [];        
  loopers = [];
  constructor (audioCtx) {  
    this.audioCtx = audioCtx || new AudioContext();
    this.masterGainNode = this.audioCtx.createGain();
    this.masterGainNode.gain.setValueAtTime(decibelsToGain(-6), this.audioCtx.currentTime);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analysisBuffer = new Float32Array(this.analyser.fftSize / 2);
    this.masterGainNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  tearDown() {
    this.stop();
    this.loopers = [];
  }

  get rifff_id() {
    return this.rifff?.data?._id || undefined;
  }

  getCurrentTime() {
    return this.pausedAt >= 0 ? this.pausedAt : this.audioCtx.currentTime - this.startTime;
  }

  getCurrentBeat() {
    return this.getCurrentTime() / this.getBeatLength();
  }

  getBps() {
    return this.rifff.getBps();
  }

  getBPM() {
    return this.getBps() * 60;
  }

  getBeatLength() {
    return 60 / this.getBPM();
  }

  getRMS() {
    const buffer = this.analysisBuffer;
    this.analyser.getFloatTimeDomainData(buffer);
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms /= buffer.length;
    rms = Math.sqrt(rms);
    return rms;
  }

  get rifffData () {
    return this.rifff?.data || null;
  }

  async setRifff (rifff) {
    this.rifff = rifff;
    this.loops = rifff.getLoops();
    this.needsReload = true; 
    // TODO: Do we want to automatically start new rifff, if playing?
    if (this.isPlaying) {  
      try {
        await this.play();
      } catch (error) {
        console.log(error);
        // TODO: Throw here?
      }
    }
  }

  decodeBuffer (buffer) {
      // NOTE: Native ogg decoding is not possible in Safari.
      // Therefore, we use this wasm module to handle ogg decoding
      // https://github.com/jfrancos/oggmented
    return new Promise((resolve, reject) => {
      // Try decoding buffer using the native AudioContext first
      this.audioCtx.decodeAudioData(buffer, (decodedData) => { 
        resolve(decodedData); 
      }, (e) => { 
        OggModule().then((decoder) => { 
          resolve(decoder.decodeOggData(buffer));
        });
      });
    }); 
  }

  async loadBuffers (token) {
    const buffers = [];

    for (const slot of this.rifff.getSlots()) {
      if (token.cancelled) {
        throw new Error('Buffer loading cancelled for rifff ' + this.rifff_id);
      }
    
      if (slot) {      
        const loop = this.loops.find(el => el._id === slot.currentLoop);

        if (loop && slot.on) {
          const buffer = await this.rifff.loadBuffer(loop);
          buffers.push(buffer);  
          continue;
        }
      }
      
      buffers.push(new ArrayBuffer());
    }

    if (token.cancelled) {
      throw new Error('Buffer loading cancelled for rifff ' + this.rifff_id);
    }

    return buffers;
  }

  async createLoopers (buffers, token) {
    const loopers = [];

    for (const [i, slot] of this.rifff.getSlots().entries()) {
      if (token.cancelled) {
        throw Error('Cancelled looper creation');
      }

      if (!slot || buffers[i].byteLength === 0) {
        loopers.push(null);
        continue;
      }

      const decodedData = await this.decodeBuffer(buffers[i]);
        
      const loop = this.loops.find(el => el._id === slot.currentLoop);
      const looper = new Looper(this.audioCtx, loop, decodedData);

      loopers.push(looper);
    }

    if (token.cancelled) {
      throw Error('Cancelled looper creation');
    }

    return loopers;
  }

  async reloadPlayer () {
    if (!this.rifff) {
      throw Error('Rifff cannot be null');
    }

    // Cancel previous tokens
    for (let token of this.cancelTokens) {
      token.cancelled = true;
    }

    const token = {cancelled: false };
    this.cancelTokens.push (token);

    let buffers = [];
    let loopers = [];

    try {
      buffers = await this.loadBuffers(token);
      loopers = await this.createLoopers(buffers, token);
    } catch (error) {
      throw error;
    }

    if (loopers.length === 0) {
      throw Error('Failed to load loopers');
    }

    for (const [i, slot] of this.rifff.getSlots().entries()) {
      const newLooper = loopers[i];
      if (newLooper) {
        newLooper.connect(this.masterGainNode);
        newLooper.setGain(this.getGainForLooper(newLooper));
        newLooper.setRate(this.getRateForLooper(newLooper));
      }
      this.loopers[i]?.currentLooper.stopImmediately();  
      this.loopers[i] = newLooper;
    }
  }

  // TODO: Move the following two methods into looper class?
  getGainForLooper(looper) {
    for (const slot of this.rifff.getSlots()) {
      if (slot && slot.currentLoop === looper.getId()) {
        return slot.gain;
      }
    }

    return 0.0;
  }

  getRateForLooper(looper) {
    for (const loop of this.loops) {
      if (loop._id === looper.getId()) {
        return this.rifff.getBps() / loop.bps;
      }
    }

    return 1.0;
  }

  async play () {
    this.shouldPlay = true;
    await this.audioCtx.resume();
    if (this.needsReload) {
      await this.reloadPlayer();
      this.needsReload = false;
    }
    if (this.shouldPlay) {
      this.playSynced();
    }
  }

  pause () {
    this.shouldPlay = false;
    this.pausedAt = this.getCurrentTime();
    for (const looper of this.loopers) {
      if (looper) {
        looper.pause();
      }
    }
    this.isPlaying = false;
  }

  stop () { 
    this.pause();
    this.rms = 0.35;
    if (this.isPlaying) {
      for (const looper of this.loopers) {
        if (looper) {
          looper.stopImmediately();
        }
      }
      this.loopers = [];
    }
    this.pausedAt = 0;
    this.isPlaying = false;
  }

  playSynced() {
    if (!this.isPlaying) {
      this.startTime = this.audioCtx.currentTime - this.pausedAt;
      this.pausedAt = -1;
    }
    const playerBeats = this.getCurrentBeat();
    const beatLength = this.getBeatLength();
    const baseTime = this.audioCtx.currentTime;
    this.loopers.forEach((looper, index) => {
      if (!looper || looper.isPlaying) {
        return;
      }
      const looperBeats = looper.getLengthInBeats();
      const looperPhase = playerBeats % looperBeats;
      const secondsUntilStart = looperPhase > 0 ? (looperBeats - looperPhase) * beatLength : 0;
      const offset = secondsUntilStart > 0 ? looper.getDuration() - secondsUntilStart : 0;
      looper.play(baseTime, offset);
    });
    this.isPlaying = true;
  }
}

// TODO: Add to utils 
function decibelsToGain (decibels) {
  return Math.pow(10.0, decibels * 0.05);
}
