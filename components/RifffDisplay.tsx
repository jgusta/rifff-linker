
import { tw } from "twind";
import { PageData } from "types"
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
    <div class={tw`max-w-screen-lg`}>
      <div class={tw`flex flex-col`}>
        <div className="container">
          <h1 class={tw`text-white`}>{title}</h1>
        </div>
        <div class="container">
          <div class=""><img src={display_image}/></div>
          {title} by {user} - {description} - {contributors}
          <RifffCard rifff={rifff_id}/>
        </div>
        
      </div>
    </div>
  );
}
