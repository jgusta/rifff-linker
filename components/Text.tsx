import { JSX } from 'preact';
import { css } from 'fresh_emotion';

export type Textish = {
  children: string
}
const styles = {
  white: css``
}

export default function Text(props:Textish){
  const text = props.children;
  if (typeof text === 'string'){
    return <span>{text}</span>
  }
}
