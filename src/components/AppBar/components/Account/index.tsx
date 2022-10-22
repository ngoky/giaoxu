import React, { useState } from 'react'

import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { userActions, useAppDispatch } from '@/storage'
import './index.scss'
const AccountView = (props: any) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const { t } = useTranslation()
    const { auth } = props
    const [user = { email: '', password: '' }, setUser] = useState()

    const userMenu: [] = t('menus.user-setting', { returnObjects: true })
    userMenu.filter(
        (x: any) => x.authorize === (auth !== null)
    )

    const dispatch = useAppDispatch()

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = (event: any) => {
        setAnchorElUser(null)
        if (event === 'login') {
            dispatch(userActions.login())
        } else if (event === 'logout') {
            dispatch(userActions.logout())
        }
    }

    const handleChange = (e: any) => {
        const userRef: any = { ...user }
        userRef[e.target.id] = e.target.value
        console.log(userRef)
        setUser({ ...userRef })
        console.log('change Event', user)
    }

    const submitLogin = () => {
        setAnchorElUser(null)
        dispatch(userActions.login())
    }

    return (
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={
                                auth
                                    ? auth.avatar
                                    : '/static/images/avatar/2.jpg'
                            }
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-user-setting"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {userMenu.length > 0 &&
                        userMenu.map((setting: any) => (
                            <MenuItem
                                key={setting.to}
                                onClick={() =>
                                    handleCloseUserMenu(setting.event)
                                }
                            >
                                <Typography textAlign="center">
                                    {setting.text}
                                </Typography>
                            </MenuItem>
                        ))}
                    {userMenu.length <= 0 && (
                        <div className="Account">
                            <form className="form">
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    className="edit-text"
                                    id="email"
                                    required
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    className="edit-text"
                                    // formControlProps={{
                                    //   fullWidth: true
                                    // }}
                                    onChange={handleChange}
                                />
                                <CssBaseline />
                                <Button
                                    type="button"
                                    color="primary"
                                    className="form__custom-button"
                                    onClick={() => submitLogin()}
                                >
                                    Log in
                                </Button>
                            </form>
                        </div>
                    )}
                </Menu>
            </Box>
        </Toolbar>
    )
}

const mapState = (state: any) => {
    return { userLogin: state.users.userLogin }
}

const actionCreators = {
    login: userActions.login
}

export const Account = connect(mapState, actionCreators)(AccountView)
