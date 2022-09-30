import { Box, Grid, styled } from "@mui/material";
import ReactSlick from "react-slick";
import React, { useEffect, useState } from "react";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostService from "../../../../local-storage/posts/post.service";
import DEF from "../../../../utils/news.data";
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
  autoplay: true,
  autoplaySpeed: 2000,
  slickNext: true,
  slickPrevious: true,
  swipe: true
};
const sliderHeight = 300
const Slider = () => {
  const [topPost = [], setTopPost] = useState();
  const [index, setIndex] = useState(0);
  const beforeChange = (_, newIndex) => {
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
            sm={0}
            md={3}
            xl={3}
            sx={{ display: { xs: "none", sm: 'none', md: "flex" } }}
          >
            <LeftView post={topPost[index]} index={index} height={sliderHeight} />
          </Grid>
          <Layout item xs={12} sm={8} md={6} xl={6}>
            <ReactSlick
              settings={settings}
              dots
              infinite
              speed={1000}
              slidesToScroll={1}
              initialSlide={index}
              autoplay
              autoplaySpeed={2000}
              slickNext
              slickPrevious
              swipe
              beforeChange={beforeChange}
            >
              {topPost.map((element) => (
                <div key={element.label} style={{width:'100%'}}>
                  <img
                    src={element.photo}
                    alt={element.label}
                    style={{
                      borderRadius: "15px",
                      height: `${sliderHeight}px`,
                      maxHeight: `${sliderHeight}px`,
                      display: "block",
                      overflow: "hidden",
                      margin: 'auto',
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
            sm={4}
            md={3}
            xl={3}
            sx={{ display: { xs:'none', sm:"flex", md: "flex" } }}
          >
            <RightView posts={topPost} index={index} height={sliderHeight} style={{border: "solid 1px black"}} />
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default Slider;
