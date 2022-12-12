import { tw } from 'twind';

type Props = {
  src: string
  alt?: string
  ahref?: string
}
export default (props: Props) => {
  const {ahref, src, alt} = props
  return (
  <a href={ahref} class={tw`mt-6 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white`}>
    <img class="w-32 mr-2" src={src} alt={alt} />
  </a>
)}