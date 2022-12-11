import { combineReducers, createStore } from 'redux';
import clientReducer from './reducers/client.reducer';


const reducers =
    combineReducers({
        clientReducer
    })

const store = createStore(reducers
)

export default store;

