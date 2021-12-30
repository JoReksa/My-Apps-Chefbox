const initialState = {
  isLoading: false,
  token: '',
  user: null,
  log: '',
  reg2: null,
  profile: null,
};

const auth = (state = initialState, action) => {
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
        token: '',
      };
    case 'REGISTER':
      return {
        ...state,
        isLoading: true,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.data,
      };
    case 'GET_REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        token: action.data,
      };
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        profile: action.data,
      };
    case 'GET_REGIS2_SUCCESS':
      return {
        ...state,
        isLoading: false,
        reg2: action.data,
      };
    default:
      return state;
  }
};

export default auth;
