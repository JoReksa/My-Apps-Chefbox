const initialState = {
  isLoading: false,
  user: null,
  log: '',
  datafetch: null,
  datafetch2: null,
  category: [],
  dataDetail: [],
  hasil: null,
  add: null,
  views: null,
  datains: null,
  checkin: [],
  IdCreat: '',
  MyRes: [],
  Pays: {},
  sellers: [],
  Myord: [],
};

const Fetch = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        datafetch: action.data,
      };
    case 'GET_DATA_SUCCESSS':
      return {
        ...state,
        loading: false,
        datafetch2: action.data,
      };
    case 'GET_CATEGORY_SUCCESS':
      return {
        ...state,
        loading: false,
        category: action.data,
      };
    case 'GET_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        dataDetail: action.data,
      };
    case 'GET_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        datains: action.data,
      };
    case 'GET_HASIL_SUCCESS':
      return {
        ...state,
        loading: false,
        hasil: action.get,
      };

    case 'REMOVE_COMPONENT':
      return {
        ...state,
        hasil: [],
      };
    case 'REMOVE_COMPONENTX':
      return {
        ...state,
        dataDetail: [],
      };
    case 'REMOVE_COMPONENTSS':
      return {
        ...state,
        views: [],
      };
    case 'REMOVE_CARTS_COMP':
      return {
        ...state,
        checkin: [],
      };
    case 'ADD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        add: action.data,
      };
    case 'ALL_SUCCESS':
      return {
        ...state,
        isLoading: false,
        views: action.data,
      };
    case 'ALL_SUCCESS_CHECK':
      return {
        ...state,
        isLoading: false,
        checkin: action.data,
      };
    case 'GET_RECEPIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        MyRes: action.data,
      };
    case 'GET_IDS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        IdCreat: action.data,
      };
    case 'GET_PAYS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        Pays: action.data,
      };
    case 'GET_SALES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        sellers: action.data,
      };
    case 'GET_TRUE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        Myord: action.data,
      };
    default:
      return state;
  }
};

export default Fetch;
