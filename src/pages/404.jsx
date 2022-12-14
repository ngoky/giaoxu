import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { purple } from '@mui/material/colors'

const primary = purple[500]

const NotFoundPage = () => {
    const history = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (history.length > 0) {
                history(-1)
            } else {
                history('/home')
            }
        }, 2000)
    }, [history])
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: primary
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
        </Box>
    )
}

export default NotFoundPage
