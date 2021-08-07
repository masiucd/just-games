import {css, Global} from "@emotion/react"

export const HEADER_HEIGHT = 5
export const FOOTER_HEIGHT = 5
export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        /* fonts */
        --nanum: "Nanum Gothic", sans-serif;
        --padauk: "Padauk", sans-serif;

        /* Colors */
        --color-text-primary: #7f5af0;
        --color-text-text: #212732;
        --color-text-white: #fff;
        --color-bg-background: hsla(0, 100%, 100%, 1);
        --color-bg-navigation: hsla(0, 0%, 100%, 0.9);
        --color-bg-overlay: hsla(0, 0%, 100%, 0.8);
        --color-bg-overlay-2: hsla(219, 50%, 10%, 0.8);
        --color-bg-black: #0e182a;
        --color-gray-100: #f0f2f7;
        --color-gray-200: #e2e7ed;
        --color-gray-300: #d8dee6;
        --color-gray-400: #c3ced8;
        --color-gray-500: #a0aec0;
        --color-gray-600: #718096;
        --color-gray-700: #4a5568;
        --color-gray-800: #293448;
        --color-gray-900: #1a202c;
        --color-react: #2cb67d;

        /* sizes */
        --h1: 3.052rem;
        --h2: 2.441rem;
        --h3: 1.953rem;
        --h4: 1.563rem;
        --h5: 1.25rem;
        --maxWidth: 970px;
        --header-height: ${HEADER_HEIGHT}rem;
        --footer-height: ${FOOTER_HEIGHT}rem;

        /* border-radius */
        --border-radius-s: 3px;
        --border-radius-m: 4px;
        --border-radius-l: 5px;
        --border-radius-xl: 6px;
        --border-radius-2xl: 8px;

        /* Elevations */
        --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-3xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      }

      *::before,
      *::after,
      * {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      html {
        font-size: 100%;
        font-family: var(--nanum);
      }
      body {
        height: 100%;
        box-sizing: border-box;
        font-weight: normal;
        line-height: 1.75;
        color: var(--color-text-text);
        background-color: var(--color-bg-background);
      }

      body[data-theme="light"] {
        --color-text-primary: #7f5af0;
        --color-text-text: #212732;
        --color-text-white: #fff;
        --color-bg-background: hsla(0, 100%, 100%, 1);
        --color-bg-navigation: hsla(0, 0%, 100%, 0.9);
        --color-bg-overlay: hsla(0, 0%, 100%, 0.8);
        --color-bg-overlay-2: hsla(219, 50%, 10%, 0.8);
        --color-bg-black: #0e182a;
        --color-gray-100: #f0f2f7;
        --color-gray-200: #e2e7ed;
        --color-gray-300: #d8dee6;
        --color-gray-400: #c3ced8;
        --color-gray-500: #a0aec0;
        --color-gray-600: #718096;
        --color-gray-700: #4a5568;
        --color-gray-800: #293448;
        --color-gray-900: #1a202c;
        --color-react: #2cb67d;

        /* Elevations */
        --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-3xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      }
      body[data-theme="dark"] {
        --color-text-primary: #f55f94;
        --color-text-text: #fff;
        --color-text-white: #fff;
        --color-bg-background: hsla(219, 50%, 11%, 1);
        --color-bg-navigation: hsla(219, 50%, 11%, 0.9);
        --color-bg-overlay: hsla(219, 50%, 11%, 0.8);
        --color-bg-overlay-2: hsla(0, 0%, 100%, 0.8);
        --color-bg-black: #0e182a;
        --color-gray-100: #132035;
        --color-gray-200: #222f44;
        --color-gray-300: #384357;
        --color-gray-400: #718096;
        --color-gray-500: #a0aec0;
        --color-gray-600: #cbd5e0;
        --color-gray-700: #e2e8f0;
        --color-gray-800: #edf2f7;
        --color-gray-900: #f7fafc;
        --color-react: #c26384;

        /* Elevations */
        --shadow-s: 0 1px 2px 0 rgba(, 0, 0, 0.05);
        --shadow-default: 0 1px 3px 0 rgba(, 0, 0, 0.1),
          0 1px 2px 0 rgba(, 0, 0, 0.06);
        --shadow-md: 0 0px 20px -6px rgba(0, 0, 0, 0.7);
        --shadow-lg: 0 0px 25px -6px rgba(0, 0, 0, 0.8);
        --shadow-xl: 0 0px 30px -6px rgba(0, 0, 0, 0.9);
        --shadow-2xl: 21px 21px 42px #1f1f1f, -21px -21px 42px #292929;
        --shadow-3xl: 21px 21px 55px #161616, -21px -21px 55px #323232;
        --shadow-inner: inset 0 2px 4px 0 rgba(, 0, 0, 0.06);
      }

      h1 {
        font-size: var(--h1);
      }
      h2 {
        font-size: var(--h2);
      }
      h3 {
        font-size: var(--h3);
      }
      h4 {
        font-size: var(--h4);
      }
      h5 {
        font-size: var(--h5);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 0.5rem;
        font-family: var(--padauk);
        font-weight: normal;
        line-height: 1.5;
      }

      p,
      ul,
      ol {
        line-height: 1.7;
        font-weight: 400;
        list-style: none;
        font-family: var(--nanum);
        margin-bottom: 0.25rem;
      }
      a {
        text-decoration: none;
        color: var(--color-text-text);
      }
    `}
  />
)
