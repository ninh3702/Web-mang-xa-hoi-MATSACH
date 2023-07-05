import {
  DeleteOutlined,
  EditOutlined,
  ImageOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WidgetWrapper from "components/WidgetWrapper";
import * as React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStatePost } from "state";
import FlexBetween from "./FlexBetween";

const UpdatePost = ({
  postId,
  description,
  picturePath,
}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [descriptionText, setDescriptionText] = useState(description);

  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const mediumMain = palette.neutral.mediumMain;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  React.useEffect(() => {
    setDescriptionText(description)
    if(picturePath) setImage(picturePath)
  }, [description, picturePath])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditPost = async (e) => {
    e.preventDefault()
    const formData = new FormData();

    formData.set("description", descriptionText);
    if (image) {
      console.log(image)
      formData.set("picture", image);
      formData.set("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const post = await response.json();
    console.log(post)
    dispatch(updateStatePost(post));
    setImage(null);
    setDescriptionText("");
    handleClose()
  };

  return (
    <FlexBetween>
      <IconButton
        onClick={handleClickOpen}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <EditOutlined></EditOutlined>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleEditPost}>
          <DialogTitle>
          Sửa bài viết
          </DialogTitle>
          <DialogContent>
              <FlexBetween gap="1.5rem">
                <InputBase
                  onChange={(e) => setDescriptionText(e.target.value)}
                  value={descriptionText}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                  }}
                />
              </FlexBetween>
              {isImage && (
                <Box
                  border={`1px solid ${medium}`}
                  borderRadius="5px"
                  mt="1rem"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    value={picturePath}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <FlexBetween>
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          width="100%"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!image ? (
                            <p>Thêm ảnh vào đây</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{image.name}</Typography>
                              <EditOutlined />
                            </FlexBetween>
                          )}
                        </Box>
                        {image && (
                          <IconButton
                            onClick={() => setImage(null)}
                            sx={{ width: "15%" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        )}
                      </FlexBetween>
                    )}
                  </Dropzone>
                </Box>
              )}

              <Divider sx={{ margin: "1.25rem 0" }} />

              <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                  <ImageOutlined sx={{ color: mediumMain }} />
                  <Typography
                    color={mediumMain}
                    sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                  >
                    Hình ảnh
                  </Typography>
                </FlexBetween>

                
                <Button onClick={handleClose}>Hủy bỏ</Button>
                <Button
                  type="submit"
                  onClick={handleEditPost}
                  sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                  }}
                >
                  Sửa
                </Button>
              </FlexBetween>
            
          </DialogContent>
          </Box>
      </Dialog>
    </FlexBetween>
  );
};

export default UpdatePost;
