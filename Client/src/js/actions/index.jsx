import {
  DATA_LOADED,
  DATA_REQUESTED,
  ADD_PACKAGE,
  DELETE_PACKAGE,
  EDIT_PACKAGE,
  TOGGLE_EDIT_MODE,
  CENTER_MAP,
  SELECT_PACKAGE,
  TOGGLE_DEPO_MODE,
  ADD_DEPO,
  SET_RESULT_VISIBILITY,
  ADD_RESULT,
} from "../constants/action-types";

export const getData = () => ({ type: DATA_REQUESTED });
export const dataLoaded = payload => ({ type: DATA_LOADED, payload });

export const add_package = (latitude, longitude) => ({
  type: ADD_PACKAGE,
  package: {
    latitude,
    longitude,
  }
});

export const delete_package = index => ({
  type: DELETE_PACKAGE,
  index,
});

export const edit_package = (latitude, longitude) => ({
  type: EDIT_PACKAGE,
  package: { latitude, longitude, },
});

export const center_map = index => ({
  type: CENTER_MAP,
  index,
});

export const select_package = index => ({
  type: SELECT_PACKAGE,
  index,
});

export const toggle_edit_mode = index => ({
  type: TOGGLE_EDIT_MODE,
  index,
});

export const toggle_depo_mode = () => ({
  type: TOGGLE_DEPO_MODE,
});

export const add_depo = (latitude, longitude) => ({
  type: ADD_DEPO,
  depo: {
    latitude,
    longitude,
  },
});

export const set_result_visibility = (index, isVisible) => ({
  type: SET_RESULT_VISIBILITY,
  index,
  isVisible,
});

export const add_result = (result) => ({
  type: ADD_RESULT,
  result
})
