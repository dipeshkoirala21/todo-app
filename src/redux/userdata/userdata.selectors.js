import { createSelector } from "reselect";

const selectUserData = (state) => state.userdata;

export const selectLoading = createSelector(
  [selectUserData],
  (userdata) => userdata.loading
);

export const selectData = createSelector(
  [selectUserData],
  (userdata) => userdata.data
);
export const selectListsData = createSelector(
  [selectUserData],
  (userdata) => userdata.todoData
);
export const selectAllUsersData = createSelector(
  [selectUserData],
  (userdata) => userdata.users
);
export const selectLists = createSelector(
  [selectAllUsersData],
  (users) => users.todos
);
