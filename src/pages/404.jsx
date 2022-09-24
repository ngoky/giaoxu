import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { purple } from '@mui/material/colors';

const primary = purple[500]; 

const NotFoundPage = () => {
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      history.back()
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
