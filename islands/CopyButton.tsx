import { useState } from 'preact/hooks';
import {css} from 'fresh_emotion';

const buttonCss = css`  
  display: block;
  margin-top: 1rem;
  margin-right: auto;
  margin-bottom: 1rem;
  margin-left: auto;
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  background-color: #111827;`;

export default function CopyButton(props: {content:string}) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <button
      class={buttonCss}
      onClick={async (e) => {
        await navigator.clipboard.writeText(props.content);
        setIsCopied(true);
      }}>
      {isCopied ? "Copied!" : <>Click to Copy <img style="display:inline-block;" src="/images/copy.svg"/></>}
    </button>
  );
}
