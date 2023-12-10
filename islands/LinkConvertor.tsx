import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";
import LinkHolder from "@islands/LinkHolder.tsx"

import { JSX } from "preact";

export default function LinkConvertor(props: { baseUrl: string, startValue: string }) {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState(<></>);
  // const regex =/(?:(?:(?:https?:\/\/)?(?:endlesss|127.0.0.1:\d*?)(?:\.fm|:\/)\/)?(?:(?:listen\?rifffId=|[^\/]*\/\?rifffId=|sharedrifff)\/?)?([a-f0-9]{32}))\/?/i;
  const regex = /([a-f0-9]{32})/i;
  const BASE_URL = props.baseUrl;

  const checkInput = (val: string) => {
    setInputValue(val);
    const regMatch = val.match(regex);
    let rifff_id = "";
    if (regMatch === null) {
      setOutput(
        <span class={tw`text-white`}>
          Enter an Endlesss shared rifff link or id! Or, <a class={tw`text-underline`}  href={`${BASE_URL}/random`}>try a random one</a>
        </span>
      )
    } else {
      rifff_id = regMatch[1];
      setOutput(<LinkHolder link={`${BASE_URL}/rifff/${rifff_id}`} />);
    }
  }

  const keyHandler: JSX.KeyboardEventHandler<HTMLInputElement> = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = (e.target as HTMLInputElement).value
      checkInput(val);
    }
  }

  const inputHandler: JSX.GenericEventHandler<HTMLInputElement> = function (e: JSX.TargetedEvent<HTMLInputElement, Event>) {
    if (e.target != null) {
      const val = (e.target as HTMLInputElement).value;
      checkInput(val);
    }
  }

  // for testing, change the value
  useEffect(() => {
    if (props.startValue.length) {
      setInputValue(`endlesss://sharedrifff/${props.startValue}`);
    }
  }, []);


  //endlesss://sharedrifff/b0aff6b039b111edb6b0371b1bc0a57f
  return (
    <div class={tw`container mb-12 text-white`}>
      <div class={tw`py-4`}>
        <label htmlFor="url_paste">Paste Endlesss Rifff Link:</label>
      </div>
      <input
        id="url_paste"
        type="text"
        value={inputValue}
        onInput={inputHandler}
        onKeyDown={keyHandler}
        placeholder="https://endlesss.fm/username/?rifffId=.........."
        class={tw`block text-sm px-1 py-1 text-black w-full border-solid block border-2 border-black`}
      />
      <div class={tw`py-4`}>{output}</div>
    </div>
  )
}
