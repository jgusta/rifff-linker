import { tw } from "twind"
export default function OpenButton(props: { content: string }) {
  return (
    <button
      class={tw`block my-4 mx-auto px-4 py-2 bg-gray-900`}
      onClick={(e) => {
        window.open(props.content, "_blank")
      }}>
      Preview Link <img style="display:inline-block;" src="/images/arrow.svg" />
    </button>
  )
}
