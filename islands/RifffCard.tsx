import { Rifff, RifffResponse } from "types";
import { JSX } from 'preact';
import { useState, useEffect, useRef, StateUpdater } from 'preact/hooks'
import Canvas from "@components/Canvas.tsx"
import { tw } from "twind";
import { css } from "twind/css";
// deno-lint-ignore-file

interface Props {
  children: JSX.Element
  rifff_id: string
}

type MaybeRifff = Rifff | Record<never, never>

function isRifff(rifff: MaybeRifff): rifff is Rifff {
  console.log('check')
  return Object.keys(rifff).length > 0
}

const rifffPlayer = {
  rifffIcon: '',
  player: '',
  btn: '',
  rifff: '',
  canv: "",
  animate: false,
  animated: false,
  backgroundColor: "blue",
  alpha: true,
  state: false,
  isPlaying: false,
  toggle: function renderIcon() {
    this.state = !this.state;
    if (this.state) {
      this.animated = true;
      this.isPlaying = true;
      document.getElementById('pbutton').src = "/images/pause.svg";
      this.renderIcon();
      this.play()
    }
    else {
      this.animated = false;
      this.isPlaying = false;
      document.getElementById('pbutton').src = "/images/play.svg";
      this.player.stop();
    }
  },
  play: function play() {
    this.player.stop();
    this.player.setRifff(new window.CdnRifff(this.rifff.rifff));
    this.player.play();
  },
  renderIcon: function renderIcon() {
    this.rifffIcon.render(this.rifff.rifff, this.canv, this.player, this.animate, this.alpha, this.backgroundColor)
    if (this.animated) {
      window.requestAnimationFrame(() => {
        this.renderIcon();
      });
    }
  },
}

export default function RifffCard(props) {
  const rifff = props.rifff;
  console.log(rifff)
  const ref = useRef();
  const btnRef = useRef();
  useEffect(() => {
    const canv = ref.current.base;
    rifffPlayer.rifffIcon = window.rifffIcon;
    rifffPlayer.player = window.player;
    rifffPlayer.canv = canv;
    rifffPlayer.btn = btnRef.current;
    // watch carefully
    rifff.rifff.loops = rifff.loops
    rifffPlayer.rifff = rifff;
    window.rifffPlayer = rifffPlayer;
    window.requestAnimationFrame(() => {
      rifffPlayer.renderIcon();
    });
  }, [])
  const playstyle = css({
    transform: "translate(0%,-50%)"
  })
  return (
    <div class={tw`flex justify-center relative m-auto w-[300px] h-[300px]`}>
      <Canvas
        onClick={(e) => {
          rifffPlayer.toggle()
        }}
        ref={ref}
        width="300"
        height="300"
        background={props.background}
      />
      <button ref={btnRef} 
      onClick={(e) => { rifffPlayer.toggle() }} 
      class={tw`absolute top-0 bottom-0 left-0 right-0`}
      >
        <img id="pbutton" 
          class={tw`${playstyle} absolute w-full h-full`} 
        src="/images/play.svg" />
      </button>
    </div>
  )

}