// deno-lint-ignore-file no-window-prefix

import { Rifff, RifffResponse } from "types";
import { JSX, VNode } from 'preact';
import { useState, useEffect, useRef, StateUpdater, MutableRef } from 'preact/hooks'
import Canvas from "@components/Canvas.tsx"

import { css, cx } from "fresh_emotion";
import PlayButton from "../components/PlayButton.tsx";
// deno-lint-ignore-file

const returnedCanvas = css`
  display: flex;
  justify-content: center;
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
`;


type MaybeRifff = Rifff | Record<never, never>

function isRifff(rifff: MaybeRifff): rifff is Rifff {
  console.log('check')
  return Object.keys(rifff).length > 0
}

interface Props {
  children: JSX.Element
  rifff_id: string
}

export default function RifffCard(props) {
  const rifff = props.rifff;
  console.log(rifff)
  const ref = useRef() as MutableRef<HTMLCanvasElement>;
  const btnRef = useRef() as MutableRef<HTMLButtonElement>;

  useEffect(() => {
    // this is weird but needs to be done
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



  return (
    <div class={returnedCanvas}>
      <Canvas
        onClick={(e) => {
          return rifffPlayer.toggle();
        }}
        ref={ref}
        width="300"
        height="300"
        background={props.background}
      />
        <PlayButton ref={btnRef} />
    </div>
  )

}