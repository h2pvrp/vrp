import { ADD_PACKAGE, DELETE_PACKAGE, CENTER_MAP, SELECT_PACKAGE } from '../constants/action-types'


export const add_package = (latitude, longitude) => ({
    type: ADD_PACKAGE,
    package: {
        latitude,
        longitude
    }
})

export const delete_package = index =>({
    type: DELETE_PACKAGE,
    index
})

export const center_map = index => ({
    type: CENTER_MAP,
    index
})

export const select_package = index => ({
    type: SELECT_PACKAGE,
    index
})
