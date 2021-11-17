import { Button, Typography } from "@mui/material"
import React from "react"

import { Link } from "../components/Link"
import PageWrapper from "../components/PageWrapper"

const about = () => {
  return (
    <PageWrapper title={"About"}>
      <Typography paragraph>This is just an example second page.</Typography>
      <Button component={Link} to="/">
        Back home
      </Button>
    </PageWrapper>
  )
}

export default about
