import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import displayName from "./user";
import email from "./email";
import uid from "./uid";
import cody from "./cody";
import product from "./product";
import music from "./music";
import perfume from "./perfume";
import temp from "./temp";
import search from "./search";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    displayName,
    email,
    uid,
    cody,
    product,
    music,
    perfume,
    temp,
    search,
  })(state, action);
};

export default reducer;
