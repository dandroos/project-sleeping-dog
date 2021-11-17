import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
} from "@mui/material"
import React from "react"
import PageWrapper from "../components/PageWrapper"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { InformationVariant } from "@mitch528/mdi-material-ui"
import { Link } from "../components/Link"
import getDogAge from "../util/getDogAge"

const TheDogs = () => {
  const tempDog = {
    name: "Fido",
    age: getDogAge(new Date(2021, 3, 1)),
    sex: "M",
  }
  const { img } = useStaticQuery(graphql`
    {
      img: file(sourceInstanceName: { eq: "images" }, name: { eq: "temp" }) {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1)
        }
      }
    }
  `)

  const DogCard = ({ dogData }) => (
    <Card elevation={0} variant="outlined" sx={{ position: "relative" }}>
      <CardActionArea component={Link} to="/dog">
        <Fab
          size="small"
          color="primary"
          sx={{ position: "absolute", top: 15, right: 15, zIndex: 50 }}
          component={Link}
          to="/dog"
        >
          <InformationVariant />
        </Fab>
        <CardMedia>
          <GatsbyImage image={getImage(img)} />
        </CardMedia>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3">{dogData.name}</Typography>
          <Typography>
            {dogData.sex === "M" ? "Male" : "Female"}
            {` | `}
            {dogData.age}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )

  return (
    <PageWrapper title="The Dogs">
      <Typography paragraph>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat quo
        facere quidem blanditiis eius minus officia autem hic, fugit animi?
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DogCard dogData={tempDog} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DogCard dogData={tempDog} />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default TheDogs
