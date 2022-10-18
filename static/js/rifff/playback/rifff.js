window.RifffBase = class RifffBase {
  constructor(data) {
    this.data = data;
    if (new.target === RifffBase) {
      throw new TypeError("Cannot construct RifffBase instances directly");
    }
  }

  getBps() {
    return this.data.state.bps;
  }

  getSlots() {
    const state = this.data.state;
    return state.playback.map((a) => a.slot.current);
  }

  getLoops() {
    return this.data.loops;
  }

  loadBuffers() {
    const buffers = [];

    for (let i = 0; i < this.getSlots().length; i++) {
      buffers.push(new ArrayBuffer());
    }

    return buffers;
  }
}

window.CdnRifff = class CdnRifff extends window.RifffBase {
  constructor(rifffData) {
    super(rifffData);
  }

  loadBuffer(loop) {
    if (!loop) {
      console.log("Empty loop. Returning empty buffer");
      return Promise.resolve(new ArrayBuffer());
    }

    return new Promise((resolve, reject) => {
      const path = loop.cdn_attachments.oggAudio.url;

      const request = new XMLHttpRequest();
      request.open("GET", path, true);
      request.responseType = "arraybuffer";
      request.onload = () => {
        const audioData = request.response;
        resolve(audioData);
      };
      request.onerror = reject;

      request.send();
    });
  }
}
