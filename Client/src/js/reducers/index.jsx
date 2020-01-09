import {
  ADD_ARTICLE,
  DATA_LOADED,
  API_ERRORED,

  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_OPEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_SEND,
} from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  connected: false,
  messages: [],
  url: null,
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ARTICLE:
    return {
      ...state,
      articles: state.articles.concat(action.payload)
    };

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

    case 'INTERNAL::CLEAR_MESSAGE_LOG':
      return {
        ...state,
        messages: [],
      };

    case REDUX_WEBSOCKET_CONNECT:
      console.log('Aw shit mane I connected')
      return {
        ...state,
        url: action.payload.url,
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };

    case REDUX_WEBSOCKET_MESSAGE:
      console.log('what is going on heere', action)
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: JSON.parse(action.payload.message),
            origin: action.payload.origin,
            timestamp: action.meta.timestamp,
            type: 'INCOMING',
          },
        ],
      };

    case REDUX_WEBSOCKET_SEND:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: action.payload,
            origin: window.location.origin,
            timestamp: new Date(),
            type: 'OUTGOING',
          },
        ],
      };

    default:
      console.log('unknown action', action);
      return state;
  }
}

export default rootReducer;
