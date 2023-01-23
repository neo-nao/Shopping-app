import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html{
    scroll-behavior: smooth;
}

*,
*::before,
*::after {
    margin:0;
    padding:0;
    box-sizing:border-box;
    border:0;
    outline:0;
    list-style:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}

:root{
    --black: #000;
    --white: #fff;
    --primary-font: 'Roboto Condensed',-apple-system,sans-serif;
    --geist-foreground: var(--black);
    --max-width: 1200px;
    --menu-font-size: 19px;
    --gray: #919191;
    --light-gray:#d1d1d1;
    --color-transition: color 0.3s ease;
    --boxshadow-transition: box-shadow 0.3s ease;
    ;
    --placecenter-transform: translate(-50%, -50%);
}

body {
  font-family: var(--primary-font),-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden auto;
}

a {
  text-decoration: none;
  color: $black;
  -webkit-user-drag:none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

#container {
  min-height: 100vh;
  position: relative;
}
`;
