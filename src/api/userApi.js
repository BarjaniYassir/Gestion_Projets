import API from "./api";

const registerUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
};

const loginUser = async (credentials) => {
  const res = await API.post("/users/login", credentials);
  return res.data;
};

const getProfile = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export default { registerUser, loginUser, getProfile };
