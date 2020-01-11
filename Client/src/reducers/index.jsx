import { ADD_PACKAGE, DELETE_PACKAGE, CENTER_MAP, SELECT_PACKAGE } from '../constants/action-types'
import { DEFAULT_PREFIX, WEBSOCKET_MESSAGE } from '@giantmachines/redux-websocket';

const initialState = {
    map_settings: {
        latitude: 52.22977, 
        longitude: 21.01178,
        zoom: 13
    },
    packages: [],
    selected_package: null,
    last_deleted_package: null
};

const rootReducer =(state = initialState, action) => {
    switch (action.type) {
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
            return state;
    }
}

export default rootReducer;
