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

export default function StatListItem({ stat, value }: { stat: string, value: string}) {
  return (
    <li class={liCss}>
      <span class={statCss}>
        {stat}:
      </span>
      <span class={valueCss}>
        {value}
      </span>
    </li>
  );
}