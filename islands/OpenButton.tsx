import { css } from 'fresh_emotion';
const buttonCss = css`
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #111827;`;

export default function OpenButton(props: { content: string }) {
  return (
    <button
      class={buttonCss} onClick={(e) => {
        window.open(
          props.content,
          '_blank'
        );
      }}
    >
      Preview Link <img style="display:inline-block;" src="/images/arrow.svg" />
    </button>
  );
}