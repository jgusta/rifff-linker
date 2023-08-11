import {css} from 'fresh_emotion';
import {md} from 'styles';
import { PageProps } from "$fresh/server.ts";
import { RifffWad } from "types";
import Layout from "@components/Layout.tsx";
import RifffCard from "@islands/RifffCard.tsx";
import StatBlock from "@components/StatBlock.tsx";

const btnHoldCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 12rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid white;
  background-color: #4a5568;
  &:hover {
    background-color: #1a202c;
  }
`;

const innerContCss = css`
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;
  ${md} {
    max-width: 28rem;
  }
`
const headTitleCss=`
  max-width: 32rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: white;
  text-align: center;
`;

const btnLinkCss = css`text-align: center;color: #f6e05e;`;

const fullWidthCss = css`width: 100%;`

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
      <div class={fullWidthCss}>
        <h1 class={headTitleCss}>{rifffData.title}</h1>
        <div class={innerContCss}>
          <RifffCard rifff={rifff} background={rifffData.display_image} />
          <div class={btnHoldCss}><a class={btnLinkCss} href={`endlesss://sharedrifff/${rifffData.rifff_id}`}>Open in Endlesss</a></div>
          <StatBlock stats={stats} />
        </div>
      </div>
    </Layout>
  );
}
