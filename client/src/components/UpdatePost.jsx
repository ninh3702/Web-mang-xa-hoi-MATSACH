import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { 
    DeleteOutlined, 
    EditOutlined,
    ImageOutlined,
    GifBoxOutlined,
    MicOutlined,
    MoreHorizOutlined, 
    AttachFileOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import Dropzone from "react-dropzone";
import { useState } from "react";

const UpdatePost = ({
  postId,
  description,
  picturePath,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const mediumMain = palette.neutral.mediumMain;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handleEditPost = async () => {
    const formData = new URLSearchParams();

    formData.set("description", description);
    if (image) {
      formData.set("picture", image);
      formData.set("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const updatedPost = await response.json();
    updatedPost.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    dispatch(setPosts({ updatedPost }));
  };

  return (
    <FlexBetween>
      <IconButton
        onClick={handleClickOpen}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <EditOutlined></EditOutlined>
      </IconButton>
      <WidgetWrapper>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
          Sửa bài viết
          </DialogTitle>
          <DialogContent>
            
          
              <FlexBetween gap="1.5rem">
                <InputBase
                  onChange={(e) => setPost(e.target.value)}
                  value={description}
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
      </Dialog>
      </WidgetWrapper>
    </FlexBetween>
  );
};

export default UpdatePost;
