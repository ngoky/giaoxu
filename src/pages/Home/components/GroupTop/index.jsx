import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../../../../local-storage/posts/post.service";
import DEF from "../../../../utils/news.data";

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

const TopNewRow = ({ post, theme, handler }) => {
  return (
    <ListItem
      key={post.id}
      disablePadding
      title={post.title}
      onClick={() => handler(post.id)}
    >
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
            <Link href={`news/${post.id}`} text="Read more">
              Read more
            </Link>
          </Grid>
        </Item>
      </ListItemButton>
    </ListItem>
  );
};

const TopNews = ({ post, theme, handler }) => {
  return (
    <ListItem
      key={post.id}
      disablePadding
      title={post.title}
      onClick={() => handler(post.id)}
    >
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
    </ListItem>
  );
};

const NewsArray = (props) => {
  const { posts, typeId, handler } = props;
  const post = posts.length > 0 ? posts[0] : null;
  return (
    <Box
      style={{
        background: "transparent",
        flexShrink: true,
        paddingLeft: 8,
        paddingRight: 8,
      }}
      flexDirection="row"
    >
      {post && <TopNewRow post={post} handler={handler} />}
      <Divider />
      {posts.map((x, index) => (
        <>
          {index > 0 && (
            <TopNews
              post={x}
              typeId={typeId}
              itemHeight={100}
              handler={handler}
            />
          )}
          {index !== 0 && index !== posts.length - 1 && <Divider />}
        </>
      ))}
    </Box>
  );
};

const ChildView = (props) => {
  const { data = [], handler } = props;
  return (
    <>
      <Typography>Latest News</Typography>
      <Grid container justifyContent="center">
        {data.map((x) => (
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
              <NewsArray posts={x.posts} typeId={x.id} handler={handler} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const GroupTop = () => {
  const [data = [], setData] = useState([]);
  useEffect(() => {
    PostService.fetchTop().then(
      (respose) => {
        setData(respose);
      },
      () => {
        // console.log(err);
        setData(DEF.newByType);
      }
    );
  }, []);

  const history = useNavigate();
  const viewDetail = (id) => {
    console.log(id);
    history(`/news/${id}`);
  };

  // const data = DEF.newByType()
  return <ChildView data={data} handler={viewDetail} />;
};
export default GroupTop;
