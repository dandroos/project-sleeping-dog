import React from "react"
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  List,
} from "@mui/material"
import "moment/locale/en-gb"
import {
  Cake,
  GenderMaleFemale,
  DogSide,
  Calendar,
  HumanChild,
  Dog as DogIcon,
  Cat,
  AlertCircleOutline,
} from "@mitch528/mdi-material-ui"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"

const Summary = ({
  breed,
  date_entered,
  dob,
  ppp,
  sex,
  sociability,
  language,
}) => {
  // const data = useStaticQuery(graphql`
  // {

  // }
  // `)

  const text = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "language" }, name: { eq: "dictionary" }) {
        childMarkdownRemark {
          frontmatter {
            dict_age {
              dict_age_en
              dict_age_es
            }
            dict_breed {
              dict_breed_en
              dict_breed_es
            }
            dict_came_in {
              dict_came_in_en
              dict_came_in_es
            }
            dict_cats {
              dict_cats_en
              dict_cats_es
            }
            dict_sex {
              dict_sex_en
              dict_sex_es
            }
            dict_ppp {
              dict_ppp_en
              dict_ppp_es
            }
            dict_children {
              dict_children_en
              dict_children_es
            }
            dict_dogs {
              dict_dogs_en
              dict_dogs_es
            }
            dict_profile {
              dict_profile_en
              dict_profile_es
            }
            dict_sociability {
              dict_sociability_en
              dict_sociability_es
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  const Detail = ({ label, children, Icon, noDivider }) => (
    <ListItem divider={!noDivider}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        <Icon sx={{ fontSize: 18 }} />
      </ListItemIcon>
      <ListItemText
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        primary={label}
        primaryTypographyProps={{ variant: "overline" }}
        secondary={children}
        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
      />
    </ListItem>
  )
  return (
    <>
      <Typography variant="h5">
        {text.dict_profile[`dict_profile_${language}`]}
      </Typography>
      <List>
        <Detail label={text.dict_age[`dict_age_${language}`]} Icon={Cake}>
          {dob}
        </Detail>
        <Detail
          label={text.dict_sex[`dict_sex_${language}`]}
          Icon={GenderMaleFemale}
        >
          {sex}
        </Detail>
        <Detail
          label={text.dict_breed[`dict_breed_${language}`]}
          Icon={DogSide}
        >
          {breed}
        </Detail>
        <Detail
          label={text.dict_ppp[`dict_ppp_${language}`]}
          Icon={AlertCircleOutline}
        >
          {ppp}
        </Detail>
        <Detail
          label={text.dict_came_in[`dict_came_in_${language}`]}
          Icon={Calendar}
          noDivider
        >
          {date_entered}
        </Detail>
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            mt: 2,
            py: 0,
            lineHeight: "inherit",
            background: "transparent",
          }}
        >
          {text.dict_sociability[`dict_sociability_${language}`]}
        </ListSubheader>
        <Detail
          label={text.dict_children[`dict_children_${language}`]}
          Icon={HumanChild}
        >
          {sociability.children}
        </Detail>
        <Detail label={text.dict_dogs[`dict_dogs_${language}`]} Icon={DogIcon}>
          {sociability.dogs}
        </Detail>
        <Detail
          label={text.dict_cats[`dict_cats_${language}`]}
          Icon={Cat}
          noDivider
        >
          {sociability.cats}
        </Detail>
      </List>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  language: state.language,
})

export default connect(mapStateToProps)(Summary)
