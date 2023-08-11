import { JSX } from 'preact/jsx-runtime';
import { css } from "styles";

export const cardOuterCss = css`
  background-color: #1f2937;
  border-radius: 0.5rem;
  border: solid #4b5563 1px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 0rem;
  max-width: 28rem;
  padding: 0;
  width: 100%;
`;

const cardInnerCss = css`
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 2rem;
  @media (min-width: 768px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export default function Card(props: { children: JSX.Element[] }): JSX.Element {
  return (
    <div class={cardOuterCss}>
      <div class={cardInnerCss}>
        {props.children}
      </div>
    </div>)
}