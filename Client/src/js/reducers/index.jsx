import {
  ADD_PACKAGE,
  DELETE_PACKAGE,
  EDIT_PACKAGE,
  TOGGLE_EDIT_MODE,
  TOGGLE_DEPO_MODE,
  ADD_DEPO,
  CENTER_MAP,
  SELECT_PACKAGE,
  ADD_RESULT,
  SET_RESULT_VISIBILITY,
  ADD_ALERT,
  DELETE_ALERT,
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

  results: [],

  alerts: [],
};

function rootReducer(state = initialState, action) {
  console.log(action);
  switch(action.type) {
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

    case ADD_RESULT:
    console.log(ADD_RESULT)
      return {
        ...state,
        results: [...state.results, action.result]
      }

    case SET_RESULT_VISIBILITY:
      const updatedResults = [...state.results];
      updatedResults[action.index].hidden = action.isVisible;
      return {
        ...state,
        results: updatedResults,
      }

    case `${DEFAULT_PREFIX}::${WEBSOCKET_MESSAGE}`:
      const payload = JSON.parse(action.payload.message);
      console.log('Payload:', payload);
      // temporary solution
      // const colors = ["#3388ff", "#ff8833", "#ff3388"];

      const colors = [
        ["#fb6311","#f9403b","#e52858","#b62c69","#982e69"],
        ["#71c7a4","#4fa19a","#3c7889","#40698c","#394d8e"],
        ["#f6bcd8","#ed8ad8","#cc6ad5","#8d59b5","#442599"],
      ];


      const result = {
        routes: [
          ...payload.Routes
        ],
        worker: payload.Worker,
        workerId: payload.WorkerId,
        hidden: false,
        colors: payload.Color || colors[state.results.length % colors.length],
        name: payload.Worker.Name,
        computationTime: Math.round(payload.ComputationTime / 1000 * 100) / 100,
        combinedLength: Math.round(payload.CombinedLength / 1000 * 100) / 100,
        longestRouteLength: Math.round(payload.LongestRouteLength / 1000 * 100) / 100,
        longestRouteTime: Math.round(payload.LongestRouteTime / 60 * 100) / 100,
        averageRoute: Math.round(payload.CombinedLength / payload.NumberOfRoutes / 1000 * 100) / 100,
      };
      console.log('result:', result);



      return {
        ...state,
        results: [...state.results, result]
      };

    case ADD_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.alert],
      };

    case DELETE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((_, index) => index !== action.index),
      };

    default:
      // console.log('unknown action', action);
      return state;
  }
}

export default rootReducer;
