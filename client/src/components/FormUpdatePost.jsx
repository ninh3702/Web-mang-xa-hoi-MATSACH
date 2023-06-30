// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
// import {
//   Box,
//   Typography,
//   InputBase,
//   useTheme,
//   Button,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import FlexBetween from "./FlexBetween";
// import Dropzone from "react-dropzone";
// import { useDispatch, useSelector } from "react-redux";
// import { updatePost } from "state";

// const FormUpdatePost = ({ postId, description, picturePath })=> {
//   const dispatch = useDispatch()
//   const token = useSelector((state) => state.token);
//   const [open, setOpen] = React.useState(false);
//   const [image, setImage] = React.useState(picturePath);
//   const [desc, setDesc] = React.useState(description);
//   const { palette } = useTheme();
//   const medium = palette.neutral.medium;

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleUpdatePost = async(e) => {
//     e.preventDefault()

//     const res = await fetch(
//       `http://localhost:3001/posts/${postId}`,
//       {
//         method: "PUT",
//         body: {
//           description: desc,
//           picturePath: image
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
        
//       }
//     );
//     const data = res.json()
//     dispatch(updatePost(data))
//     handleClose()
//   };

//   console.log(image)

//   return (
//     <Box>
//       <IconButton onClick={handleClickOpen}>
//         <EditIcon />
//       </IconButton>
//       <Dialog open={open} onClose={handleClose}>
//         <Box component="form" onSubmit={handleUpdatePost}>
//           <DialogTitle>Cập nhật bài viết</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Mô tả"
//               fullWidth
//               variant="standard"
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//             <Box
//               border={`1px solid ${medium}`}
//               borderRadius="5px"
//               mt="1rem"
//               p="1rem"
//             >
//               <Dropzone
//                 acceptedFiles=".jpg,.jpeg,.png"
//                 multiple={false}
//                 onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
//               >
//                 {({ getRootProps, getInputProps }) => (
//                   <FlexBetween>
//                     <Box
//                       {...getRootProps()}
//                       border={`2px dashed ${palette.primary.main}`}
//                       p="1rem"
//                       width="100%"
//                       sx={{ "&:hover": { cursor: "pointer" } }}
//                     >
//                       <input {...getInputProps()} />
//                       {!image ? (
//                         <p>Thêm ảnh vào đây</p>
//                       ) : (
//                         <FlexBetween>
//                           <Typography>
//                             {image}
//                             </Typography>
//                           <EditOutlined />
//                         </FlexBetween>
//                       )}
//                     </Box>
//                     {image && (
//                       <IconButton
//                         onClick={() => setImage(null)}
//                         sx={{ width: "15%" }}
//                       >
//                         <DeleteOutlined />
//                       </IconButton>
//                     )}
//                   </FlexBetween>
//                 )}
//               </Dropzone>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Hủy bỏ</Button>
//             <Button type="submit">
//               Cập nhật
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>
//     </Box>
//   );
// }
