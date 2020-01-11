import { ADD_ARTICLE, DATA_LOADED, DATA_REQUESTED } from "../constants/action-types";

export const addArticle = payload => ({ type: ADD_ARTICLE, payload });

export const getData = () => ({ type: DATA_REQUESTED });
export const dataLoaded = payload => ({ type: DATA_LOADED, payload });

