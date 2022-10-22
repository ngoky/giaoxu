import { Grid } from "@mui/material";
import React from "react";
import { AnyAction } from "redux";

export const ShortInfo = (props: AnyAction) => {
  const {
    news: { author, createdAt, publishedBy }
  } = props;
  return (
    <Grid container justifyContent="flex-end" textAlign="end">
      <Grid item xs={12} sm={12} md={8} xl={4}>
        <Grid container>
          <Grid
            item
            xl={4}
            xs={4}
            justifyContent="flex-end"
            className="right-text-align"
          >
            Ngày Đăng
          </Grid>
          <Grid
            item
            xl={8}
            xs={8}
            justifyContent="flex-end"
            className="left-text-align"
          >
            {createdAt}
          </Grid>
          <Grid
            item
            xl={4}
            xs={4}
            justifyContent="flex-end"
            className="right-text-align"
          >
            Author
          </Grid>
          <Grid
            item
            xl={8}
            xs={8}
            justifyContent="flex-start"
            className="left-text-align"
          >
            {author.name}
          </Grid>
          <Grid
            item
            xl={4}
            xs={4}
            justifyContent="flex-end"
            className="right-text-align"
          >
            Chuc Danh
          </Grid>
          <Grid
            item
            xl={8}
            xs={8}
            justifyContent="flex-start"
            className="left-text-align"
          >
            {author.title}
          </Grid>
          <Grid
            item
            xl={4}
            xs={4}
            justifyContent="flex-end"
            className="right-text-align"
          >
            Chuc Danh
          </Grid>
          <Grid
            item
            xl={8}
            xs={8}
            justifyContent="flex-start"
            className="left-text-align"
          >
            {publishedBy}
          </Grid>
          <Grid
            item
            xl={4}
            xs={4}
            justifyContent="flex-end"
            className="right-text-align"
          >
            Chuc Danh
          </Grid>
          <Grid
            item
            xl={8}
            xs={8}
            justifyContent="flex-start"
            className="left-text-align"
          >
            {createdAt}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
