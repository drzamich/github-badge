import styled, { createGlobalStyle } from 'styled-components';

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

export enum Breakpoint {
  Width = '400px',
  Height = '600px',
  TouchScreen = '(hover: none) and (pointer: coarse)',
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
  html, body, #root {
    height: 100%;
  }
  html {
    font-size: 14px;
  }
  body {
    background: ${Color.Mercury};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #root {
    width: 100%;
    max-width: 375px;
    display: flex;
    flex-direction: column;
    padding: 50px 0;

    @media (max-height: ${Breakpoint.Height}) {
      padding: 0;
    }
  }
`;

export const Heading = styled.h3`
  font-size: 1.286rem;
  line-height: 1.714rem;
  font-weight: 500;
  letter-spacing: 0.011rem;
`;

export const SRHeading = styled.h3`
  position: absolute;
  left: -1000px;
  top: -1000px;
`;
