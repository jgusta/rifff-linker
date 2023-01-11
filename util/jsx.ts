import { JSX } from 'preact/jsx-runtime';
import { isValidElement } from 'preact';

export type { JSX } from 'preact/jsx-runtime';
export type Textish = {
  children: string | string[] | JSX.Element | JSX.Element[]
}


const hasChildren = (
  element: JSX.Element
): element is JSX.Element =>
  isValidElement(element) && Boolean(element.props.children);

const childToString = (child: JSX.Element | string): string => {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }
  if (typeof child === 'string') {
    return child;
  }
  if (JSON.stringify(child) === '{}') {
    return '';
  }
  return (child as unknown as string).toString();
};

type singleThings = JSX.Element | string;
type arrayThings = Array<JSX.Element> | Array<string>
type allThings = singleThings | arrayThings;
const asText = (children: allThings): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  if (!(children instanceof Array) && isValidElement(children)) {
    return childToString(children);
  }

  if (!(children instanceof Array)) {
    return childToString(children);
  }

  if (children instanceof Array) {
    // deno-lint-ignore no-explicit-any
    return (children as any[]).reduce(
      (text: string, child: allThings) => {
        let newText = '';

        if (isValidElement(child)) {
          if (hasChildren(child)) {
            newText = asText((child.props.children as allThings));
          } else {
            newText = '';
          }
        } else {
          newText = childToString(child as singleThings);
        }

        return text.concat(newText);
      },
      ''
    )
  }

  return '';
};

export { asText };