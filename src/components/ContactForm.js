import { Box, Button, Grid, Snackbar, TextField, Alert } from "@mui/material"
import React from "react"
import { Send } from "@mitch528/mdi-material-ui"
import { connect } from "react-redux"
import { graphql, useStaticQuery } from "gatsby"

const ContactForm = ({ language }) => {
  const { dictionary, staticContent } = useStaticQuery(graphql`
    {
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            dict_email {
              dict_email_en
              dict_email_es
            }
            dict_name {
              dict_name_en
              dict_name_es
            }
            dict_message {
              dict_message_en
              dict_message_es
            }
            dict_send {
              dict_send_en
              dict_send_es
            }
            dict_phone {
              dict_phone_en
              dict_phone_es
            }
          }
        }
      }
      staticContent: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "contact_us" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_us_contact_form_message_sent {
              contact_us_contact_form_message_sent_en
              contact_us_contact_form_message_sent_es
            }
            contact_us_contact_form_message_failed {
              contact_us_contact_form_message_failed_en
              contact_us_contact_form_message_failed_es
            }
          }
        }
      }
    }
  `)

  const data = {
    ...dictionary.childMarkdownRemark.frontmatter,
    ...staticContent.childMarkdownRemark.frontmatter,
  }
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [toast, setToast] = React.useState({
    open: false,
    msg: "",
    severity: "success",
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        setToast({
          open: true,
          msg: data.contact_us_contact_form_message_sent[
            `contact_us_contact_form_message_sent_${language}`
          ],
          severity: "success",
        })
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        setToast({
          open: true,
          msg: data.contact_us_contact_form_message_failed[
            `contact_us_contact_form_message_failed_${language}`
          ],
          severity: "error",
        })
      )
  }
  return (
    <>
      <form
        name="contact"
        action="#"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={data.dict_name[`dict_name_${language}`]}
              name="name"
              required
              id="name"
              onChange={handleChange}
              value={fields.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={data.dict_email[`dict_email_${language}`]}
              name="email"
              required
              id="email"
              type="email"
              onChange={handleChange}
              value={fields.email}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label={data.dict_phone[`dict_phone_${language}`]}
              name="phone"
              id="phone"
              onChange={handleChange}
              value={fields.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              required
              label={data.dict_message[`dict_message_${language}`]}
              name="message"
              id="message"
              onChange={handleChange}
              value={fields.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Send />}
            type="submit"
            size="large"
          >
            {data.dict_send[`dict_send_${language}`]}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert variant="filled" severity={toast.severity}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default connect((state) => ({
  language: state.language,
}))(ContactForm)
