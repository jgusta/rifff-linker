import CopyButton from "@islands/CopyButton.tsx";
import { tw } from "twind";
import OpenButton from "@islands/OpenButton.tsx";

interface Props {
  link: string;
}

export default function LinkHolder({ link }: Props) {
  return (
    <>
      <input
        class={tw`block text-sm px-1 py-1 text-black w-full text-black border-solid block border-2 border-black`}
        readonly
        value={link}
      >
      </input>
      <CopyButton content={link}></CopyButton>
      <OpenButton content={link}></OpenButton>
    </>
  );
}
