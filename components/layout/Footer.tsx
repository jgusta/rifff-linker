import {css} from 'fresh_emotion';

const inner = css`
  text-align: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 3rem;
  padding-left: 4rem;
  padding-right: 4rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const footerCss = css`
  background-color: #777777;
  font-size: 12px;
  margin-top: 12px;
  padding-top: 4px;
`;

export default function Footer({ tClass }: { tClass: string }) {
  return (
    <footer class={`${footerCss} ${tClass}`}>
      <div class={inner}>
        Disclaimer: This site is not affiliated with 
        or endorsed by Endlesss Limited. 'Endlesss' and the
        figurative 'SSS' logo are registered trade
        marks of Endlesss Limited.
      </div>
    </footer>
  )
}
