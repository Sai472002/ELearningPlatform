export const main = process.env.REACT_APP_BACKEND_URL;

export const action = {
  GET_INS: main + "/getinsdata",
  EDIT_INS: main + "/editinsdata",
  GET_REQ: main + "/getRequests",
  POST_REQ: main + "/request",
  DEL_REQ: main + "/deleterequest",
  ADD_COURSE: main + "/addcourse",
  GET_COURSE: main + "/getcourse",
  EDIT_COURSE: main + "editcourse",
};
