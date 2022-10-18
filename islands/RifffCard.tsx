import { Rifff, RifffResponse } from "types";
import { JSX } from 'preact';
import { useState, useEffect, useRef, StateUpdater } from 'preact/hooks'
import Canvas from "@components/Canvas.tsx"
interface Props {
  children: JSX.Element
  rifff_id: string
}

type MaybeRifff = Rifff | Record<never, never>

function isRifff(rifff: MaybeRifff): rifff is Rifff {
  console.log('check')
  return Object.keys(rifff).length > 0
}

export default function RifffCard(props) {
  const rifff = props.rifff;
  console.log(rifff)
  const ref = useRef();
  useEffect(() => {
    const rifffIcon = window.rifffIcon;
    const player = window.player
    function renderIcon() {
      rifffIcon.render(rifff.rifff, ref.current, player, true)
    }
    window.requestAnimationFrame(() => {
      renderIcon();
    });
  }, [])
  return (
    <div class="rifff-card">
      <Canvas
        ref={ref}
        width="500"
        height="500"
      />
    </div>
  )

}