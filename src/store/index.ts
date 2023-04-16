import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { socketMiddleware } from '../services/middlewares/socketMiddleware';
import rootReducer from '../services/reducers';

const composeEnhancers = composeWithDevTools({});

const enhancers = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

const store = createStore(rootReducer, enhancers);

export default store;
