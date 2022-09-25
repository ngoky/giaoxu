import React, { useEffect, useState } from "react"
import { Box, Card, Grid, styled, Typography, useTheme } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostService from "../../../../local-storage/posts/post.service";
import DEF from "../news.data";

const LinkRowStyle = styled(Box)(
  () => ({
    flexGrow: 1,
    margin: 0,
    boxSizing: 'border-box',
  }),
);

const LinkRow = (props) => {
  const {post, typeId} = props
  const theme = useTheme()
  return (
    <LinkRowStyle theme={theme} key={`${typeId}${post.id}`} style={{background:'cyan'}} display="flex">
      <Typography style={{height: 50}} component="div" href={`news/${typeId}/${post.id}`}><VisibilityIcon /> {post.title}</Typography>
    </LinkRowStyle>
  )
}

const NewsArray = (props) => {
    const {posts, typeId} = props
    const post = posts.length > 0 ?  posts[0]: null
    return (
      <Box style={{background:'yellow', marginLeft:8, flexShrink: true}} flexDirection="row">
        {post &&        
          <Box key={`${typeId}${post.id}`} style={{background:'cyan', overflow:'hidden'}} flexDirection="column">
            <img src={post.photo} width={50} height={50} alt={post.photo} />                  
            <Typography component="a" href={`news/${post.id}`}>{post.title}</Typography>
          </Box>}
        {
            posts.map(
                (x, index) => (
                  index > 0 && <LinkRow post={x} typeId={typeId} />
                )
            )
        }
      </Box>
    )
}

const ChildView = (props) => {
    const {data = []} = props
    return(
      <>
        <Typography>Latest News</Typography>
        <Grid container justifyContent="center">
          {data.map((x) => (
            <Grid key={x.id} item xl={3} md={4} sm={6} xs={12} style={{ borderRadius: '0 0 ', background:'white' }}>
              <Box style={{margin:2, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, border: '1px solid red', background:'cyan', height:'98%'}} flexDirection="row">
                <Card style={{background:'green', borderRadius: '0 0 0 0'}}>
                  <Typography component='h2'>{x.name}</Typography>            
                </Card>
                <NewsArray posts={x.posts} typeId={x.id} />
              </Box>
            </Grid>
            )
        )}
        </Grid>
      </>
    )
}

const GroupTop = () => {
    const [data = [], setData] = useState([])
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
    },[])
    // const data = DEF.newByType()
    return(
      <ChildView data={data} />
    )
}
export default GroupTop