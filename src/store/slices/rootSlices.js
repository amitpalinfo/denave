import { combineReducers } from "@reduxjs/toolkit";

import companySlices from "./companySlices";
export const rootslice = combineReducers({
  denave: companySlices,
});
