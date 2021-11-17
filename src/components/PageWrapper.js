import { Container, Toolbar, Typography } from "@mui/material"
import { connect } from "react-redux"
import { Box } from "@mui/system"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Footer from "./Footer"
import Seo from "./seo"

const PageWrapper = ({ isMobile, title, children, img }) => {
  if (img) {
    img = getImage(img)
  }
  return (
    <>
      <Seo title={title} />
      <Toolbar />
      {img && <GatsbyImage image={img} />}
      <Box py={2}>
        <Container>
          <Typography
            variant={isMobile ? "h2" : "h1"}
            variantMapping={{ h1: "h2" }}
          >
            {title}
          </Typography>
          {children}
        </Container>
      </Box>
      <Box py={2}>
        <Footer />
      </Box>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(PageWrapper)
