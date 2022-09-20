import { styled, ListItem, ListItemButton, ListItemIcon, Container, Link } from "@mui/material";
import { FixedSizeList } from 'react-window'
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect } from "react"

const scrollableListRef = React.createRef();
const itemHeight = 60
const Item = styled(Container, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    flexDirection:'row',
    margin: 0,
    height: `${itemHeight}px`,
    maxHeight: `${itemHeight}px`,
    // padding: theme.spacing(3),
    boxSizing: 'border-box',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden'
  }),
);
const placeSelectedItemInTheMiddle = index => {
    // const LIST_ITEM_HEIGHT = 60;
    const NUM_OF_VISIBLE_LIST_ITEMS = 5;
    const amountToScroll = itemHeight  * (index - NUM_OF_VISIBLE_LIST_ITEMS / 2 + 1);
    console.log('scroll to',amountToScroll, 'index: ', index)
    scrollableListRef.current.scrollTo(amountToScroll, 0);
};
const useStyles = makeStyles(() => ({
  test: {
    changes:
    {
      width: "100%",
      height: 300,
      maxWidth: 500,
      // backgroundColor: theme.palette.background.paper
    }
}
}));
const changeIndex = (index) => {
  placeSelectedItemInTheMiddle(index)
}
const Row = (props) => {
  const { index, theme, data, style } = props
  // console.log(index, data, props)
  const text = data.length > 0 ? data[index]:{
    photo: 'haiz',
    title: 'nan'
  }
  return (
    <ListItem key={index} disablePadding onClick={() => changeIndex(index)} style={style}>
      <ListItemButton style={{ width: '100%', "maxHeight": "60px" }}>
        <ListItemIcon style={{ "maxHeight": "60px" }}>
          <img src={text.photo} alt={text.photo} height={50} width={50} />
        </ListItemIcon>
        <Item theme={theme} height={50}>
          <div style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'}}>{text.title}</div>
          {/* <div>{text.title}</div> */}
          <Link text='Read more' />
        </Item>
      </ListItemButton>
    </ListItem>
  )
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  // style: PropTypes.object.isRequired
};

const RightView = (props) => {
  const { posts, height, index = 0 } = props
  const classes = useStyles();
  // console.log('test obj', posts.length)

  useEffect(() => {
    placeSelectedItemInTheMiddle(index)
  })
  // const post = posts.length > 0 ? posts[currentIndex] : null
  return (
    posts.length > 0 &&
      <FixedSizeList
        className={classes.test.changes}
        ref={scrollableListRef}
        height={height}
        style={{border:"solid 1px red"}}
        itemSize={itemHeight}
        itemData={posts}
        itemCount={posts.length}
      >
        {Row}
      </FixedSizeList>
  )
}
export default RightView