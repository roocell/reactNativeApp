import { CALL_API } from 'redux-api-middleware';
import { API_URL } from '../config.js'

// marker fetch
export const FETCH_MARKERS = 'FETCH_MARKERS';
export const FETCH_MARKERS_SUCCESS = 'FETCH_MARKERS_SUCCESS';
export const FETCH_MARKERS_FAILURE = 'FETCH_MARKERS_FAILURE';

export const fetchMarkers = () => ({
  [CALL_API]: {
    types: [FETCH_MARKERS, FETCH_MARKERS_SUCCESS, FETCH_MARKERS_FAILURE],
    endpoint: API_URL+'/markers',
    method: 'GET',
  }
});
//marker toggle
export const TOGGLE_COLOR = 'TOGGLE_COLOR';
