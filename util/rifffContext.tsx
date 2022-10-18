import { createContext, JSX } from 'preact';
import { useState, useEffect, StateUpdater, useContext } from 'preact/hooks'
import { Rifff, RifffResponse } from "types";

const RifffContext = createContext({});

type MaybeRifff = Rifff | Record<never, never>

interface Props {
  children: JSX.Element
  rifffId: string
}

export const useRifffContext = () => {
  const context = useContext(RifffContext)
  if (context === undefined) {
    throw new Error("useRifffContext was used outside of its Provider");
  }
  return context;
} 

const RifffContextProvider = function RifffContextProvider ({ children, rifffId }: Props) {
  const [rifff, setRifff]: [MaybeRifff, StateUpdater<MaybeRifff>] = useState({})
  useEffect(() => {
    const fetchData = async function fetchData () {
      const resp = await fetch(
        "https://endlesss.fm/api/v3/feed/shared_rifff/" + rifffId, {});
      const result: unknown = await resp.json();
      const rifff2 = (result as RifffResponse).data[0];
      setRifff(rifff2);
    }
    fetchData();
  }, [])

  return (
    <RifffContext.Provider value={rifff}>
      {children}
    </RifffContext.Provider>
  )
}

export { RifffContextProvider};

