/* eslint-disable jsx-a11y/no-distracting-elements */
import { Box, useTheme } from "@mui/material";
import React from "react";
import { AppHeader, Body } from '@/components'
import { GroupTop, Slider } from "./components";

const Home = () => {
  const theme = useTheme();
  return (
      <Box>
          <Body theme={theme} >
              <AppHeader />
              <Slider theme={theme} />
              <GroupTop />
          </Body>
      </Box>
  )
};

export default Home;
