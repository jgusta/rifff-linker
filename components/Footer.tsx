import { SITE_NAME } from "config";
import { apply, tw } from "twind";
export default function Footer({ tClass }: { tClass: string }) {
  const footerClasses = tw`bg-gray-700 text-xs`
  const inner = tw`container text-gray-300 text-center w-full py-4 px-4 flex items-center flex-wrap mx-auto`
  return (
    <footer class={`${footerClasses} ${tClass}`}>
      <div class={inner}>
        Disclaimer: This site is not affiliated with or endorsed by Endlesss
        Limited. 'Endlesss' and the figurative 'SSS' logo are registered trade
        marks of Endlesss Limited.

      </div>
    </footer>
  );
}
