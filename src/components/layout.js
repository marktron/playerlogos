import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import { ThemeProvider } from "styled-components"
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

const PageWrapper = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

PageWrapper.defaultProps = {
  backgroundColor: "background",
}
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: BaseTheme.fonts.sansSerif,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <ThemeProvider theme={BaseTheme}>
        <PageWrapper>
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </PageWrapper>
      </ThemeProvider>
    )
  }
}

export default Layout
