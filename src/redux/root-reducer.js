import { combineReducers } from "redux";
import appReducer from "./app/app.reducer";
import userReducer from "./userdata/userdata.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  userdata: userReducer,
});

export default rootReducer;
