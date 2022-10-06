import { SITE_NAME } from "config";
import { tw } from "twind";
export default function Footer() {
  return (
    <footer class={tw`bg-gray-700 absolute bottom-0 left-0 right-0 text-xs`}>
      <div
        class={tw`container text-gray-300 text-center w-full py-4 px-4 flex items-center flex-wrap mx-auto`}
      >
        Disclaimer: This site is not affiliated with or endorsed by Endlesss
        Limited. 'Endlesss' and the figurative 'SSS' logo are registered trade
        marks of Endlesss Limited.

      </div>
    </footer>
  );
}
