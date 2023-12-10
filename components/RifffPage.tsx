import { tw } from "twind";
import { PageProps } from "$fresh/server.ts";
import { RifffWad } from "types";
import Layout from "@components/Layout.tsx";
import RifffCard from "@islands/RifffCard.tsx";
import StatBlock from "@components/StatBlock.tsx";
import BigButton from "@islands/BigButton.tsx";
import MediumButton from "@islands/MediumButton.tsx";


export default function RifffPage(props: RifffWad) {
  const { meta, rifffData, rifff } = props;

  const stats = [
    ['Posted by', rifffData.user],
    ['Music by', rifffData.byLine],
    ['Date', rifffData.time],
    ['BPM', rifffData.bpm],
    ['Time Signature', rifffData.signature],
    ['Bars', rifffData.bars],
    ['Likes', rifffData.likes],
    ['Length (Seconds)', rifffData.seconds]
  ];

  return (
    <Layout meta={meta}>
      <div class={tw`w-full`}>
        <h1
          class={tw`max-w-lg m-auto flex flex-col px-8 text-3xl py-2 text-white text-center`}>
          {rifffData.title}
        </h1>
        <div class={tw`max-w-md m-auto flex(& col) px-8 relative`}>
          <RifffCard rifff={rifff} background={rifffData.display_image} />
          <BigButton
            href={`https://endlesss.fm/sharedrifff/${rifffData.rifff_id}`}>
            Open in Endlesss
          </BigButton>
          <StatBlock stats={stats} />
        </div>
        <div class={tw`w-[200px] m-auto flex flex-col px-8 relative`}>
          <MediumButton href={`/random`}>Random Rifff!</MediumButton>
        </div>
      </div>
    </Layout>
  )
}
