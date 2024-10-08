import AuthService from "../../services/AuthService";

export const setAuth = (bool) => ({
  type: "SET_AUTH",
  payload: bool,
});

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setLoading = (bool) => ({
  type: "SET_LOADING",
  payload: bool,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await AuthService.login(email, password);
    localStorage.setItem("token", response.data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e) {
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const registration = (username, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await AuthService.registration(username, email, password);
    localStorage.setItem("token", response.data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e) {
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  await AuthService.logout();
  localStorage.removeItem("token");
  dispatch(setAuth(false));
  dispatch(setUser({}));
};
