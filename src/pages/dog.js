import PageWrapper from "../components/PageWrapper"
import { Button, CardActionArea, Grid, Typography } from "@mui/material"
import React from "react"
import dog from "../temp/dog"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ImageAlbum } from "@mitch528/mdi-material-ui"
import Gallery from "../components/dog/Gallery"
import { connect } from "react-redux"
import { setShowGallery } from "../redux/actions"
import Sharer from "../components/Sharer"
import Summary from "../components/dog/Summary"

const Dog = ({ dispatch, isMobile }) => {
  const { imgs, thumbnails } = useStaticQuery(graphql`
    {
      imgs: allFile(filter: { relativeDirectory: { eq: "bungle" } }) {
        nodes {
          id
          childImageSharp {
            gatsbyImageData(quality: 100, transformOptions: { fit: CONTAIN })
          }
        }
      }
      thumbnails: allFile(filter: { relativeDirectory: { eq: "bungle" } }) {
        nodes {
          id
          childImageSharp {
            gatsbyImageData(height: 40, width: 40)
          }
        }
      }
    }
  `)

  const images = imgs.nodes.map((i) => {
    return {
      id: i.id,
      image: i,
      thumb: thumbnails.nodes.filter((t) => {
        return i.id === t.id
      })[0],
    }
  })

  const handleOpenGallery = () => {
    dispatch(setShowGallery(true))
  }

  return (
    <>
      <Gallery images={images} />
      <PageWrapper title={dog.name}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Summary />
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <>
              <CardActionArea>
                <GatsbyImage
                  alt="Dog"
                  image={getImage(imgs.nodes[0])}
                  onClick={handleOpenGallery}
                />
              </CardActionArea>
              <Button
                fullWidth
                endIcon={<ImageAlbum />}
                sx={{ mt: 1 }}
                onClick={handleOpenGallery}
              >
                View {images.length - 1} more photos
              </Button>
            </>
          </Grid>
          <Grid item xs={12} order={3}>
            <Typography variant="h6" align="center">
              Share
            </Typography>
            <Sharer align="center" />
          </Grid>

          <Grid item xs={12} order={4}>
            <Typography variant="h5">Description</Typography>
            <Typography>{dog.description}</Typography>
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
})
export default connect(mapStateToProps)(Dog)
