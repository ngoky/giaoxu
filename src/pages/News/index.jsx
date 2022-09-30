import React, { useEffect, useState } from "react";
import { useTheme, Box, Grid, Card, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import postService from "../../local-storage/posts/post.service";
import Body from "../../components/Body";
import DEF from "../../utils/news.data";
import "./index.css";
import "./test.less"

// const old = false
const News = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const author = {
    name: "Người đến từ nơi ấy",
  };

  useEffect(() => {
    postService.fetchTop().then(
      (respose) => {
        setData(respose);
      },
      () => {
        setData(DEF.newDetail(id));
      }
    );
  }, []);
  const drawerWidth = 240;
  const theme = useTheme();
  return (
    data && (
      <Box sx={{ display: "flex" }} className="News">
        <Body theme={theme} width={drawerWidth}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={6} display="flex">
              <Card
                sx={{
                  width: "100%",
                  maxHeight: "250px",
                  marginRight: { xl: "8px", md: "4px", sm: "4px", xs: 0 },
                }}
              >
                <img
                  src={data.photo}
                  alt={data.title}
                  style={{ width: "100%", maxHeight: "200px" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{
                  marginLeft: { xl: "8px", md: "4px", sm: "2px", xs: 0 },
                  width: "100%",
                  height: "100%",
                  background: "red",
                }}
              >
                <Box
                  flexDirection="row"
                  className="News"
                  style={{
                    width: "100%",
                    background: "red",
                    borderRadius: 8,
                  }}
                >
                  <Box>
                    <Card
                      className="title"
                      style={{
                        background: "yellow",
                        padding: "4px 8px 4px 8px",
                      }}
                    >
                      {data.title}
                    </Card>
                  </Box>
                  <Divider />
                  <Grid container justifyContent="flex-end" textAlign="end">
                    <Grid item xs={12} sm={10} md={8} xl={6}>
                      <Grid container>
                        <Grid item xl={4} xs={4} justifyContent="flex-end">
                          Author
                        </Grid>
                        <Grid item xl={8} xs={8} justifyContent="flex-start">
                          {author.name}
                        </Grid>
                        <Grid item xl={4} xs={4} justifyContent="flex-end">
                          Ngày Đăng
                        </Grid>
                        <Grid item xl={8} xs={8} justifyContent="flex-end">
                          Ngày 20 Tháng 3
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{}}>
                    <Grid container justifyContent="flex-end" textAlign="end">
                      <TwitterShareButton
                        url="http://giaoxuvinhan.com/vi/news/Thong-bao/THONG-BAO-CHUA-NHAT-XXVI-THUONG-NIEN-25-9-2022-1727/"
                        className="Demo__some-network__share-button"
                        style={{ marginRight: 4 }}
                      >
                        <TwitterIcon size={30} round />
                        {/* Facebookでshare */}
                      </TwitterShareButton>
                      <FacebookShareButton
                        url="http://giaoxuvinhan.com/vi/news/Thong-bao/THONG-BAO-CHUA-NHAT-XXVI-THUONG-NIEN-25-9-2022-1727/"
                        className="Demo__some-network__share-button"
                        style={{
                          marginRight: 4,
                        }}
                      >
                        <FacebookIcon size={30} round />
                        {/* Facebookでshare */}
                      </FacebookShareButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Container
                sx={{
                  margin: 0,
                  marginTop: "16px",
                  spacing: "",
                  display: "inline-block",
                  textAlign: "justify",
                }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  padding: 0,
                }}
              >
                {data.content}
              </Container>
            </Grid>
          </Grid>
        </Body>
      </Box>
    )
  );
  // return (old ? <PersistentDrawerLeft /> : <NewPersistentDrawerLeft />)
};

export default News;
