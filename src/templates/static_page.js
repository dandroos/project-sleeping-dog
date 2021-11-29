import { Button, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import PageWrapper from "../components/PageWrapper"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"

const Static_page = ({ data, pageContext, dispatch, isMobile }) => {
  React.useEffect(() => {
    dispatch(setLanguage(pageContext.language))
    if (pageContext.howTo) {
      dispatch(setLocationId({ staticPage: true, id: pageContext.location }))
    } else {
      dispatch(setLocationId({ id: pageContext.location }))
    }
  }, [])

  const { internal } = useNav()

  return (
    <PageWrapper
      title={
        pageContext.howTo
          ? internal
              .filter((i) => i.id === "how-to")[0]
              .options.filter((j) => j.id === pageContext.location)[0].label[
              pageContext.language
            ]
          : internal.filter((i) => i.id === pageContext.location)[0].label[
              pageContext.language
            ]
      }
      img={
        isMobile
          ? data.mobileImg.frontmatter.main_image
          : data.main.frontmatter.main_image
      }
    >
      <ReactMarkdown
        includeElementIndex
        children={
          data.main.frontmatter.content[`content_${pageContext.language}`]
        }
        components={{
          p: ({ ...props }) => (
            <Typography
              variant={props.index === 0 ? "lead" : undefined}
              paragraph
            >
              {props.children}
            </Typography>
          ),
          a: ({ ...props }) => <Link href={props.href}>{props.children}</Link>,
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">
          {
            data.dictionary.childMarkdownRemark.frontmatter.for_more_info[
              pageContext.language
            ]
          }
        </Typography>
        <Button>Contact us</Button>
      </Box>
    </PageWrapper>
  )
}

export default connect((state) => ({ isMobile: state.isMobile }))(Static_page)

export const pageQuery = graphql`
  query ($id: String!) {
    main: markdownRemark(id: { eq: $id }) {
      frontmatter {
        main_image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.7)
          }
        }
        content {
          content_en
          content_es
        }
      }
    }
    mobileImg: markdownRemark(id: { eq: $id }) {
      frontmatter {
        main_image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.5)
          }
        }
      }
    }
    dictionary: file(
      sourceInstanceName: { eq: "language" }
      name: { eq: "dictionary" }
    ) {
      childMarkdownRemark {
        frontmatter {
          for_more_info {
            en
            es
          }
        }
      }
    }
  }
`
