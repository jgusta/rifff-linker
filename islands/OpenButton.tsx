import { tw } from "twind";
export default function OpenButton(props) {
  return (
    <button
      class={tw`block my-4 mx-auto px-4 py-2 bg-gray-900`}
      onClick={(e) => {
        window.open(
          props.content,
          '_blank'
        );
      }}
    >
      Preview Link <span class="material-icons">arrow_outwards</span>
    </button>
  );
}