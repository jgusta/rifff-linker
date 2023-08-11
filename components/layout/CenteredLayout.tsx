import { JSX } from 'preact/jsx-runtime';
import { css, md, lg } from 'styles';

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  ${md} {
    height: auto;
    padding:  3rem 0 0 0 ;
    justify-content: center;
    padding-top: 3rem;
  }
  ${lg} {
    padding-top:0;
    padding-bottom:0;
  }
  `

const secBackCss = css`background-color: #1c1c1c;`;

export default function CenteredLayout(props: { children: JSX.Element[] }): JSX.Element {
  return (
    <section class={secBackCss}>
      <div class={style}>
        {props.children}
      </div>
    </section>
  );
}