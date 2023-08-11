import { css } from 'styles';
const playButtonImgCss = css`
  position:absolute;
  width:100%;
  height:100%;
  transform:translate(0%,-50%);
  `;
const playButtonCss = css`position:absolute;top:0;bottom:0;left:0;right:0;`;

export default function PlayButton({btnRef, rifffPlayer}) {
  return (
    <button ref={btnRef}
      onClick={(e) => { rifffPlayer.toggle() }}
      class={playButtonCss}
    >
      <img id="pbutton"
        class={playButtonImgCss}
        src="/images/play.svg" />
    </button>
  )
}