import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { purple } from '@mui/material/colors';

const primary = purple[500]; 

const NotFoundPage = () => {
  const history = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      history(-1)
    }, 2000)
  }, [])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
    </Box>
  )
}

export default NotFoundPage;
