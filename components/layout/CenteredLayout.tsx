import { JSX } from 'preact/jsx-runtime';

export default function CenteredLayout (props: { children: JSX.Element[] }): JSX.Element {
  return (
  <section class="bg-gray-900">
    <div class=" flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {props.children}
    </div>
  </section>);
}