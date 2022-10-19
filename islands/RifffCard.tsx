import { Rifff, RifffResponse } from "types";
import { JSX } from 'preact';
import { useState, useEffect, useRef, StateUpdater } from 'preact/hooks'
import Canvas from "@components/Canvas.tsx"
import { tw } from "twind";
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
  rifffIcon:'',
  player:'',
  rifff:'',
  canv:"",
  animate:false,
  animated: false,
  backgroundColor:"blue",
  alpha: true,
  state: false,
  isPlaying: false,
  toggle: function renderIcon() {
    this.state = !this.state;
    if (this.state) {
      this.animated = true;
      this.isPlaying = true;
      this.renderIcon();
      this.play()
    }
    else {
      this.animated = false;
      this.isPlaying = false;
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
  useEffect(() => {
    const canv = ref.current.base;
    rifffPlayer.rifffIcon = window.rifffIcon;
    rifffPlayer.player = window.player;
    rifffPlayer.canv = canv;
    // watch carefully
    rifff.rifff.loops = rifff.loops
    rifffPlayer.rifff = rifff;
    window.rifffPlayer = rifffPlayer;
    window.requestAnimationFrame(() => {
      rifffPlayer.renderIcon();
    });
  }, [])
  return (
    <div class={tw`flex justify-center`}>
      <Canvas
        onClick={(e)=>{
          rifffPlayer.toggle()
        }}
        ref={ref}
        width="300"
        height="300"
        background={props.background}
      />
    </div>
  )

}