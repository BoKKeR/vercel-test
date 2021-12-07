import { createGlobalStyle } from 'styled-components'
import { getMediaQuery } from './breakpoints'
import { MOBILE_CSS_VARIABLES_STRING } from './mobile'
import { CSS_VARIABLES_STRING, getCSSVar } from './variables'

const GlobalStyle = createGlobalStyle`
  :root {
    ${CSS_VARIABLES_STRING}

    ${getMediaQuery('mobile')} {
      ${MOBILE_CSS_VARIABLES_STRING}
    }
  }

  html {
    height: 100%;
  }

  body {
    background-color: ${getCSSVar('color_background')};
    color: ${getCSSVar('color_text')};
    font-size: ${getCSSVar('font_size')};
    font-family: ${getCSSVar('font_family')};
    font-weight: ${getCSSVar('font_weight')};
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #__next {
    height: 100%;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  pre {
    white-space: pre-wrap;
  }

  #modal {
    position: relative;
    z-index: 16;
  }
`

export default GlobalStyle
