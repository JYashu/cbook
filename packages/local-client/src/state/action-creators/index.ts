import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Direction } from "../actions";
import { UpdateCellAction, DeleteCellAction, InsertCellAfterAction, MoveCellAction, BundleStartAction, BundleCompleteAction } from "../actions";
import { Cell, CellTypes } from "../cell";
import { Dispatch } from "redux";
import bundle from "../../bundler";
import axios from "axios";
import { RootState } from "..";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id, 
      type: cellType
    }
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    })
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[]} = await axios.get('/cells');

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message,
      })
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // @ts-ignore
    const { cells: { data, order } } = getState();

    const cells = order.map((id: string) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (error: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message
      })
    }
  };
};