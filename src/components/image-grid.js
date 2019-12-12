import React from "react"
import PropTypes from "prop-types"
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

const ImageGrid = props => {
  const { images, src, players } = props
  return (
    <LogoGrid>
      {images.map(logo => {
        // Handle different formatting structure for index and player pages
        const currentPlayer =
          players.length === 1 ? players[0] : findPlayer(players, logo.node.id)
        const currentPlayerLogo = logo.node ? logo.node : logo
        return (
          <LogoTile
            key={currentPlayerLogo.id}
            href={`/${currentPlayer.slug}`}
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
            }}
          >
            <LogoImage>
              {currentPlayerLogo.localFile.extension === "svg" ? (
                // gatsby-image can't handle svg files
                <img
                  src={currentPlayerLogo.localFile.publicURL}
                  alt={currentPlayer ? `Logo for ${currentPlayer.name}` : ""}
                />
              ) : (
                <Image
                  fixed={currentPlayerLogo.fixed}
                  alt={currentPlayer ? `Logo for ${currentPlayer.name}` : ""}
                />
              )}
            </LogoImage>
            {src !== "playerPage" && (
              <TileTitle>{currentPlayer && currentPlayer.name}</TileTitle>
            )}
          </LogoTile>
        )
      })}
    </LogoGrid>
  )
}

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
  src: PropTypes.string,
  players: PropTypes.array,
}

ImageGrid.defaultProps = {
  src: "",
  players: [],
}

export default ImageGrid
