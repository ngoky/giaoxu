import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  ListItemButton,
  ListItemIcon,
  styled,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import PostService from "../../../../storage/posts/post.service";
// import { newByType } from "../../../../utils/news.data";
import "./index.scss";
import { postActions } from "../../../../storage/actions";
import { connect, useDispatch, useSelector } from "react-redux";

const Item = styled(Container, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, itemHeight }) => ({
  flexGrow: 1,
  flexDirection: "row",
  margin: 0,
  height: `${itemHeight}px`,
  maxHeight: `${itemHeight}px`,
  padding: 0,
  // padding: theme.spacing(3),
  boxSizing: "border-box",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
}));

const TopNewRow = ({ post, theme }) => {
  return (
    <Typography title={post.title} component="a" href={`/news/${post.id}`}>
      <ListItemButton style={{ maxHeight: "60px", marginLeft: 10, padding: 0 }}>
        <ListItemIcon style={{ maxHeight: "60px" }}>
          <img src={post.photo} alt={post.photo} height={50} width={50} />
        </ListItemIcon>
        <Item theme={theme} height={50} style={{ paddingLeft: 2 }}>
          <div
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {post.title}
          </div>
          {/* <div>{text.title}</div> */}
          <Grid container justifyContent="flex-end">
            Read more
          </Grid>
        </Item>
      </ListItemButton>
    </Typography>
  );
};

const TopNews = ({ post, theme }) => {
  return (
    <Typography title={post.title} component="a" href={`news/${post.id}`}>
      <ListItemButton style={{ maxHeight: "60px", marginLeft: 0, padding: 0 }}>
        <ListItemIcon style={{ maxHeight: "60px", minWidth: 0 }}>
          <VisibilityIcon />
        </ListItemIcon>
        <Item theme={theme} height={50}>
          <Container
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginLeft: 8,
              padding: 0,
            }}
          >
            {post.title}
          </Container>
        </Item>
      </ListItemButton>
    </Typography>
  );
};

const NewsArray = (props) => {
  const { posts, typeId } = props;
  const post = posts && posts.length > 0 ? posts[0] : null;
  return (
    post && (
      <Box
        className="latest-news-box"
        style={{
          flexShrink: true,
        }}
        flexDirection="row"
      >
        {post && <TopNewRow post={post} />}
        <Divider />
        {posts.map((x, index) => (
          <div key={`${typeId}_${x.id}`}>
            <div id="parent-below" className="group-news-box">
              {index > 0 && (
                <TopNews
                  id="TopNews"
                  post={x}
                  typeId={typeId}
                  itemHeight={100}
                  // className="group-news-box"
                />
              )}
            </div>
            {index !== 0 && index !== posts.length - 1 && <Divider />}
          </div>
        ))}
      </Box>
    )
  );
};

const ChildView = (props) => {
  const { data = [] } = props
  console.log(data)
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("page.home.top.news.title")}</Typography>
      <Grid container justifyContent="center" className="GroupTop">
        {data && Array.isArray(data) &&
          data.map((x) => (
            <Grid
              key={x.id}
              item
              xl={3}
              md={4}
              sm={6}
              xs={12}
              style={{
                borderRadius: "0 0 ",
                background: "white",
                marginTop: 4,
                boxShadow: 12,
              }}
            >
              <Box
                style={{
                  margin: 2,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  border: "1px solid gray",
                  background: "white",
                  height: "98%",
                }}
                flexDirection="row"
              >
                <Card
                  style={{
                    background:
                      "linear-gradient(to right bottom,#82ffa1, #430089)",
                    borderRadius: "0 0 0 0",
                    padding: 8,
                    opacity: 0.8,
                  }}
                >
                  <Typography component="h2">{x.name}</Typography>
                </Card>
                <NewsArray posts={x.posts} typeId={x.id} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

const GroupTop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.fetchTypeTop());
  }, [dispatch]);
  const data = useSelector((state) => state.posts.typeTopNews);
  // console.log("render", data);
  return <ChildView id="ChildView" data={data} />;
};

const mapState = (state) => {
  return { posts: state.posts.typeTopNews };
};

const actionCreators = {
  fetchTypeTop: postActions.fetchTypeTop,
};
const ConnectedGroupTop = connect(mapState, actionCreators)(GroupTop);
export default ConnectedGroupTop;
