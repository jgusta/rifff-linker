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
          <StatBlock stats={stats} />
        </div>
        <div
          class={tw`max-w-[400px] sm:max-w-[600px] m-auto justify-between flex flex-col sm:flex-row px-8 relative`}>
          <MediumButton href={`/random`}>Random Rifff!</MediumButton>
          <MediumButton href={`endlesss://sharedrifff/${rifffData.rifff_id}`}>
            Open in Endlesss (app)
          </MediumButton>
          <MediumButton
            href={`https://endlesss.fm/${rifffData.user}/?rifffId=${rifffData.rifff_id}`}>
            Open in Endlesss (web)
          </MediumButton>
        </div>
      </div>
    </Layout>
  )
}
