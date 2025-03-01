export const main = process.env.REACT_APP_BACKEND_URL;

export const action = {
  GET_STUDENT: main + "/getalldata",
  DEL_STUDENT: main + "/deletedata",

  GET_INS: main + "/getinsdata",
  GET_ALL_INS: main + "/getallinsdata",
  EDIT_INS: main + "/editinsdata",
  DEL_INS: main + "/deleteinsdata",

  GET_REQ: main + "/getRequests",
  POST_REQ: main + "/request",
  DEL_REQ: main + "/deleterequest",

  GET_COURSE: main + "/getcourse",
  GET_ALL_COURSE: main + "/getallcourse",
  ADD_COURSE: main + "/addcourse",
  DEL_COURSE: main + "/deletecourse",
  EDIT_COURSE: main + "/editcourse",
  BUY_COURSE: main + "/create-checkout-session",
  SESSION: main + "/checkout-session",

  ADMIN_DETAILS: main + "/admindetails",
  ADMIN_STATS: main + "/adminstats",

  LOGIN: main + "/login",
  FORGET_PASSWORD: main + "/forgotpassword",
  RESET_PASSWORD: main + "/resetpass",
  REGISTER: main + "/register",
};
