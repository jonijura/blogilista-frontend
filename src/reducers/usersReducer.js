import { createSlice } from "@reduxjs/toolkit";
import userServices from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const getUsers = () => async (dispatch) => {
  const users = await userServices.getAll();
  dispatch(userSlice.actions.setUsers(users));
};

export default userSlice.reducer;
