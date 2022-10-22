import { tw } from 'twind';

export default function StatBlock({ stats }: { stats: (string | number | Date)[][] }) {
  const inner = stats.map(i => (<li class={tw`flex flex-row text-sm pt-0.5 pb-0.5 justify-between`}><span class={tw`text-blue-400 text-sm font-bold`}>{i[0]}:</span><span class={tw`text-gray-200`}>{i[1]}</span></li>))

  return (
    <ul class={tw`list-none block mt-1 pb-4.0`}>
      {inner}
    </ul>
  )

}