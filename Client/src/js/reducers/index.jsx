import {
  DATA_LOADED,
  API_ERRORED,

  ADD_PACKAGE,
  DELETE_PACKAGE,
  EDIT_PACKAGE,
  TOGGLE_EDIT_MODE,
  TOGGLE_DEPO_MODE,
  ADD_DEPO,
  CENTER_MAP,
  SELECT_PACKAGE
} from "../constants/action-types";

import { DEFAULT_PREFIX, WEBSOCKET_MESSAGE } from '@giantmachines/redux-websocket';


const initialState = {
  remoteArticles: [],
  // messages: [],
  // url: null,

  map_state: 'add',

  map_settings: {
    latitude: 52.22977,
    longitude: 21.01178,
    zoom: 13
  },
  packages: [],
  depo: null,
  selected_package: null,
  last_deleted_package: null
};

function rootReducer(state = initialState, action) {
  switch(action.type) {

    case DATA_LOADED:
      return {
        ...state,
        remoteArticles: state.remoteArticles.concat(action.payload)
      };

    case API_ERRORED:
      return {
        ...state,
        remoteArticles: [API_ERRORED]
      };

    case ADD_PACKAGE:
      return {
        ...state,
        packages: [...state.packages, action.package],
        selected_package: null,
      };

    case DELETE_PACKAGE:
      return {
        ...state,
        packages: state.packages.filter((_, index) => index !== action.index),
        selected_package: (state.selected_package === action.index) ? null : state.selected_package,
        last_deleted_package: action.index,
        map_state: 'add',
      };

    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        map_state: 'edit',
      };

    case TOGGLE_DEPO_MODE:
      return {
        ...state,
        map_state: 'depo',
      };

    case ADD_DEPO:
      return {
        ...state,
        depo: action.depo,
        map_state: 'add',
      }

    case EDIT_PACKAGE:
      const after_edit = [...state.packages];
      after_edit[state.selected_package] = action.package;
      return {
        ...state,
        map_state: 'add',
        packages: after_edit,
      };

    case CENTER_MAP:
      if (state.last_deleted_package === null)
        return {
          ...state,
          map_settings: {
            ...state.map_settings,
            ...state.packages[action.index]
          },
          selected_package: action.index,
        };
      else
        return {
          ...state,
          last_deleted_package: null,
        };

    case SELECT_PACKAGE:
      return {
        ...state,
        selected_package: action.index,
        last_deleted_package: null
      };

    case `${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`:
      const payload = JSON.parse(action.payload.message);
      console.log(payload);
      return state;

    default:
      // console.log('unknown action', action);
      return state;
  }
}

export default rootReducer;
