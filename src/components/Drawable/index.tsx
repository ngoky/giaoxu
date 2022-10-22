import React from "react"
import { Drawer, useTheme, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {DrawerHeader} from "../DrawerHeader"

export const LeftDrawer = ({width = 0, open, handleDrawer, top = 0}: {width: number, open: boolean, handleDrawer: any, top: number}) => {
    const theme = useTheme()
    return (
      <Drawer
        sx={{
            // height: 'calc(100% - 100px)', 
            top:0,
            width,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                // height: 'calc(100% - 100px)', 
                top,
                width,
                boxSizing: 'border-box',
            },
          }}
        // BackdropProps={{invisible: true}}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader theme={theme}>
          <IconButton onClick={() => handleDrawer(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List title='Mail'>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            ))}
        </List>
      </Drawer>
    )
}
