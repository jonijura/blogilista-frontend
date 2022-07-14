import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      state = action.payload;
      return state;
    },
  },
});

let lastNotificationId = 1;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.changeNotification(notification));
    clearTimeout(lastNotificationId);
    lastNotificationId = setTimeout(() => {
      dispatch(notificationSlice.actions.changeNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
