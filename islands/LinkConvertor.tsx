import { useEffect, useState } from "preact/hooks";
import LinkHolder from "@islands/LinkHolder.tsx"
import { JSX } from "preact";
import {css} from 'fresh_emotion';

export default function LinkConvertor(props: { baseUrl: string, startValue: string }) {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState(<></>);
  const regex =/(?:(?:https?:\/\/)?(?:endlesss|127.0.0.1:\d*?)(?:\.fm|:\/)\/(?:listen\?rifffId=|[^\/]*\/\?rifffId=|sharedrifff)\/?([a-f0-9]{32}))|([a-f0-9]{32})\/?/i;
  const BASE_URL = props.baseUrl;

  const checkInput = (val: string) => {
    setInputValue(val);
    const regMatch = val.match(regex);
    let rifff_id = "";
    if (regMatch === null) {
      setOutput(
        <span class={tw`text-white`}>
          Enter an <b>endlesss://</b>
          style link!
        </span>,
      );
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

  // // for testing, change the value
  // useEffect(() => {
  //   if (props.startValue.length) {
  //     setInputValue(`endlesss://sharedrifff/${props.startValue}`);
  //   }
  // }, []);

  //endlesss://sharedrifff/b0aff6b039b111edb6b0371b1bc0a57f

  const divOne = css`
    margin-bottom: 12
    /* mb-12 */
    
  `;

  const topPad=css`padding-top: 1rem; padding-bottom: 1rem;`;

  const inputCss = css`display: block;
  font-size: 0.875rem;
  padding-top: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  color: #000;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  border-color: #000;`;

  return (
    <div class={css`display:flex;flex-wrap:wrap; margin-bottom:3rem;color:#fff;`}>
      <div class={topPad}>
        <label htmlFor="url_paste">Paste Endlesss Rifff Link:</label>
      </div>
      <input
        id="url_paste"
        type="text"
        value={inputValue}
        onInput={inputHandler}
        onKeyDown={keyHandler}
        placeholder="endlesss://sharedrifff/........."
        class={inputCss}
      />
      <div class={topPad}>
        {output}
      </div>
    </div>
  );
}
