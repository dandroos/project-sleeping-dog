import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import moment from "moment"
import "moment/locale/en-gb"
import React from "react"
import { connect } from "react-redux"
import { Link } from "../components/Link"
import PageWrapper from "../components/PageWrapper"

const News = () => {
  const article = {
    date: new Date(),
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    excerpt:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit tenetur, ipsam aliquam nisi consectetur voluptatibus animi? Assumenda facere quidem porro odio nostrum consectetur maiores obcaecati.",
  }
  let { tempImg } = useStaticQuery(graphql`
    {
      tempImg: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "temp" }
      ) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1.85)
        }
      }
    }
  `)

  tempImg = getImage(tempImg)

  const TempArticle = () => (
    <Card elevation={0} square variant="outlined">
      <CardActionArea component={Link} to="/article">
        <CardMedia>
          <GatsbyImage image={tempImg} />
        </CardMedia>
        <CardContent sx={{ px: 2 }}>
          <Typography variant="h4" variantMapping={{ h4: "h3" }}>
            {article.title}
          </Typography>
          <Typography variant="overline">
            {moment(article.date).format("LL")}
          </Typography>
          <Typography>
            {article.excerpt + ` `}

            <Link underline="hover" to="/article">
              Read more...
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
  return (
    <PageWrapper title="News">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TempArticle />
        </Grid>
        <Grid item xs={12}>
          <TempArticle />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(News)
