import { Box, CssBaseline } from "@mui/material"
import React from "react"
import { AppHeader } from '../../components'
import Body from "../../components/Body"

// const old = false
const Contact = () => {
  const drawerWidth = 240

  return (
      <Box sx={{ display: 'flex' }}>
          <AppHeader />
          <CssBaseline />
          <Body width={drawerWidth} />
      </Box>
  )
}

export default Contact