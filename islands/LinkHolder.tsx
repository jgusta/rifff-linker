import CopyButton from "@islands/CopyButton.tsx";
import { tw } from "twind";

export default function LinkHolder(props: { link: string }) {
  const link = props.link;
  return (
    <>
      <input
        class={tw`block text-sm px-1 py-1 text-black w-full text-black border-solid block border-2 border-black`}
        readonly
        value={link}
      >
      </input>
      <CopyButton content={link}></CopyButton>
    </>
  );
}
