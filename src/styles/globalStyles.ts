import { createGlobalStyle } from 'styled-components';
import { bpgFont } from '../fonts';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'BPG Arial';
        src: url(${bpgFont}) format('truetype');
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'BPG Arial', sans-serif;
        background-color: ${({ theme }) => theme.colors.bg};
        

    }
`;
