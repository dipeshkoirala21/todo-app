import produce from "immer";
import * as types from "./userdata.types";

const INITIAL_STATE = {
  loading: false,
  isDarkTheme: false,
  isFirstLoad: true,
  todoData: {
    title: "",
    completed: false,
  },
  data: {
    id: 1,
    title: "",
    color: "#24A6D9",
    todos: [],
  },
  users: [],
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_LOADING:
        draft.loading = action.payload;
        break;
      case types.SET_USER_DATA:
        draft.data[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_USER_DATA_FIELD:
        draft.data = INITIAL_STATE.data;
        break;
      case types.SAVE_USERS_DATA:
        draft.users = action.payload;
        break;
      case types.SET_TODO_LISTS:
        draft.todoData[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_TODO_LISTS:
        draft.todoData = INITIAL_STATE.todoData;
        break;
      case types.ADD_TODO_LISTS:
        // console.log(action.payload, "from reducer");
        draft.data.todos = action.payload;
        break;
    }
  });

export default reducer;
