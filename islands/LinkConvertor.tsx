import { useState } from "preact/hooks";
import { tw } from "twind";
import CopyButton from "@islands/CopyButton.tsx"


const LinkHolder = (props) => {
  const url = props.children;
  return (
    <>
      <input
        class={tw`block text-sm px-1 py-1 text-black w-full text-black border-solid block border-2 border-black`}
        readonly
        value={url}
      >
      </input>
      <CopyButton content={url}></CopyButton>
    </>
  );
};

export default function LinkConvertor(props) {
  const [inser, setValue] = useState("");
  const [output, setOutput] = useState(<></>);
  const regex = /(?:endlesss:\/\/sharedrifff\/([a-f0-9]{32})\/?)|([a-f0-9]{32})/;
  const BASE_URL = props.baseUrl;
  const onChange = function (e) {
    const target = e.target.value;
    setValue(target);
    if (regex.test(target)) {
      const rifffId = target.match(regex)[1];
      setOutput(<LinkHolder>{`${BASE_URL}/rifff/${rifffId}`}</LinkHolder>);
    } else {
      setOutput(
        <span class={tw`text-white`}>
          Enter an <b>endlesss://</b>
          style link! endlesss://sharedrifff/b0aff6b039b111edb6b0371b1bc0a57f
        </span>
      );
    }
  };

  //endlesss://sharedrifff/b0aff6b039b111edb6b0371b1bc0a57f
  return (
    <div class={tw`container mb-12 text-white`}>
      <div class={tw`py-4`}>
        <label htmlFor="url_paste">Paste Endlesss Rifff Link:</label>
      </div>
      <input
        id="url_paste"
        type="text"
        value={inser}
        onInput={onChange}
        placeholder="endlesss://sharedrifff/........."
        class={tw`block text-sm px-1 py-1 text-black w-full border-solid block border-2 border-black`}
      />
      <div class={tw`py-4`}>
        {output}
      </div>
    </div>
  );
}