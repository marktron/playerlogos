import React from "react"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
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
import Image from "gatsby-image"

const findPlayer = (players, activeLogoID) => {
  let foundPlayer = null
  players.find(player => {
    for (var logo of player.node.logo) {
      if (logo.id === activeLogoID) {
        foundPlayer = player.node
        return true
      }
    }
    return false
  })
  return foundPlayer
}

const LogoGrid = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

LogoGrid.defaultProps = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  maxWidth: 1200,
  mx: "auto",
}
const LogoTile = styled("a")(
  {
    "&:hover": {
      borderColor: "orange",
    },
  },
  compose(border, color, flexbox, layout, space, typography)
)

LogoTile.defaultProps = {
  borderRadius: 6,
  border: "solid 3px",
  borderColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 4,
  m: 4,
  backgroundColor: "white",
  color: "text",
}

const LogoImage = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

LogoImage.defaultProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: 200,
  maxWidth: 200,
  flexGrow: 1,
}

const TileTitle = styled("div")(
  compose(border, color, flexbox, layout, space, typography)
)

TileTitle.defaultProps = {
  marginTop: 4,
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const logos = data.allContentfulAsset.edges
    const players = data.allContentfulPlayer.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Newest athlete logos" />
        <LogoGrid>
          {logos.map(logo => {
            const currentPlayer = findPlayer(players, logo.node.id)
            return (
              <LogoTile
                key={logo.node.id}
                href={`/${currentPlayer.slug}`}
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                }}
              >
                <LogoImage>
                  <Image
                    fixed={logo.node.fixed}
                    alt={currentPlayer ? `Logo for ${currentPlayer.name}` : ""}
                  />
                </LogoImage>
                <TileTitle>{currentPlayer && currentPlayer.name}</TileTitle>
              </LogoTile>
            )
          })}
        </LogoGrid>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulAsset {
      edges {
        node {
          id
          fixed(width: 200, height: 200, resizingBehavior: PAD) {
            base64
            tracedSVG
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
          }
          localFile {
            extension
            publicURL
          }
        }
      }
    }
    allContentfulPlayer {
      edges {
        node {
          id
          name
          slug
          logo {
            id
          }
        }
      }
    }
  }
`
