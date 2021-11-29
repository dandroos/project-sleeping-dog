import React from "react"
import PageWrapper from "../components/PageWrapper"
import { graphql } from "gatsby"
import { Divider, Typography } from "@mui/material"
import moment from "moment"
import "moment/locale/en-gb"
import "moment/locale/es"
import { getImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { Box } from "@mui/system"
import parse, { domToReact } from "html-react-parser"
import Sharer from "../components/Sharer"
import { setLanguage, setLocationId } from "../redux/actions"

const Article = ({ dispatch, pageContext, data, isMobile, currLang }) => {
  const { language } = pageContext

  const desktopImage = getImage(
    data.article_image_desktop.frontmatter.featured_image
  )
  const mobileImage = getImage(
    data.article_image_mobile.frontmatter.featured_image
  )

  React.useEffect(() => {
    dispatch(setLocationId({ id: "news" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])
  moment.locale(
    (() => {
      switch (language) {
        case "en":
          return "en-gb"
        case "es":
          return "es"
        default:
          return "en-gb"
      }
    })()
  )
  return (
    <PageWrapper
      title={data.article.frontmatter.title}
      img={isMobile ? mobileImage : desktopImage}
    >
      <Typography variant="overline">
        {moment(data.article.frontmatter.date).format("LL")}
      </Typography>
      <Box>
        <Sharer />
      </Box>
      <Divider sx={{ mb: 3 }} />
      {parse(data.article.html, {
        replace: (domNode) => {
          if (domNode.type === "tag" && domNode.name === "p") {
            return (
              <Typography paragraph>{domToReact(domNode.children)}</Typography>
            )
          }
        },
      })}
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  currLang: state.language,
})

export const pageQuery = graphql`
  query ($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
      html
    }
    article_image_desktop: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.7
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
    article_image_mobile: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.5
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
    og: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 627)
          }
        }
      }
    }
  }
`

export default connect(mapStateToProps)(Article)
