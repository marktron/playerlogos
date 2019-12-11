import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"

class PlayerTemplate extends React.Component {
  render() {
    const player = this.props.data.contentfulPlayer
    const siteTitle = this.props.data.site.siteMetadata.title
    console.log("🔔 player",player)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={`${player.name} logos`} />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {player.name}
        </h1>
        <Image
                    fixed={player.logo[0].fixed}
                    // alt={currentPlayer ? `Logo for ${currentPlayer.name}` : ""}
                  />
        
      </Layout>
    )
  }
}

export default PlayerTemplate

export const pageQuery = graphql`
  query PlayerBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPlayer(slug: {eq: $slug}) {
    id
    name
    logo {
      id
      fixed(width: 600, height: 600, resizingBehavior: PAD) {
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
    }
    slug
  }
  }
`
