import { ADD_ARTICLE, DATA_LOADED, DATA_REQUESTED } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function dataLoaded(payload) {
  return { type: DATA_LOADED, payload };
}

export function getData() {
  return { type: DATA_REQUESTED };
}
