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
  SELECT_PACKAGE,
  SET_ROUTE_VISIBILITY,
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
  last_deleted_package: null,

  routes: [
    {
      polyline: [
        [52.2175990227452, 21.042828106152534],
        [52.2296920181494, 21.011738802843063],
        [52.22432944398149, 20.964503673505515],
      ],
      color: '#3388ff',
      hidden: false,
      name: 'Worker 1',
    },
    {
      polyline: [
        [52.21002607957454, 20.996108269135],
        [52.2059235296225, 21.016204669616805],
        [52.22254177532672, 21.043343398472587],
      ],
      color: '#ff8833',
      hidden: false,
      name: 'Worker 1.2',
    },
    {
      polyline: [
        [52.25019000601295, 20.993360043428115],
        [52.23852308138769, 20.96965659670597],
        [52.20855341292023, 20.972404822412894],
      ],
      color: '#ff3388',
      hidden: false,
      name: 'Worker 3000',
    }
  ],
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

    case SET_ROUTE_VISIBILITY:
      const updatedRoutes = [...state.routes];
      updatedRoutes[action.index].hidden = action.isVisible;
      return {
        ...state,
        routes: updatedRoutes,
      }

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
