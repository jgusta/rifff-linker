interface RifffPlayer {
  rifffIcon: string;
  player: null;
  btn: string;
  rifff: string;
  canv: string;
  animate: boolean;
  animated: boolean;
  backgroundColor: string;
  alpha: boolean;
  state: boolean;
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  renderIcon: () => void;
}

const rifffPlayer: RifffPlayer = {
  rifffIcon: '',
  player: null,
  btn: '',
  rifff: '',
  canv: "",
  animate: false,
  animated: false,
  backgroundColor: "blue",
  alpha: true,
  state: false,
  isPlaying: false,
  toggle: function toggle() {
    this.state = !this.state;
    const img = document.getElementById('pbutton') as HTMLImageElement
    if (this.state) {
      this.animated = true;
      this.isPlaying = true;

      if (img) {
        img.src = "/images/pause.svg";
      }
      this.renderIcon();
      this.play()
    }
    else {
      this.animated = false;
      this.isPlaying = false;
      if (img) {
        img.src = "/images/play.svg";
      }
      this.player ? this.player.stop() : Function.prototype;
    }
  },
  play: function play() {
    if (this.player !== null){
      this.player.stop();
      this.player.setRifff(new window.CdnRifff(this.rifff.rifff));
      this.player.play();
    }
  },
  renderIcon: function renderIcon() {
    this.rifffIcon.render(this.rifff.rifff, this.canv, this.player, this.animate, this.alpha, this.backgroundColor)
    if (this.animated) {

      globalThis.requestAnimationFrame(() => {
        this.renderIcon();
      });
    }
  },
}