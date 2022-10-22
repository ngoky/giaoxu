import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Container,
  Link,
  Grid,
  Typography,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import "./right.view.scss";

const scrollableListRef = React.createRef();
const itemHeight = 60;
const Item = styled(Container, {
  shouldForwardProp: (prop: string) => prop !== "open",
})(({ theme }:any) => ({
  flexGrow: 1,
  flexDirection: "row",
  margin: 0,
  height: `${itemHeight}px`,
  maxHeight: `${itemHeight}px`,
  padding: "0px",
  // padding: theme.spacing(3),
  boxSizing: "border-box",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
}));
const placeSelectedItemInTheMiddle = (index: number) => {
  // const LIST_ITEM_HEIGHT = 60;
  const NUM_OF_VISIBLE_LIST_ITEMS = 5;
  const amountToScroll =
    itemHeight * (index - NUM_OF_VISIBLE_LIST_ITEMS / 2 + 0.5);
  // console.log('scroll to',amountToScroll, 'index: ', scrollableListRef.current)
  // scrollableListRef.current.scrollTo(amountToScroll, 0);
};
const useStyles = makeStyles(() => ({
  test: {
    changes: {
      // width: "100%",
      height: 300,
      maxWidth: 500,
      scrollbars: "none",
      padding: "0px",
      margin: 0,
      // backgroundColor: theme.palette.background.paper
    },
  },
}));

const Row = (props: any) => {
  const { index, theme, data, style } = props;
  const { posts, cIndex, handleChange } = data;
  const selected = index === cIndex;
  const text =
    posts.length > 0
      ? posts[index]
      : {
          photo: "haiz",
          title: "nan"
        };
  const changeIndex = (event: any) => {
    // currentIndex = index
    placeSelectedItemInTheMiddle(event);
    handleChange(event);
  };
  return (
    <ListItem
      key={index}
      disablePadding
      onClick={() => changeIndex(index)}
      style={style}
      selected={selected}
      title={text.title}
    >
      <ListItemButton style={{ maxHeight: "60px", margin: 0, padding: 0 }}>
        <ListItemIcon style={{ maxHeight: "60px" }}>
          <img src={text.photo} alt={text.photo} height={50} width={50} />
        </ListItemIcon>
        <Item theme={theme} style={{ paddingLeft: 2 }}>
          <div
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
              overflow: "hidden"
            }}
          >
            {text.title}
          </div>
          {/* <div>{text.title}</div> */}
          <Grid container justifyContent="flex-end">
            <Typography component='a' href={`news/${index}`}>
              Read more
            </Typography>
          </Grid>
        </Item>
      </ListItemButton>
    </ListItem>
  );
};

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

export const RightView = (props: any) => {
  const { posts, height, index = 0 } = props;
  const classes = useStyles();
  const [currentIndex = index, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(index);
    placeSelectedItemInTheMiddle(currentIndex);
  }, [index, currentIndex]);
  const changeIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  return (
      <FixedSizeList
        scrollbarsWidth={0}
        // className={classes.test.changes}
        ref={scrollableListRef}
        height={height}
        isScrolling={false}
        width={360}
        style={{ marginLeft: `30px`, padding: 0, scrollbarsWidth: "none" }}
        itemSize={itemHeight}
        itemData={{ posts, cIndex: currentIndex, handleChange: changeIndex }}
        itemCount={posts.length}
        useIsScrolling={false}
      >
        {Row}
      </FixedSizeList>  
  );
};
