import { tw } from "twind";
import { PageProps } from "$fresh/server.ts";
import { RifffWad } from "types";
import Layout from "@components/Layout.tsx";
import RifffCard from "@islands/RifffCard.tsx";
import StatBlock from "@components/StatBlock.tsx";


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
        <h1 class={tw`max-w-lg m-auto flex flex-col px-8 text-3xl py-2 text-white text-center`}>{rifffData.title}</h1>
        <div class={tw`max-w-md m-auto flex flex-col px-8 relative`}>
          <RifffCard rifff={rifff} background={rifffData.display_image} />
          <div class={tw`text-center border-1 border-white h-12 my-2 py-2 hover:bg-gray-900 bg-gray-700 flex flex-col justify-center`}><a class={tw`text-yellow-400 text-center`} href={`endlesss://sharedrifff/${rifffData.rifff_id}`}>Open in Endlesss</a></div>
          <StatBlock stats={stats} />
        </div>
      </div>
    </Layout>
  );
}
