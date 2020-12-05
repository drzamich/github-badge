import { createGlobalStyle } from 'styled-components';

export enum Color {
  Black = '#000000',
  Gray = '#828282',
  Mercury = '#E5E5E5',
  PurpleHeart = '#452CDC',
  Porcelain = '#F0F3F4',
  RoyalBlue = '#2F80ED',
  SilverChalice = '#9E9E9E',
  White = '#FFFFFF',
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  html, body, #root {
    height: 100%;
  }
  html {
    font-size: 14px;
  }
  body {
    background: ${Color.Mercury};
  }
`;
