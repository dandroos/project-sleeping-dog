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
import React from "react"
import ContactForm from "../components/ContactForm"
import PageWrapper from "../components/PageWrapper"

const Contact = () => {
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
        <Typography>"{summary}..."</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <PageWrapper title="Contact">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="warning" variant="outlined">
            Before contacting us, please read the guides below for common
            queries. Thank you.
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Common queries</Typography>
          <ContactReason summary="I want to report a lost dog">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum,
            quaerat aspernatur praesentium possimus suscipit dolor eius? At
            dolorum distinctio, placeat eos doloremque ipsum ea laudantium, in
            molestias eveniet soluta quidem consequuntur aliquid, nesciunt
            repudiandae? Itaque est modi nemo architecto adipisci quibusdam
            tempora. Velit ex itaque reiciendis maiores quaerat tenetur,
            provident inventore aliquid eum labore excepturi ipsa aspernatur quo
            quod. Nobis.
          </ContactReason>
          <ContactReason summary="I have found a loose dog">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit iste pariatur corporis officiis culpa. Eos rem quo
            quos ipsum reiciendis excepturi dicta tenetur veritatis molestiae
            dolor inventore, quas perferendis, at ad obcaecati voluptatum quae
            sequi ut! Commodi molestiae recusandae animi sed libero sequi
            dolorem aut totam dolore, error facilis laborum maxime corporis
            repudiandae esse similique sint mollitia atque nulla corrupti!
          </ContactReason>
          <ContactReason summary="I have seen a dog in bad condition. Can you pick it up?">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit iste pariatur corporis officiis culpa. Eos rem quo
            quos ipsum reiciendis excepturi dicta tenetur veritatis molestiae
            dolor inventore, quas perferendis, at ad obcaecati voluptatum quae
            sequi ut! Commodi molestiae recusandae animi sed libero sequi
            dolorem aut totam dolore, error facilis laborum maxime corporis
            repudiandae esse similique sint mollitia atque nulla corrupti!
          </ContactReason>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            You can contact us via Facebook Messenger or by email.
          </Typography>
        </Grid>
        <ContactButton
          primary="Messenger"
          secondary="fuerteventuradogrescue"
          click={() => console.log("Messenger clicked")}
          Icon={FacebookMessenger}
        />
        <ContactButton
          primary="Email"
          secondary="info@fuerteventuradogrescue.org"
          click={() => console.log("Email clicked")}
          Icon={Email}
        />
        <Grid item xs={12}>
          <Typography gutterBottom>
            You can also send us a message by completing and submitting the
            below form...
          </Typography>
          <ContactForm />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default Contact
