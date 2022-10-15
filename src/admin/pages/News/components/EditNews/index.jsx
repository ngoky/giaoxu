import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import { Grid, Box, TextField, Typography, Divider } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

const uploadFiles = async (uploadFileObj, filename, quillObj) => {
  // var libraryName = "ImageFiles";
  // var context = this.props.context;
  var siteUrl = this.props.context.pageContext.site.absoluteUrl;

  var currentdate = new Date();
  var fileNamePredecessor =
    currentdate.getDate().toString() +
    currentdate.getMonth().toString() +
    currentdate.getFullYear().toString() +
    currentdate.getTime().toString();

  filename = fileNamePredecessor + filename;

  //To Upload in root folder
  var apiUrl = `${siteUrl}/RootFolder/Files/Add(url='${filename}', overwrite=true)`;
  // const digestCache = this.props.context.serviceScope.consume(
  //   DigestCache.serviceKey
  // );
  // digestCache
  //   .fetchDigest(this.props.context.pageContext.web.serverRelativeUrl)
  //   .then(async (digest) => {
  try {
    if (uploadFileObj !== "") {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;odata=verbose"
          // "X-RequestDigest": digest
        },
        body: uploadFileObj // This is your file object
      })
        .then((response) => {
          console.log(response);
          const range = quillObj.getEditorSelection();
          const { url } = response;
          //var res = siteUrl + "/" + listName + "/" + filename;

          quillObj.getEditor().insertEmbed(range.index, "image", url);
        })
        .catch((error) => console.log(error));
    }
  } catch (error) {
    console.log("uploadFiles : " + error);
  }
  //});
};
const EditNews = () => {
  const quillRef = useRef();
  const selectLocalImage = () => {
    console.log("open image config");
    // return "http://localhost:3000/assets/";
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        const res = await uploadFiles(formData); // upload data into server or aws or cloudinary
        const url = res?.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        // ErrorToast("You could only upload images.");
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "code-block"]
        ],
        handlers: {
          image: selectLocalImage
        }
      }
    }),
    []
  );
  return (
    <Box
      sx={{
        flexDirection: "column"
      }}
      className="EditNews"
      display="flex"
    >
      <div>Text - edit </div>
      <Grid container className="news-info">
        <Grid item xs={12} sm={6} md={6} display="flex" className="box-title">
          <Typography className="text-title">abcd</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          className="edit-text-box"
        >
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            className="edit-text"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display="flex"
          className="edit-text-box"
        >
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            className="edit-text"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display="flex"
          className="edit-text-box"
        ></Grid>
      </Grid>
      <Divider />
      <ReactQuill modules={modules} ref={quillRef} />
    </Box>
  );
};
export default EditNews;
