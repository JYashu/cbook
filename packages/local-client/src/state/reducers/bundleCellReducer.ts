import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
  [key: string]: {
    processing: boolean;
    code: string;
    error: string;
  } | undefined;
}

const initialState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        {
          state[action.payload.cellId] = {
            processing: true,
            code: '',
            error: '',
          };
          return state;
        }

      case ActionType.BUNDLE_COMPLETE:
        {
          state[action.payload.cellId] = {
            processing: false,
            code: action.payload.bundle.code,
            error: action.payload.bundle.error,
          };
          return state;
        }

      default:
        return state;
    }
  }
);

export default reducer;
