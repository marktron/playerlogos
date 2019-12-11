import React from "react"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageGrid from "../components/image-grid"
// import styled from "styled-components"
// import {
//   border,
//   color,
//   compose,
//   flexbox,
//   layout,
//   space,
//   typography,
// } from "styled-system"

class SiteIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const logos = data.allContentfulAsset.edges
    const players = data.allContentfulPlayer.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Newest athlete logos" />
        <ImageGrid images={logos} src="index" players ={players} />
      </Layout>
    )
  }
}

export default SiteIndex

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
