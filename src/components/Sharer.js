import { Facebook, Gmail, Twitter, Whatsapp } from "@mitch528/mdi-material-ui"
import { IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const Sharer = ({ align = "left", language }) => {
  const ShareButton = ({ click, platform, color, Icon }) => (
    <Tooltip title={platform}>
      <IconButton onClick={click} color={color}>
        <Icon />
      </IconButton>
    </Tooltip>
  )
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: align,
      }}
    >
      <ShareButton
        click={() => console.log("Facebook clicked")}
        platform="Facebook"
        color="facebook"
        Icon={Facebook}
      />
      <ShareButton
        click={() => console.log("WhatsApp clicked")}
        platform="WhatsApp"
        color="whatsapp"
        Icon={Whatsapp}
      />
      <ShareButton
        click={() => console.log("Twitter clicked")}
        platform="Twitter"
        color="twitter"
        Icon={Twitter}
      />
      <ShareButton
        click={() => console.log("Gmail clicked")}
        platform="Email"
        color="google"
        Icon={Gmail}
      />
    </Box>
  )
}

export default Sharer
