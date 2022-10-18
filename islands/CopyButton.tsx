import { useState } from "preact/hooks";
import { tw } from "twind";

export default function CopyButton(props) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <button
      class={tw`block my-4 mx-auto px-4 py-2 bg-gray-900`}
      onClick={async (e) => {
        await navigator.clipboard.writeText(props.content);
        setIsCopied(true);
      }}
    >
      {isCopied ? "Copied!" : <>Click to Copy <span class="material-icons">content_copy</span></>}
    </button>
  );
}
