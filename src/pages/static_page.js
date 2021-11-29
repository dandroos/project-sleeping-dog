import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import PageWrapper from "../components/PageWrapper"
import { setLanguage } from "../redux/actions"

const Static_page = ({ dispatch, isMobile }) => {
  const data = useStaticQuery(graphql`
    {
      mobile: file(sourceInstanceName: { eq: "images" }, name: { eq: "hero" }) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1.5)
        }
      }
      desktop: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "hero" }
      ) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 2.75)
        }
      }
    }
  `)
  React.useEffect(() => {
    dispatch(setLanguage("en"))
  }, [])

  const tempContent = `Lorem, ipsum dolor sit amet **consectetur** adipisicing elit. Minima vel deleniti distinctio laboriosam consequatur rerum nisi quibusdam maiores perferendis dolores pariatur aut facere, ab dolorem amet ea quaerat temporibus cupiditate maxime, quidem eaque. Quasi commodi tenetur, quibusdam officiis alias nulla nostrum cupiditate, numquam suscipit ab eligendi atque facere nesciunt a!
    
Lorem ipsum dolor sit amet, consectetur adipisicing elit.Amet ullam voluptate beatae, ducimus illo sint ipsum, doloremque vitae aut laboriosam inventore, numquam veritatis architecto nisi quo ipsa nam.Ut velit rem cupiditate, eos earum facilis recusandae modi.Nam sequi, delectus, in earum magnam numquam aperiam vel perspiciatis quis quaerat amet neque voluptate deleniti modi necessitatibus! Recusandae nam a mollitia repudiandae.
    `
  return (
    <PageWrapper
      title="Title"
      img={
        isMobile ? data.mobile.childImageSharp : data.desktop.childImageSharp
      }
    >
      <Typography>
        <ReactMarkdown children={tempContent} />
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Want to know more?</Typography>
        <Button>Contact us</Button>
      </Box>
    </PageWrapper>
  )
}

export default connect((state) => ({ isMobile: state.isMobile }))(Static_page)
