import React, { useEffect, useState } from "react";
import { useTheme, Box, Grid, Card, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import postService from "../../storage/posts/post.service";
import Body from "../../components/Body";
import { newDetail } from "../../utils/news.data";
import "./index.scss";
import ShareButtons from "./components/ShareButtons";
import ShortInfo from "./components/ShortInfo";
import { AppHeader } from "../../components";
import { useDispatch, useSelector } from 'react-redux'
import { postActions } from 'storage/actions'
import useWindowSize from 'hooks/useWindowSize'
// const old = false
const News = () => {
    const { id } = useParams()
    //const [data, setData] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(postActions.fetchDetail(id))
        // postService.fetchTop().then(
        //   (respose) => {
        //     setData(respose);
        //   },
        //   () => {
        //     setData(newDetail(id));
        //   }
        // );
    }, [dispatch, id])
    const data = useSelector((state) => state.posts.newDetail || {})
    const drawerWidth = 240
    const theme = useTheme()
    return (
        data && (
            <Box sx={{ display: 'flex' }} className="News">
                <Body theme={theme} width={drawerWidth}>
                    <AppHeader />
                    <Grid container>
                        <Grid item xs={12} sm={6} md={6} display="flex">
                            <Card
                                className="left-top-zone"
                                sx={{
                                    marginRight: {
                                        xl: '8px',
                                        md: '4px',
                                        sm: '4px',
                                        xs: 0
                                    }
                                }}
                            >
                                <img
                                    src={data.photo}
                                    alt={data.title}
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px'
                                    }}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                className="new-info-box"
                                flexDirection="colume"
                                sx={{
                                    marginTop: { sm: 0, xs: '10px' },
                                    marginLeft: {
                                        xl: '8px',
                                        md: '4px',
                                        sm: '2px',
                                        xs: 0
                                    }
                                }}
                            >
                                <Box className="title-box" title={data.title}>
                                    <Card className="title">
                                        <span>{data.title}</span>
                                    </Card>
                                </Box>
                                <Divider />
                                <Box className="short-info-box">
                                    <ShortInfo news={data} />
                                </Box>
                                <Box className="share-box">
                                    <Grid
                                        container
                                        justifyContent="flex-end"
                                        textAlign="end"
                                    >
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
                                    marginTop: '16px',
                                    spacing: '',
                                    display: 'inline-block',
                                    textAlign: 'justify'
                                }}
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    padding: 0
                                }}
                            >
                                <div
                                    className="html-content"
                                    dangerouslySetInnerHTML={{
                                        __html: data.content
                                    }}
                                />
                            </Container>
                        </Grid>
                    </Grid>
                </Body>
            </Box>
        )
    )
}

export default News;
