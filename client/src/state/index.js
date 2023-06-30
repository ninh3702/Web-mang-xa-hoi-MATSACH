import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deleteStatePost: (state, action) => {
      console.log(action.payload)
      const newPosts = [...state.posts]
      const index = newPosts.findIndex(p => p._id === action.payload.id)
      console.log(index)
      if(index > -1){
        newPosts.splice(index, 1)
        state.posts = newPosts
      }
    },
    updatePost: (state, action) => {
      const newPosts = [...state.posts]
      const index = newPosts.findIndex(p => p._id === action.payload._id)
      if(index > -1){
        newPosts[index] = action.payload
        state.posts = newPosts
      }
    }
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, deleteStatePost, updatePost } =
  authSlice.actions;
export default authSlice.reducer;
