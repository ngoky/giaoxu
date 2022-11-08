import { useTheme, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MenuOpen, Menu } from "@mui/icons-material";
import Banner from "./components/Banner";
import Routers from './routes'

import './App.scss'
import LeftDrawer from './components/Drawable'
import Display from './components/Display'
import MenuLayout from './components/MenuButton'
import './translation/i18n'
import Notification from './components/Notification'
import { AppBar } from './components'
import useWindowSize from 'hooks/useWindowSize'

const drawerWidth = 240
const menuButtonWidth = 40
const App = () => {
    const size = useWindowSize()

    const theme = useTheme()
    const [open, setOpen] = useState()
    console.log('re-render app')

    const openHandler = (mark) => {
        setOpen(mark)
        document.body.style.overflow = mark ? 'hidden' : 'auto'
    }
    return (
        // <Suspense fallback="loading">
        <Box display="flex" className="App">
            <LeftDrawer
                theme={theme}
                width={drawerWidth}
                open={open}
                handleDrawer={openHandler}
            />
            <Display theme={theme} open={open} width={drawerWidth}>
                <header className="App-header">
                    <Banner theme={theme}>
                        <img
                            src="https://image.shutterstock.com/image-illustration/3d-illustration-conceptual-wood-cross-600w-679159084.jpg"
                            alt="banner"
                            width="100%"
                            height="100px"
                        />
                    </Banner>
                    <AppBar theme={theme} open={open} />
                </header>
                <div
                    className="content"
                    style={{
                        position: 'relative',
                        //margin: `0 ${menuButtonWidth}px 0 ${menuButtonWidth}px`,
                        overflow: 'hidden',
                        '--window-width': `${size.width}px`
                    }}
                >
                    {/* <AppHeader /> */}
                    <BrowserRouter>
                        <Routers />
                    </BrowserRouter>
                </div>
            </Display>
            <MenuLayout
                open={open}
                width={drawerWidth}
                style={{
                    background: `${open ? 'black' : 'transparent'}`,
                    width: `${open ? '100%' : `${menuButtonWidth}px`}`,
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    opacity: 0.8,
                    textAlign: 'center',
                    scrollBehavior: 'unset',
                    visibility: 'invisible',
                    width: '0px'
                }}
            >
                <Button
                    onClick={() => openHandler(!open)}
                    style={{
                        background: `${open ? 'blue' : 'transparent'}`,
                        maxWidth: `${menuButtonWidth}px`,
                        minWidth: `${menuButtonWidth}px`,
                        padding: 0,
                        width: '0px',
                        visibility: 'hidden'
                    }}
                    title="open menu"
                >
                    {(open && <MenuOpen />) || <Menu />}
                </Button>
            </MenuLayout>
            <Notification />
        </Box>
        // </Suspense>
    )
}

export default App
