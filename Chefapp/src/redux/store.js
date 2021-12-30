import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer/index';
import thunk from 'redux-thunk';

// 1. Membuat Store
const storeRedux = createStore(rootReducer, applyMiddleware(thunk));

// sagaMiddleware.run(rootSaga);

export default storeRedux;
