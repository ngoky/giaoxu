import { Box, Grid, styled } from "@mui/material";
import ReactSlick from 'react-slick'
import React, { useEffect } from "react"

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const carouselHeight = 300
// const Main = styled(Grid, { shouldForwardProp: (prop) => prop !== 'open' })(
//   () => ({
//     flexGrow: 1,
//     display: 'grid',
//     direction: 'column',
//     flexDirection: 'column',
//     // flexDirection:'column',
//     height: carouselHeight,
//     // columns: 3,
//     // padding: theme.spacing(3),
//     boxSizing: 'border-box',
//     // transition: theme.transitions.create('margin', {
//     //   easing: theme.transitions.easing.sharp,
//     //   duration: theme.transitions.duration.leavingScreen,
//     // }),
//   }),
// );

// const GridChild = styled(Grid, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({theme}) => ({
//     // flexGrow: 1,
//     // display: 'grid',
//     direction: 'column',
//     height: carouselHeight,
//     display: { xs: 'none', md: 'flex' },
//     // gridTemplateColumns: repeat(3, 0),
//     columns: 12,
//     padding: theme.spacing(1),
//     // boxSizing: 'border-box',
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   }),
// );

const Layout = styled(Grid, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    margin: 0,
    // padding: theme.spacing(3),
    boxSizing: 'border-box',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
);

const images = [
  {
    id:2,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/9e196b28-98ce-47d1-8e80-1f163ac8f5fb.jpg",
    label: "image1"
  },
  {
    id:1,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/8a356d44-aaec-4ab9-b654-208e5ceeb6ff.jpg",
    label: "image2"
  },
  {
    id:2,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/9e196b28-98ce-47d1-8e80-1f163ac8f5fb.jpg",
    label: "image1"
  },
  {
    id:1,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/8a356d44-aaec-4ab9-b654-208e5ceeb6ff.jpg",
    label: "image2"
  },
  {
    id:2,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/9e196b28-98ce-47d1-8e80-1f163ac8f5fb.jpg",
    label: "image1"
  },
  {
    id:1,
    photo:
      "https://imagens.nxplay.com.br/video_thumb/8a356d44-aaec-4ab9-b654-208e5ceeb6ff.jpg",
    label: "image2"
  }
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: true,
    slickPrevious: true,
    swipe: true,
}

const Slider = () => {
    // const theme = useTheme()
    let index=0
    const beforeChange = (_, newIndex) => {
        index = newIndex
        console.log(newIndex, new Date())
    }

    useEffect(() => {
     console.log('eo');
   });
  return (
    <Box sx={{flexGrow: 1, marginBottom: '60px'}}>
      <Grid container height={300} sx={{flexDirection: 'column'}}>
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /> */}
        <Grid item xs={0} md={3} xl={3} sx={{display: { xs: 'none', md: 'flex' }}}>{images[index].label}</Grid>
        <Layout item xs={12} md={6} xl={6}>
          <ReactSlick
            height={300}
            settings={settings}
            dots
            infinite
            speed={1000}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={2000}
            slickNext
            slickPrevious
            swipe
            beforeChange={beforeChange}
          >
            {images.map(element => (
              <div key={element.label}>
                <img
                  src={element.photo}
                  alt={element.label}
                  style={{
                    borderRadius: "15px",
                    height: "300px",
                    display: "block",
                    overflow: "hidden",
                    width: "100%"
                }}
                />
              </div>))}
          </ReactSlick>
        </Layout>
        <Grid item xs={0} md={3} xl={3} sx={{display: { xs: 'none', md: 'flex' }}}>ttt</Grid>
      </Grid>
    </Box>
  );
}

export default Slider