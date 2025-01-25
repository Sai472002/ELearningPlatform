import axios from "axios";

export const POST = async (action, params) => {
  try {
      const result = await axios.post(action, params);
      if (result.status === 200) {
        return result;
      }
  } catch (error) {
    console.error(error);
  }
};
export const POSTFILE = async (action, params) => {
  const token = sessionStorage.getItem("token")

  try {
      const result = await axios.post(action, params,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (result.status === 200) {
        return result;
      }
  } catch (error) {
    console.error(error);
  }
};

export const GET = async (action,params={}) => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const result = await axios.get(action,{
        headers: { Authorization: `Bearer ${token}` },
        params:params
      });
      if (result.status === 200) {
        return result.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const PUT = async (action, params) => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const result = await axios.put(action, params, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.status === 200) {
        return result;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
export const PUTFILE = async (action, params) => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const result = await axios.put(action, params, {
        headers: { Authorization: `Bearer ${token}` ,
        "Content-Type": "multipart/form-data"
      },
      });
      if (result.status === 200) {
        return result;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const DELETE = async (action ,data) => {
  try {
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(data);
    
    if (token) {
      const result = await axios.delete(action,{
        headers: { Authorization: `Bearer ${token}`,
      },data 
      });
      if (result.status === 200) {
        return result;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

