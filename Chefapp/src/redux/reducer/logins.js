const initialState = {
  isLoading: false,
  token: '',
  user: null,
  log: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.data,
      };
    case 'GET_LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        token: action.data,
      };
    case 'GET_LOGOUT_SUCCESS':
      return {
        ...state,
        loading: false,
        log: '',
      };
    default:
      return state;
  }
};

export default login;
