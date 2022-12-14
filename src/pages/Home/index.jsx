/* eslint-disable jsx-a11y/no-distracting-elements */
import { Box, useTheme } from "@mui/material";
import React from "react";
import Body from "../../components/Body";
import Slider from "./components/Sliders";
import GroupTop from "./components/GroupTop";
import { AppHeader } from '../../components'

const Home = () => {
  const theme = useTheme();
  return (
      <Box>
          <Body theme={theme} display="flex">
              <AppHeader />
              <Slider theme={theme} />
              <GroupTop />
          </Body>
      </Box>
  )
};

export default Home;
