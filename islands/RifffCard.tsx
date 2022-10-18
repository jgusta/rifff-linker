import { StateUpdater, useEffect, useState } from "preact/hooks"; 
import { useRifffContext } from '@util/rifffContext.tsx';
import { RifffResponse, Rifff } from "types";
type MaybeRifff = Rifff|Record<never,never>

function isRifff(rifff: MaybeRifff): rifff is Rifff {
  return Object.keys(rifff).length === 0
}

export default function RifffCard() {
  const rifff = useRifffContext()

  if (isRifff(rifff)) {
    return <div>HI</div>
  }
  else {
    return <div>No rifff</div>
  }


}