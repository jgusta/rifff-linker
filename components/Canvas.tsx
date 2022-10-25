import { AnyComponent, Ref, VNode } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { tw } from 'twind';
export default function Canvas(
  { ref, width, height, background }:
    {
      ref: Ref<HTMLCanvasElement> | undefined,
      width: string,
      height: string,
      background: string
    }
):VNode<HTMLCanvasElement> {
  const style = `background: url(${background}) center center / cover no-repeat rgb(16, 16, 16);  object-fit: cover;
  text-align: center;`
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={style}
    />
  )
}


