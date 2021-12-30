import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SignIns = (email, password) => {
  //   console.log('emel', email);
  //   console.log('pasword', password);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Kont', value);
      console.log('kont tokken', value);
    } catch (e) {
      // saving error
    }
  };
  return async dispatch => {
    try {
      const login = await axios.post(
        'https://chefbox2021.herokuapp.com/user/login',
        {
          email: email,
          password: password,
        },
      );
      storeData(login.data.token);
      dispatch({
        type: 'GET_LOGIN_SUCCESS',
        data: login.data.token,
      });

      console.log('LOGIN', login);
      return true;
    } catch (e) {
      return false;
    }
  };
};
export const SignUps = (email, Username, password, confrim) => {
  // console.log('first', firstname);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Kont', value);
      console.log('kont tokken', value);
    } catch (e) {
      // saving error
    }
  };
  console.log('last', Username);
  console.log('emel', email);
  console.log('pasword', password);
  console.log('confirm', confrim);
  return async dispatch => {
    try {
      const auth = await axios.post(
        'https://chefbox2021.herokuapp.com/user/signup',
        {
          email: email,
          userName: Username,
          password: password,
          confirmPassword: confrim,
        },
      );
      storeData(auth.data.token);

      console.log('Regis', auth);
      dispatch({
        type: 'GET_REGISTER_SUCCESS',
        data: auth.data.token,
      });
      // console.log('Regis', auth.data.token);

      return true;
    } catch (e) {
      console.log('iniE', e);
      return false;
    }
  };
};

export const SignUps2 = (image, phone, address, Id) => {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Kont', value);
      console.log('kont tokken', value);
    } catch (e) {
      // saving error
    }
  };
  return async (dispatch, getState) => {
    try {
      console.log('image', image);
      const newphone = String(phone);
      const newadd = String(address);
      const newid = String(Id);
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      var photo = {
        uri: image.uri,
        type: image.type,
        name: image.name,
      };
      console.log('photo', photo);
      var data = new FormData();
      data.append('image', photo);
      data.append('phoneNumber', newphone);
      data.append('address', newadd);
      data.append('id_location', newid);
      var config = {
        method: 'patch',
        url: 'http://chefbox2021.herokuapp.com/user/complete-signup',
        headers: {
          access_token: value,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          console.log('resdata1', response.data);
          storeData(state.auth.token);

          return response;
        })
        .catch(function (error) {
          console.log('erro', error);
        });
      return true;
    } catch (e) {
      console.log('error r', e);
      return e;
    }
  };
};
export const profile = () => {
  return async (dispatch, getState) => {
    try {
      const pro = getState();
      const value = await AsyncStorage.getItem('Kont');

      const profile = await axios.get(
        'https://chefbox2021.herokuapp.com/user/',
        {
          headers: {
            access_token: value,
          },
        },
      );
      console.log('profile', profile);
      dispatch({
        type: 'GET_PROFILE_SUCCESS',
        data: profile.data,
      });
      return true;
    } catch (e) {
      return false;
    }
  };
};
export const Inti = page => {
  // console.log('user', nama, phone, username, password);
  return async (dispatch, getState) => {
    const state = getState();
    const value = await AsyncStorage.getItem('Kont');

    const get = await axios.get(
      'https://chefbox2021.herokuapp.com/recipe?page=' + page + '&limit=6',
      {
        headers: {
          access_token: value,
        },
      },
    );
    console.log('get', get);
    dispatch({
      type: 'GET_DATA_SUCCESS',
      data: get.data,
    });
  };
};
export const Intis = () => {
  // console.log('user', nama, phone, username, password);
  return async (dispatch, getState) => {
    const state = getState();
    const value = await AsyncStorage.getItem('Kont');

    const get = await axios.get(
      'https://chefbox2021.herokuapp.com/recipe/mobile',
      {
        headers: {
          access_token: value,
        },
      },
    );
    console.log('get2', get);
    dispatch({
      type: 'GET_DATA_SUCCESSS',
      data: get.data.data.rows,
    });
  };
};

export const GetDetails = IdFood => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');
      console.log('ini ID FOOOD', IdFood);
      const getD = await axios.get(
        'https://chefbox2021.herokuapp.com/recipe/' + IdFood,
        {
          headers: {
            access_token: value,
          },
        },
      );
      console.log('details Get D', getD);
      dispatch({
        type: 'GET_DETAIL_SUCCESS',
        data: getD.data,
      });
      // console.log('GETD', getD);
    } catch (e) {
      // console.log('log e', e);
    }
  };
};
export const Getin = Idsa => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const getD = await axios.get(
        'https://chefbox2021.herokuapp.com/recipe/' + Idsa,
        {
          headers: {
            access_token: value,
          },
        },
      );
      dispatch({
        type: 'GET_DETAILS_SUCCESS',
        data: getD.data,
      });
      // console.log('GETD', getD);
    } catch (e) {
      // console.log('log e', e);
    }
  };
};

export const Filterss = (Cat, Type, Gte, Lte, Loc) => {
  return async (dispatch, getState) => {
    try {
      const fill = getState();
      const value = await AsyncStorage.getItem('Kont');

      console.log('Data isi', Cat, Type, Gte, Lte, Loc);
      const Dtfill = await axios.get(
        // 'http://chefbox2021.herokuapp.com/recipe/filter?cat=5&type=1&sort=DESC&orders=id&gte=10000&lte=100000&loc=4',
        'https://chefbox2021.herokuapp.com/recipe/filter?cat=' +
          Cat +
          '&type=' +
          Type +
          '&sort=DESC&orders=id&gte=' +
          Gte +
          '&lte=' +
          Lte +
          '&loc=' +
          Loc +
          '',
        {
          headers: {
            access_token: value,
          },
        },
      );
      dispatch({
        type: 'GET_HASIL_SUCCESS',
        get: Dtfill.data.data,
      });
      console.log('Api Filter', fill);
      console.log('Filter', Dtfill);
      return true;
    } catch (e) {
      console.log('e Fill', e.response);
      return false;
    }
  };
};

export const Remcomponent = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_COMPONENT',
    });
  };
};
export const Remcom = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_COMPONENTX',
    });
  };
};
export const Remcart = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_COMPONENTSS',
    });
  };
};
export const Uls = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_CARTS_COMP',
    });
  };
};
export const profiles = () => {
  return async (dispatch, getState) => {
    try {
      const pro = getState();
      const value = await AsyncStorage.getItem('Kont');

      const profile = await axios.get(
        'https://chefbox2021.herokuapp.com/user/',
        {
          headers: {
            access_token: value,
          },
        },
      );
      console.log('profile', profile);
      dispatch({
        type: 'GET_PROFILE_SUCCESS',
        data: profile.data,
      });
      return true;
    } catch (e) {
      return false;
    }
  };
};
export const Addcart = (id, quantity) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const addcart = await axios.post(
        'https://chefbox2021.herokuapp.com/cart/' + id + '',
        {
          quantity: quantity,
        },
        {
          headers: {
            access_token: value,
          },
        },
      );
      console.log('addssss', addcart);
      console.log('isi quant', quantity);
      dispatch({
        type: 'ADD_SUCCESS',
        data: addcart.data,
      });
      // console.log('addssss', addcart);
      return true;
    } catch (e) {
      console.log('errorcart', e);
      return false;
    }
  };
};

export const See = isi => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const cartsee = await axios.get(
        'https://chefbox2021.herokuapp.com/cart',
        {
          headers: {
            access_token: value,
          },
        },
      );
      dispatch({
        type: 'ALL_SUCCESS',
        data: cartsee.data,
      });
      console.log('viess', cartsee);
      return true;
    } catch (e) {
      return false;
    }
  };
};

export const Cprofile = (
  firstName,
  lastName,
  phoneNumber,
  address,
  id_location,
  image,
) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      // console.log('ph', image);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('phoneNumber', phoneNumber);
      data.append('address', address);
      data.append('id_location', id_location);
      data.append('image', image);
      // console.log('tokkek', state.auth.token);

      var config = {
        method: 'patch',
        url: 'http://chefbox2021.herokuapp.com/user/changeprofile',
        headers: {
          access_token: value,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      console.log('const', config);
      await axios(config)
        .then(function (response) {
          console.log('resdata1', response.data);
        })
        .catch(function (error) {
          console.log('erro', error);
        });
      return true;
    } catch (e) {
      console.log('error r', e);

      return false;
    }
  };
};
export const Logout = log => {
  return async dispatch => {
    dispatch({
      type: 'GET_LOGOUT_SUCCESS',
      data: log,
    });
  };
};

export const Changepw = (passwords, confirmpass) => {
  return async (dispatch, getState) => {
    try {
      const coin = getState();
      const value = await AsyncStorage.getItem('Kont');

      var data = new FormData();
      const newadd = String(passwords);
      const newid = String(confirmpass);
      const change = await axios.put(
        'http://chefbox2021.herokuapp.com/user/changepassword/',
        {
          password: newadd,
          confirmPassword: newid,
        },
        {
          headers: {
            access_token: value,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('ini change', change);
      return true;
    } catch (e) {
      console.log('errs', e);
      return false;
    }
  };
};

export const Delcar = ida => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const deleted = await axios.delete(
        'https://chefbox2021.herokuapp.com/cart/' + ida + '',
        {
          headers: {
            access_token: value,
          },
        },
      );
      console.log('dkimak', deleted);
      return true;
    } catch (e) {
      console.log('errsa', e);
      return false;
    }
  };
};

export const CheckOut = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const checkin = await axios.get(
        'https://chefbox2021.herokuapp.com/order',
        {
          headers: {
            access_token: value,
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({
        type: 'ALL_SUCCESS_CHECK',
        data: checkin.data,
      });
      // console.log('checkout', dispatch);
      return true;
    } catch (e) {
      console.log('errsa', e);

      return false;
    }
  };
};
export const MyRe = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const Myrecepi = await axios.get(
        'https://chefbox2021.herokuapp.com/recipe/myrecipe?page=1&limit=6',
        {
          headers: {
            access_token: value,
          },
        },
      );
      dispatch({
        type: 'GET_RECEPIE_SUCCESS',
        data: Myrecepi.data.data,
      });
      return true;
    } catch (e) {
      return false;
    }
  };
};
export const DelsRecep = No => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const DelRe = await axios.delete(
        'http://chefbox2021.herokuapp.com/recipe/' + No + '',
        {
          headers: {
            access_token: value,
          },
        },
      );
      return true;
    } catch (e) {
      return false;
    }
  };
};
export const CreatsD = (idloc, idtype, tit, time, serv, image, desc) => {
  //
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const state1 = getState();
      const value = await AsyncStorage.getItem('Kont');

      var data = new FormData();
      var photo = {
        uri: image.uri,
        type: image.type,
        name: image.name,
      };
      data.append('id_category', idloc);
      data.append('id_type', idtype);
      data.append('title', tit);
      data.append('duration', time);
      data.append('serving', serv);
      data.append('image', photo);
      data.append('description', desc);
      var config = {
        method: 'post',
        url: 'https://chefbox2021.herokuapp.com/recipe/',
        headers: {
          access_token: value,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      const isi = await axios(config)
        .then(function (response) {
          console.log('resdata1', response.data);
          dispatch({
            type: 'GET_IDS_SUCCESS',
            data: response.data.data.id,
          });
          return response;
        })
        .catch(function (error) {
          console.log('erro', error);
        });

      console.log('Configs', isi);
      return true;
    } catch (e) {
      // console.log('create  errro', e);

      return false;
    }
  };
};

export const CreateIng = (ID, amo, uni, lab) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const putis = await axios.put(
        'http://chefbox2021.herokuapp.com/recipe/steptwo/' + ID + '',
        {
          amount: amo,
          unit: uni,
          label: lab,
        },
        {
          headers: {
            access_token: value,
            'Content-type': 'application/json',
          },
        },
      );
      console.log('ing', putis);
      return true;
    } catch (e) {
      console.log('errsa', e);
      return false;
    }
  };
};

export const Dircs = (IDs, Dirs) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const drs = await axios.put(
        'http://chefbox2021.herokuapp.com/recipe/stepthree/' + IDs + '',
        {
          direction: Dirs,
        },
        {
          headers: {
            'Content-type': 'application/json',
            access_token: value,
          },
        },
      );
      console.log('logsa', drs);
      return true;
    } catch (e) {
      console.log('ersasdsadasa', e);

      return false;
    }
  };
};

export const PRods = (IDSS, price, stock, locs) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      // console.log('tolken', state.auth.token);
      const newp = String(price);
      const news = String(stock);

      const newl = String(locs);
      console.log('Idss', IDSS);
      console.log('prices', newp);

      console.log('stocks', news);

      console.log('idloc', newl);
      const prs = await axios.put(
        'http://chefbox2021.herokuapp.com/recipe/stepfour/' + IDSS + '',
        {
          price: newp,
          stock: news,
          id_location: newl,
        },
        {
          headers: {
            access_token: value,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('lsats', prs);

      return true;
    } catch (e) {
      console.log('sans', e);

      return false;
    }
  };
};

export const ChangeAdds = (Id, last, phone, first, add) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const newla = String(last);
      const newpa = String(phone);
      const newfa = String(first);
      const newda = String(add);
      console.log('Id', Id);
      console.log('lasn', newla);
      console.log('phon', newpa);
      console.log('fursn', newfa);
      console.log('asdsad', newda);

      const CADS = await axios.patch(
        'http://chefbox2021.herokuapp.com/order/' + Id + '',
        {
          lastName: newla,
          phoneNumber: newpa,
          firstName: newfa,
          address: newda,
        },
        {
          headers: {
            access_token: value,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('cads', CADS);
      return true;
    } catch (e) {
      console.log('Erssasr', e);

      return false;
    }
  };
};

export const Payments = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      var config = {
        method: 'post',
        url: 'https://chefbox2021.herokuapp.com/order/checkout',
        headers: {
          access_token: value,
        },
      };

      const isi = await axios(config)
        .then(function (response) {
          console.log('resPayment', response.data);
          dispatch({
            type: 'GET_PAYS_SUCCESS',
            data: response.data.data,
          });
          return response;
        })
        .catch(function (error) {
          console.log('erro', error);
        });
      console.log('ini post pays', isi);
      return true;
    } catch (e) {
      console.log('Errs!@#', e);
      return false;
    }
  };
};

export const Reviews = (Id, commentsa, values) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const newcom = String(commentsa);
      const revs = await axios.post(
        'https://chefbox2021.herokuapp.com/review/' + Id + '',
        {
          comment: commentsa,
          value: values,
        },
        {
          headers: {
            access_token: value,
          },
        },
      );

      console.log('reviews', revs);
      return true;
    } catch (e) {
      console.log('err review', e);
      return false;
    }
  };
};

export const Ranting = (Id, values) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const Rans = await axios.post(
        'https://chefbox2021.herokuapp.com/rating/' + Id + '',
        {
          value: values,
        },
        {
          headers: {
            access_token: value,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Ratings', Rans);
      return true;
    } catch (e) {
      console.log('err Ratings', e);
      return false;
    }
  };
};

export const DashSell = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const sellers = await axios.get(
        'https://chefbox2021.herokuapp.com/order/seller',
        {
          headers: {
            access_token: value,
            // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJwdXNwaXRhIiwiZW1haWwiOiJwdXNwaXRhQGdtYWlsLmNvbSIsImlhdCI6MTYzODE1MDI3Mn0.y6sVsqXUcqWTOxu5nm2sJ-a7mvUBzvyPix04ucszFTQ',
          },
        },
      );
      dispatch({
        type: 'GET_SALES_SUCCESS',
        data: sellers.data.data,
      });
      console.log('seller', sellers);
      return true;
    } catch (e) {
      return false;
    }
  };
};

export const MyOrs = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const value = await AsyncStorage.getItem('Kont');

      const Ors = await axios.get(
        'https://chefbox2021.herokuapp.com/order/myorder',
        {
          headers: {
            access_token: value,
          },
        },
      );
      dispatch({
        type: 'GET_TRUE_SUCCESS',
        data: Ors.data.data,
      });
      return true;
    } catch (e) {
      return false;
    }
  };
};
