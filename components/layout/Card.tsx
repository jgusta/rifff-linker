import { JSX } from 'preact/jsx-runtime';
import { cardOuter } from 'styles';
import { tw } from 'twind';

export default function Card(props: { children: JSX.Element[] }): JSX.Element {
  return (
    <div class={tw(cardOuter)}>
      <div class="space-y-4 md:space-y-6 sm:p-8">
        {props.children}
      </div>
    </div>)
}