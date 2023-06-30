import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStatePost } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";


const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector((state) => state.token);
  

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  const deletePost = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(deleteStatePost({id: postId}));
  };

  return (
    <FlexBetween>
      <IconButton
        onClick={() => deletePost()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        <DeleteOutline></DeleteOutline>
      </IconButton>
    </FlexBetween>
  );
};

export default DeletePost;
