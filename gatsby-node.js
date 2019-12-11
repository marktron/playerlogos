const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const playerPage = path.resolve(`./src/templates/player.js`)
  return graphql(
    `
      {
        allContentfulPlayer(
          sort: { fields: updatedAt, order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    // `
    //   {
    //     allMarkdownRemark(
    //       sort: { fields: [frontmatter___date], order: DESC }
    //       limit: 1000
    //     ) {
    //       edges {
    //         node {
    //           fields {
    //             slug
    //           }
    //           frontmatter {
    //             title
    //           }
    //         }
    //       }
    //     }
    //   }
    // `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create player pages.
    const players = result.data.allContentfulPlayer.edges

    players.forEach((player, index) => {
      // const previous = index === players.length - 1 ? null : players[index + 1].node
      // const next = index === 0 ? null : players[index - 1].node

      createPage({
        path: player.node.slug,
        component: playerPage,
        context: {
          slug: player.node.slug,
          // previous,
          // next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
