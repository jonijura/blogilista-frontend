import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    deleteBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload),
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogServices.create(blog);
  dispatch(blogSlice.actions.addBlog(newBlog));
  return newBlog;
};

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogServices.getAll();
  dispatch(blogSlice.actions.setBlogs(blogs));
};

export const deleteBlog = (blog, user) => async (dispatch) => {
  await blogServices.remove(blog.id, user.token);
  dispatch(blogSlice.actions.deleteBlog(blog.id));
};
//blogServices uses modify!
export const updateBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogServices.update(blog);
  dispatch(blogSlice.actions.updateBlog(updatedBlog));
  return updatedBlog;
};

export default blogSlice.reducer;
