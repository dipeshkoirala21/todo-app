import * as types from "./userdata.types";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const setUserData = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_USER_DATA,
    payload,
  });
};
export const setTodoData = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_TODO_LISTS,
    payload,
  });
};
export const saveUsersData = (payload) => (dispatch) => {
  dispatch({
    type: types.SAVE_USERS_DATA,
    payload,
  });
};
export const addTodoListsData = (payload) => (dispatch) => {
  dispatch({
    type: types.ADD_TODO_LISTS,
    payload,
  });
};
export const delTodoListsData = (payload) => (dispatch) => {
  dispatch({
    type: types.DEL_TODO_LIST,
    payload,
  });
};
export const setClearData = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_USER_DATA_FIELD,
    payload,
  });
};
export const setClearTodoData = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_TODO_LISTS,
    payload,
  });
};
