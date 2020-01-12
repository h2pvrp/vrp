import {
  ADD_ARTICLE,
  DATA_LOADED,
  API_ERRORED,

  // REDUX_WEBSOCKET_BROKEN,
  // REDUX_WEBSOCKET_OPEN,
  // REDUX_WEBSOCKET_CLOSED,
  // REDUX_WEBSOCKET_MESSAGE,
  // REDUX_WEBSOCKET_CONNECT,
  // REDUX_WEBSOCKET_SEND,

  ADD_PACKAGE,
  DELETE_PACKAGE,
  CENTER_MAP,
  SELECT_PACKAGE
} from "../constants/action-types";

import { DEFAULT_PREFIX, WEBSOCKET_MESSAGE } from '@giantmachines/redux-websocket';


const initialState = {
  remoteArticles: [],
  messages: [],
  url: null,

  map_settings: {
    latitude: 52.22977,
    longitude: 21.01178,
    zoom: 13
  },
  packages: [],
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

    // case 'INTERNAL::CLEAR_MESSAGE_LOG':
    //   return {
    //     ...state,
    //     messages: [],
    //   };

    // case REDUX_WEBSOCKET_CONNECT:
    //   console.log('Trynna connect...')
    //   return {
    //     ...state,
    //     url: action.payload.url,
    //   };

    // case REDUX_WEBSOCKET_OPEN:
    //   console.log('Aw mane I connected!')
    //   return {
    //     ...state,
    //     connected: true,
    //   };

    // case REDUX_WEBSOCKET_BROKEN:
    // case REDUX_WEBSOCKET_CLOSED:
    //   console.error('Connection broken!', action)
    //   return {
    //     ...state,
    //     connected: false,
    //   };

    // case REDUX_WEBSOCKET_MESSAGE:
    //   console.log('You\'ve got mail' , action)
    //   return {
    //     ...state,
    //     messages: [
    //       ...state.messages,
    //       {
    //         data: JSON.parse(action.payload.message),
    //         origin: action.payload.origin,
    //         timestamp: action.meta.timestamp,
    //         type: 'INCOMING',
    //       },
    //     ],
    //   };

    // case REDUX_WEBSOCKET_SEND:
    //   console.log('Trynna send' , action)
    //   return {
    //     ...state,
    //     messages: [
    //       ...state.messages,
    //       {
    //         data: action.payload,
    //         origin: window.location.origin,
    //         timestamp: new Date(),
    //         type: 'OUTGOING',
    //       },
    //     ],
    //   };

    case ADD_PACKAGE:
      return {
        ...state,
        packages: [...state.packages, action.package]
      };
    case DELETE_PACKAGE:
      return {
        ...state,
        packages: state.packages.filter((_, index) => index !== action.index),
        selected_package: (state.selected_package === action.index) ? null : state.selected_package,
        last_deleted_package: action.index
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
          last_deleted_package: null
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
