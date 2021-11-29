import {
  ChevronDown,
  Email,
  FacebookMessenger,
} from "@mitch528/mdi-material-ui"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Grid,
  ListItemText,
  Typography,
} from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import ContactForm from "../components/ContactForm"
import PageWrapper from "../components/PageWrapper"
import { setLocationId, setLanguage } from "../redux/actions"
import useNav from "../hooks/useNav"
import LocationMap from "../components/LocationMap"
import OpeningHours from "../components/OpeningHours"

const Contact = ({ dispatch, currLang, pageContext }) => {
  const { dictionary, content } = useStaticQuery(graphql`
    {
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            common_queries {
              en
              es
            }
            email {
              en
              es
            }
            name {
              en
              es
            }
            message {
              en
              es
            }
            send {
              en
              es
            }
            phone {
              en
              es
            }
          }
        }
      }
      content: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "contact_us" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_us_buttons_intro_text {
              contact_us_buttons_intro_text_en
              contact_us_buttons_intro_text_es
            }
            contact_us_common_queries_alert {
              contact_us_common_queries_alert_en
              contact_us_common_queries_alert_es
            }
            contact_us_contact_form_intro_text {
              contact_us_contact_form_intro_text_es
              contact_us_contact_form_intro_text_en
            }
            contact_us_common_queries {
              contact_us_common_queries_en {
                query
                response
              }
              contact_us_common_queries_es {
                query
                response
              }
            }
          }
        }
      }
    }
  `)

  const data = {
    ...dictionary.childMarkdownRemark.frontmatter,
    ...content.childMarkdownRemark.frontmatter,
  }

  const { internal } = useNav()

  React.useEffect(() => {
    dispatch(setLocationId({ id: "contact" }))
    if (currLang !== pageContext.language) {
      dispatch(setLanguage(pageContext.language))
    }
    //eslint-disable-next-line
  }, [])
  const ContactButton = ({ primary, secondary, click, Icon }) => {
    return (
      <Grid item xs={12} md={6}>
        <Button
          sx={{ pt: 1.5, flexDirection: "column" }}
          fullWidth
          size="large"
          onClick={click}
        >
          <Icon fontSize="large" />
          <ListItemText
            primary={primary}
            primaryTypographyProps={{ sx: { fontWeight: 900 } }}
            secondary={secondary}
            secondaryTypographyProps={{
              variant: "caption",
              sx: { textTransform: "lowercase" },
            }}
          />
        </Button>
      </Grid>
    )
  }

  const ContactReason = ({ children, summary }) => (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />}>
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <PageWrapper
      title={
        internal.filter((i) => i.id === "contact")[0].label[
          pageContext.language
        ]
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <LocationMap />
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
              <OpeningHours />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Alert severity="warning" variant="outlined">
            {
              data.contact_us_common_queries_alert[
                `contact_us_common_queries_alert_${pageContext.language}`
              ]
            }
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            {data.common_queries[pageContext.language]}
          </Typography>
          {data.contact_us_common_queries[
            `contact_us_common_queries_${pageContext.language}`
          ].map((i) => (
            <ContactReason summary={i.query}>{i.response}</ContactReason>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {
              data.contact_us_buttons_intro_text[
                `contact_us_buttons_intro_text_${pageContext.language}`
              ]
            }
          </Typography>
        </Grid>
        <ContactButton
          primary="Messenger"
          secondary="fuerteventuradogrescue"
          click={() => console.log("Messenger clicked")}
          Icon={FacebookMessenger}
        />
        <ContactButton
          primary={data.email[pageContext.language]}
          secondary="info@fuerteventuradogrescue.org"
          click={() => console.log("Email clicked")}
          Icon={Email}
        />
        <Grid item xs={12}>
          <Typography gutterBottom>
            {
              data.contact_us_contact_form_intro_text[
                `contact_us_contact_form_intro_text_${pageContext.language}`
              ]
            }
          </Typography>
          <ContactForm />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default connect((state) => ({
  currLang: state.language,
}))(Contact)
