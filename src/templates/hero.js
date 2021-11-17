import { Dog, Newspaper } from "@mitch528/mdi-material-ui"
import { Button, Container, Grid, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import * as React from "react"
import { connect } from "react-redux"

import { Link } from "../components/Link"
import Seo from "../components/seo"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"

const Index = ({ dispatch, pageContext, isMobile, currLang }) => {
  const { language } = pageContext
  React.useEffect(() => {
    dispatch(setLocationId({ id: "home" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])
  const { text, heroImageQuery, heroImageMobileQuery } = useStaticQuery(graphql`
    {
      text: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            dict_home {
              dict_home_en
              dict_home_es
            }
          }
        }
      }

      heroImageQuery: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "hero-l" }
      ) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 2.2, quality: 100)
        }
      }
      heroImageMobileQuery: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "hero" }
      ) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 0.75, quality: 100)
        }
      }
    }
  `)

  const image = getImage(heroImageQuery)
  const mobileImage = getImage(heroImageMobileQuery)
  const bgImage = isMobile
    ? convertToBgImage(mobileImage)
    : convertToBgImage(image)

  const { internal } = useNav()

  return (
    <>
      <Seo
        title={
          text.childMarkdownRemark.frontmatter.dict_home[
            `dict_home_${language}`
          ]
        }
      />
      <BackgroundImage {...bgImage}>
        <Box
          minHeight="100vh"
          width="100%"
          display="flex"
          alignItems="flex-end"
        >
          <Box
            color={useTheme().palette.common.white}
            sx={{
              pb: 8,
              pt: 12,
              width: "100%",
              background: `linear-gradient(to top, ${
                useTheme().palette.common.black
              }, transparent)`,
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" variantMapping={{ h1: "h2" }}>
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography paragraph variant="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                quasi!
              </Typography>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    size="large"
                    endIcon={<Newspaper />}
                    component={Link}
                    to={`/${currLang}${
                      internal.filter((i) => i.id === "news")[0].url[currLang]
                    }`}
                  >
                    Latest news
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="large"
                    color="secondary"
                    component={Link}
                    to={`/${currLang}${
                      internal.filter((i) => i.id === "the-dogs")[0].url[
                        currLang
                      ]
                    }`}
                    endIcon={<Dog />}
                  >
                    View dogs
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </BackgroundImage>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  currLang: state.language,
})

export default connect(mapStateToProps)(Index)
