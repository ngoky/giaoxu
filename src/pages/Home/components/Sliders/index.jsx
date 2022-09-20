import { Box, Grid, styled } from "@mui/material";
import ReactSlick from "react-slick";
import React, { useEffect, useState } from "react";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostService from "../../../../local-storage/posts/post.service";
import DEF from "./default.slide";
import LeftView from "./left.view";
import RightView from "./right.view";

const Layout = styled(Grid, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    margin: 0,
    // padding: theme.spacing(3),
    boxSizing: "border-box",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
);
const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 2000000,
  slickNext: true,
  slickPrevious: true,
  swipe: true
};
const sliderHeight = 300
const Slider = () => {
  // const theme = useTheme()
  const [topPost = [], setTopPost] = useState();
  // const [post = null] = useState(null)
  const [index, setIndex] = useState(0);
  const beforeChange = (_, newIndex) => {
    // index = newIndex
    // console.log(newIndex, new Date())
    setIndex(newIndex);
  };

  useEffect(() => {
    PostService.fetchTop().then(
      (respose) => {
        setTopPost(respose);
      },
      () => {
        // console.log(err);
        setTopPost(DEF.fetchTop);
      }
    );
  }, []);
  return (
    topPost.length > 0 && (
      <Box sx={{ flexGrow: 1, marginBottom: "60px" }}>
        <Grid container maxHeight={sliderHeight} height={sliderHeight} sx={{ flexDirection: "column" }}>
          <Grid
            item
            xs={0}
            md={3}
            xl={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <LeftView post={topPost[index]} index={index} height={sliderHeight} />
          </Grid>
          <Layout item xs={12} md={6} xl={6}>
            <ReactSlick
              settings={settings}
              dots
              infinite
              speed={1000}
              slidesToShow={1}
              slidesToScroll={1}
              // autoplay
              // autoplaySpeed={20000}
              slickNext
              slickPrevious
              swipe
              beforeChange={beforeChange}
            >
              {topPost.map((element) => (
                <div key={element.label}>
                  <img
                    src={element.photo}
                    alt={element.label}
                    style={{
                      borderRadius: "15px",
                      maxHeight: {sliderHeight},
                      display: "block",
                      overflow: "hidden",
                      width: "100%"
                    }}
                  />
                </div>
              ))}
            </ReactSlick>
          </Layout>
          <Grid
            item
            xs={0}
            md={3}
            xl={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <RightView posts={topPost} index={index} height={sliderHeight} />
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default Slider;
