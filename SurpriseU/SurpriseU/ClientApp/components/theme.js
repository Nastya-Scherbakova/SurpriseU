const css = String.raw

export const color = {
    primary: '#3897f0',

    backgroundLight: '#fafafa',
    backgroundWhite: 'rgba(255,255,255,0.8)',

    text: '#262626',
    textLight: '#999',

    border: '#efefef',
    borderDark: '#e6e6e6',

    success: '#35DC83',
    danger: '#DC3545'
}

export const font = {
    formElement: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

export const globalStyles = css`
  html, body {
    font-size: 12px;
    font-family: ${font.formElement};
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    background-color: #fff;
  }
  a {
    text-decoration: none;
  }
  a:visited, a:focus, a:active {
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
`