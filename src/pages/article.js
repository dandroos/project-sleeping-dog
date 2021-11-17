import React from "react"
import PageWrapper from "../components/PageWrapper"
import { useStaticQuery, graphql } from "gatsby"
import { Divider, Typography } from "@mui/material"
import moment from "moment"
import "moment/locale/en-gb"
import { getImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { Box } from "@mui/system"
import Turndown from "turndown"
import parse, { domToReact } from "html-react-parser"
import Sharer from "../components/Sharer"

const Article = ({ isMobile }) => {
  const { raw_article, raw_featured_image_desktop, raw_featured_image_mobile } =
    useStaticQuery(graphql`
      {
        raw_article: file(
          sourceInstanceName: { eq: "articles_es" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              title
              date
            }
            html
          }
        }
        raw_featured_image_desktop: file(
          sourceInstanceName: { eq: "articles_es" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              featured_image {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 2.75
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
            }
          }
        }
        raw_featured_image_mobile: file(
          sourceInstanceName: { eq: "articles_es" }
          extension: { eq: "md" }
        ) {
          childMarkdownRemark {
            frontmatter {
              featured_image {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 1.5)
                }
              }
            }
          }
        }
      }
    `)

  const desktopImage = getImage(
    raw_featured_image_desktop.childMarkdownRemark.frontmatter.featured_image
  )
  const mobileImage = getImage(
    raw_featured_image_mobile.childMarkdownRemark.frontmatter.featured_image
  )
  const article = raw_article.childMarkdownRemark
  const turndown = new Turndown({ linkStyle: "referenced" })
  console.log(turndown.turndown(article.html))
  return (
    <PageWrapper
      title={article.frontmatter.title}
      img={isMobile ? mobileImage : desktopImage}
    >
      <Typography variant="overline">
        {moment(article.date).format("LL")}
      </Typography>
      <Box>
        <Sharer />
      </Box>
      <Divider sx={{ mb: 3 }} />
      {parse(article.html, {
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
})

export default connect(mapStateToProps)(Article)
