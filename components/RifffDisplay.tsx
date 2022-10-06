import { useState } from "preact/hooks";
import { tw } from "twind";
import { PageData } from "@api/rifffData.ts";
export default function RifffDisplay(props: { rifffData: PageData }) {
  const { rifffData } = props;
  const {
    user,
    title,
    rifff_id,
    display_image,
    description,
    contributors,
    likes,
    bpm,
    bars,
    seconds,
  } = rifffData;

  return (
    <div class="max-w-screen-lg">
      <div class="flex flex-col">
        <h1 class="text-white">{title}</h1>
        <div class="container"></div>
        {title} by {user} - {description} - {contributors}
      </div>
    </div>
  );
}
