const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, isAuth: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default authReducer;
