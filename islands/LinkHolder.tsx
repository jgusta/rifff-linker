import CopyButton from "@islands/CopyButton.tsx";
import OpenButton from "@islands/OpenButton.tsx";
import { css } from "fresh_emotion";

interface Props {
  link: string;
}

const inputCss = css`display: block;
  font-size: 0.875rem; 
  padding-left: 0.25rem; 
  padding-right: 0.25rem; 
  padding-top: 0.25rem; 
  padding-bottom: 0.25rem; 
  color: #000;
  width: 100%; 
  border-style: solid;
  display: block; 
  border-width: 2px; 
  border-color: #000;`;

export default function LinkHolder({ link }: Props) {
  return (
    <>
      <input
        class={inputCss}
        readonly
        value={link}
      >
      </input>
      <CopyButton content={link}></CopyButton>
      <OpenButton content={link}></OpenButton>
    </>
  );
}
