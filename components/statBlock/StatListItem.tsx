import { css } from 'styles';

const statCss = css`
  color: #3b82f6;
  font-size: small;
  font-weight: bold;
`;

const liCss = css`
  display: flex;
  flex-direction: row;
  font-size: small;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  justify-content: space-between;
`;

const valueCss = css`
  color: #e5e7eb;
`;

export default function StatListItem(props: { stat: string, val: string }) {
  return (
    <li class={liCss}>
      <span class={statCss}>
        {props.stat}:
      </span>
      <span class={valueCss}>
        {props.val}
      </span>
    </li>
  )
}