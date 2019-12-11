import React from "react"
import { Link } from "gatsby"

import { createGlobalStyle, ThemeProvider } from "styled-components"
import { BaseTheme } from "../utils/theme"
import styled from "styled-components"
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from "styled-system"

const GlobalStyle = createGlobalStyle`
  html, body{
    ${color} ${flexbox} ${layout} ${space} ${typography}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const PageWrapper = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

PageWrapper.defaultProps = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}

const PageHeader = styled("header")(
  compose(border, color, flexbox, layout, space, typography)
)

PageHeader.defaultProps = {
  borderTop: "solid 4px",
  borderColor: "pink",
  display: "flex",
  justifyContent: "center",
  p: 5,
}

const PageMain = styled("main")(
  compose(border, color, flexbox, layout, space, typography)
)

PageMain.defaultProps = {
  flexGrow: 1,
  p: 4
}

const PageFooter = styled("footer")(
  compose(border, color, flexbox, layout, space, typography)
)

PageFooter.defaultProps = {
  display: "flex",
  justifyContent: "center",
  p: 3,
  fontSize: 1,
}

const SiteLogo = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

SiteLogo.defaultProps = {
  //  display: "flex",
  //  justifyContent: "center"
}

const LogoLink = styled("span")(
  {
    "&:hover": {
      backgroundColor: "#ff8e3c", // TODO: Figure out how to use the theme.js value here
    },
  },
  compose(border, color, flexbox, layout, space, typography)
)

LogoLink.defaultProps = {
  backgroundColor: "nearBlack",
  color: "nearWhite",
  textDecoration: "none",
  borderRadius: 4,
  fontSize: 3,
  fontWeight: "black",
  lineHeight: "1",
  px: 4,
  py: 3,
  m: 4,
}

const FooterLink = styled("a")(
  {
    "&:hover": {
      color: "#d9376e", // TODO: Figure out how to use the theme.js value here
    },
  },
  compose(border, color, flexbox, layout, space, typography)
)

FooterLink.defaultProps = {
  color: "orange",
  fontWeight: "bold",
  ml: 2,
}

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <ThemeProvider theme={BaseTheme}>
        <GlobalStyle
          bg="background"
          lineHeight="1.45"
          color="text"
          fontFamily="sansSerif"
          fontSize="16px"
        />
        <PageWrapper>
          <PageHeader>
            <SiteLogo>
              <Link
                to={`/`}
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                }}
              >
                <LogoLink>{title}</LogoLink>
              </Link>
            </SiteLogo>
          </PageHeader>
          <PageMain>{children}</PageMain>
          <PageFooter>
            A site by{" "}
            <FooterLink
              href="https://markallen.io"
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
              }}
            >
              Mark Allen
            </FooterLink>
          </PageFooter>
        </PageWrapper>
      </ThemeProvider>
    )
  }
}

export default Layout
