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
import { connect } from "react-redux"
import { setLanguage, setLocationId } from "../redux/actions"
import useNav from "../hooks/useNav"

const TheDogs = ({ dispatch, pageContext, currLang }) => {
  const { language } = pageContext

  React.useEffect(() => {
    dispatch(setLocationId({ id: "the-dogs" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])

  const dogData = useStaticQuery(graphql`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "dogs" }, extension: { eq: "md" } }
      ) {
        nodes {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              dog_breed {
                dog_breed_en
                dog_breed_es
              }
              dog_date_entered
              dog_date_of_birth
              dog_description {
                dog_description_en
                dog_description_es
              }
              dog_images {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
              dog_name
              dog_ppp
              dog_sex
              dog_sociability {
                dog_sociability_cats
                dog_sociability_children
                dog_sociability_dogs
              }
            }
          }
        }
      }
    }
  `).allFile.nodes

  const { internal } = useNav()
  const dogs = dogData.map(({ childMarkdownRemark }) => ({
    name: childMarkdownRemark.frontmatter.dog_name,
    sex: childMarkdownRemark.frontmatter.dog_sex,
    image: getImage(childMarkdownRemark.frontmatter.dog_images[0]),
    breed: childMarkdownRemark.frontmatter.dog_breed[`dog_breed_${language}`],
    age: getDogAge(childMarkdownRemark.frontmatter.dog_date_of_birth, language),
    entered: childMarkdownRemark.frontmatter.dog_date_entered,
    slug: `/${language}${
      internal.filter((i) => i.id === "the-dogs")[0].url[language]
    }${childMarkdownRemark.fields.slug}`,
  }))

  const title = useNav().internal.filter((i) => i.id === "the-dogs")[0].label[
    language
  ]

  const DogCard = ({ slug, image, name, sex, age }) => (
    <Card elevation={0} variant="outlined" sx={{ position: "relative" }}>
      <CardActionArea component={Link} to={slug}>
        <Fab
          size="small"
          color="primary"
          sx={{ position: "absolute", top: 15, right: 15, zIndex: 50 }}
          component={Link}
          to={slug}
        >
          <InformationVariant />
        </Fab>
        <CardMedia>
          <GatsbyImage image={image} />
        </CardMedia>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3">{name}</Typography>
          <Typography>
            {sex === "0" ? "Male" : "Female"}
            {` | `}
            {age}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )

  return (
    <PageWrapper title={title}>
      <Typography paragraph>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat quo
        facere quidem blanditiis eius minus officia autem hic, fugit animi?
      </Typography>
      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <Grid item xs={12} md={6}>
            <DogCard {...dog} />
          </Grid>
        ))}
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DogCard dogData={tempDog} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DogCard dogData={tempDog} />
        </Grid>
      </Grid> */}
    </PageWrapper>
  )
}

export default connect((state) => ({
  currLang: state.language,
}))(TheDogs)
