import React, { useEffect } from "react";
import { useTheme, Box, Grid, Card, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import "./index.scss";
import { AppHeader, Body } from '@/components'
import { useAppDispatch, useAppSelector, postActions } from "@/storage";
import { connect } from "react-redux";
import { ShareButtons, ShortInfo } from "./components";
// const old = false
const NewsView = () => {
  const { id } = useParams();
  // const [data, setData] = useState();
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(postActions.fetchDetail(id))
    // postService.fetchTop().then(
    //   (response: any) => {
    //     setData(response);
    //   },
    //   () => {
    //     setData(newDetail(id));
    //   }
    // );
  }, [id]);
  const drawerWidth = 240;
  const theme = useTheme();
  const data: any = useAppSelector(state => state.posts.newDetail)
  return (
    data && (
      <Box sx={{ display: "flex" }} className="News">
        <Body theme={theme}>
          <AppHeader />
          <Grid container>
            <Grid item xs={12} sm={6} md={6} display="flex">
              <Card
                className="left-top-zone"
                sx={{
                  marginRight: { xl: "8px", md: "4px", sm: "4px", xs: 0 }
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
                className="new-info-box"
                flexDirection="column"
                sx={{
                  marginTop: { sm: 0, xs: "10px" },
                  marginLeft: { xl: "8px", md: "4px", sm: "2px", xs: 0 }
                }}
              >
                <Box className="title-box" title={data.title}>
                  <Card className="title">
                    <span>{data.title}</span>
                  </Card>
                </Box>
                <Divider />
                <Box className="short-info-box">
                  <ShortInfo news={data} type={undefined} />
                </Box>
                <Box className="share-box">
                  <Grid container justifyContent="flex-end" textAlign="end">
                    <ShareButtons
                      url="http://giaoxuvinhan.com/vi/news/Thong-bao/THONG-BAO-CHUA-NHAT-XXVI-THUONG-NIEN-25-9-2022-1727/"
                      className="Demo__some-network__share-button"
                      style={{ margin: 4 }}
                    />
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
                  textAlign: "justify"
                }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  padding: 0
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
};

export const News = connect()(NewsView);
