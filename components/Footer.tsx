import { SITE_NAME } from "config"
import { apply, tw } from "twind"
export default function Footer({ tClass }: { tClass: string }) {
  const footerClasses = tw`bg-gray-700 text-xs mt-12 pt-4`
  const thankYou = tw`font-xxs text-gray-500 text-center w-full pt-3 px-4 flex justify-center flex-wrap mx-auto`
  const inner = tw`text-gray-400 text-center w-full pt-1 pb-3 px-4 flex justify-center flex-wrap mx-auto`
  return (
    <footer class={`${footerClasses} ${tClass}`}>
      <div class={thankYou}>
        Special thanks to feloniousmonk for helping with the math of the
        playtimes.
      </div>
      <div class={inner}>
        Disclaimer: This site is not affiliated with or endorsed by Endlesss
        Limited. 'Endlesss' and the figurative 'SSS' logo are registered trade
        marks of Endlesss Limited.
      </div>
    </footer>
  )
}
