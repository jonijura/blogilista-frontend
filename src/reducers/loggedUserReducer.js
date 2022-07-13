import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";

const userSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const login = (username, password) => async (dispatch) => {
  const user = await loginServices.login(username, password);
  dispatch(userSlice.actions.setUser(user));
  return user;
};

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
