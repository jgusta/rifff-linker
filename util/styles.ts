import { css, cx } from "fresh_emotion";
export { css, cx };

export const theme = {
  colors:{
    darkest:'#212121',
    dark:'#323232',
    darkaccent: '#0F7377',
    lightaccent: '#2CFFEC',
    text: '#D3FFFD'
  },
}

export const d1 = theme.colors.darkest;
export const d2 = theme.colors.dark;
export const d3 = theme.colors.darkaccent;
export const l1 = theme.colors.lightaccent;
export const t1 = theme.colors.text;




export const sm = css`@media (min-width: 640px)`;
export const md = css`@media (min-width: 768px)`;
export const lg = css`@media (min-width: 1024px)`;
export const xl = css`@media (min-width: 1280px)`;
export const xxl = css`@media (min-width: 1536px)`;



export const cardInput = css`
  border: 1px solid #d1d5db;
  background-color: #374151;
  border-color: #9CA3AF;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  color: #F9FAFB; 
  display: block;
  ${sm} {
    font-size: 0.875rem;
  }
  outline: none;
  padding: 0.625rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
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
  &::placeholder { color: #a5b4fc;}
  &:focus {  outline: none;}
  &:focus:active:hover{background-color: #1e40af;}
  &:focus:active{background-color: #1d4ed8;}
  &:focus:hover {background-color: #1e40af;}
  &:hover {  background-color: #1f6feb;}
  background-color: #2563eb;
  background-color: #3b82f6;
  border-radius: 0.5rem;
  border: 1px solid white;
  box-shadow: 0px 0px 0px 2px #60a5fa;
  color: white;
  font-weight: 500;
  ${sm} { font-size: 0.875rem;}
  outline: none;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.625rem;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
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
