import price from './price';
import filters from './filters';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    price: price,
    filters: filters,
})

export default allReducers;