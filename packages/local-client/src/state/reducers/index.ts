import { combineReducers } from "redux";
import bundleCellReducer from './bundleCellReducer';
import cellReducer from './cellReducer';

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleCellReducer,
});

export default reducers;

export type RootState =  ReturnType<typeof reducers>;