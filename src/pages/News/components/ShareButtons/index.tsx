import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from "react-share";

export const ShareButtons = (props: any) => {
  const { url, title } = props;
  return (
    <>
      <TwitterShareButton
        url={url}
        title={title}
        className="Demo__some-network__share-button"
        style={{ margin: 4 }}
      >
        <TwitterIcon size={30} round />
        {/* Facebookでshare */}
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        title={title}
        className="Demo__some-network__share-button"
        style={{
          margin: 4
        }}
      >
        <FacebookIcon size={30} round />
        {/* Facebookでshare */}
      </FacebookShareButton>
    </>
  );
};

