import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageGrid from "../components/image-grid"
import { rhythm } from "../utils/typography"

class PlayerTemplate extends React.Component {
  render() {
    const player = this.props.data.contentfulPlayer
    const siteTitle = this.props.data.site.siteMetadata.title
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
        <ImageGrid images={player.logo} src="playerPage" players={[player]} />
        
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
    }
    slug
  }
  }
`
