import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"

const Footer = () => {
  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear()
    return currentYear !== 2021 ? `2021 - ${currentYear}` : 2021
  }
  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <StaticImage
          src="../images/fuertecode_logo_black.png"
          width={50}
          placeholder="none"
          quality={100}
          alt=""
          style={{ marginBottom: 5 }}
        />
        <Typography variant="caption" display="block">
          All content &copy; {getCopyrightYear()} Fuertecode
        </Typography>
      </Box>
    </Container>
  )
}

export default Footer
