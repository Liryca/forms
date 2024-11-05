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

export const setAuthError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await AuthService.login(email, password);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e) {
    setAuthError(e.response?.data);
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

export const registration =
  (username, firstName, lastName, email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await AuthService.registration(
        username,
        firstName,
        lastName,
        email,
        password
      );
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (e) {
      setAuthError(e.response?.data);
      throw e;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  return (dispatch) => {
    dispatch(setAuth(false));
    dispatch(setUser({}));
  };
};

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch(setLoading(true));
    const response = await AuthService.checkToken(token);
    console.log(response);
    dispatch(setAuth(true));
    dispatch(setUser(response.data));
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    dispatch(setUser({}));
    setAuthError(e.response?.data);
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};
