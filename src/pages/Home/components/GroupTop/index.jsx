import React, { useEffect, useState } from "react"
import { Box, Card, Grid, Typography } from "@mui/material"
import PostService from "../../../../local-storage/posts/post.service";
import DEF from "../default.slide";

const NewsArray = (props) => {
    const {posts, typeId} = props
    return (
      <Box style={{background:'yellow', padding:4}} flexDirection="row">
        {
            posts.map(
                (x, index) => (
                  <Box key={`${typeId}${x.id}`} style={{background:'cyan'}} display={index % 1 === 0? 'block': 'none'}>                    
                    <Typography component="a" href={`news/${typeId}/${x.id}`}>{x.title}</Typography>
                  </Box>
                )
            )
        }
      </Box>
    )
}

const ChildView = (props) => {
    const {data = []} = props
    return(
      <Grid container justifyContent="center">
        {data.map((x) => (
          <Grid key={x.id} item xl={3} md={4} xs={12} style={{padding:4}}>
            <Box style={{background:'yellow', padding:4}} flexDirection="row">
              <Card style={{background:'green', padding:4}}>
                <Typography component='h2'>{x.name}</Typography>            
              </Card>
              <NewsArray posts={x.posts} typeId={x.id} />
            </Box>
          </Grid>
            )
        )}
      </Grid>
    )
}

const GroupTop = () => {
    const [data = [], setData] = useState()
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