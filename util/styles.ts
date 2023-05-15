import { css, cx } from "@emotion";
export {css,cx};
export const sm = css`@media (min-width: 640px)`;
export const md = css`@media (min-width: 768px)`;
export const lg = css`@media (min-width: 1024px)`;
export const xl = css`@media (min-width: 1280px)`;
export const xxl = css`@media (min-width: 1536px)`;

export const cardOuter = css`w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700`;

export const cardInput = css`
border: 1px solid #d1d5db;
${sm} {
  font-size: 0.875rem;
}
border-radius: 0.5rem;
outline: none;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
display: block;
width: 100%;
padding: 0.625rem;
background-color: #374151;
border-color: #9CA3AF;
color: #F9FAFB; 
&::placeholder { 
  opacity: 1;
  color: #9CA3AF;
}
&:focus {
  border-color: #60A5FA;
  box-shadow: 0 0 0 3px rgba(95, 154, 255, 0.5);
}
`;

export const buttonInput = css`
  width: 100%;
  color: white;
  border: 1px solid white;
  outline: none;
  border-radius: 0.5rem;
  font-weight: 500;
  ${sm} {
    font-size: 0.875rem;
  }
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  text-align: center;
  background-color: #3b82f6;
  transition: background-color 0.2s ease-in-out;
  &:hover {  background-color: #1f6feb;}
  &:focus {  outline: none;
  box-shadow: 0px 0px 0px 2px #60a5fa;
  background-color: #2563eb;}
  &:focus:hover {background-color: #1e40af;}
  &:focus:active{background-color: #1d4ed8;}
  &:focus:active:hover{background-color: #1e40af;}
  &::placeholder { color: #a5b4fc;}
`;

export const labelstyle = css`
  color: "white";
  paddingLeft: 0.5em;
  paddingRight: 0.5em;
`;

export const liststyle = css`
  color: "white";
  fontSize: "0.9em";
  lineHeight: "1.4em";
  paddingLeft: "20px";
`;