import { css } from 'styles';

const linkCss = css`  
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
`;

const imgCss = css`
  width: 8rem;
  margin-right: 0.5rem;
`;

type Props = {
  src: string
  alt?: string
  ahref?: string
}

export default function HeadingImage(props: Props) {
  const { ahref, src, alt } = props
  return (
    <a href={ahref} class={linkCss}>
      <img class={imgCss} src={src} alt={alt} />
    </a>
  )
}