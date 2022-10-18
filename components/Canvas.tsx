import { useEffect, useRef } from "preact/hooks";
export default function Canvas ({ ref, width, height }) {
  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
    />
  )
}


