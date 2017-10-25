import {
  FETCH_MARKERS,
  FETCH_MARKERS_SUCCESS,
  FETCH_MARKERS_FAILURE,
  TOGGLE_COLOR,
} from '../actions/MapActions';

const INITIAL_STATE = { MapState: { pins: [], error: null, loading: false } };

export default function(state = INITIAL_STATE, action) {
  let error;
  console.log("MapReducer "+ action.type);
  console.log(action.payload);
  switch(action.type) {

  case FETCH_MARKERS:
  	return { ...state, MapState: { pins: [], error: null, loading: true} };
  case FETCH_MARKERS_SUCCESS:
    return { ...state, MapState: { pins: action.payload, error: null, loading: false } };
  case FETCH_MARKERS_FAILURE:
    error = action.payload.data || { message: action.payload.message };
    return { ...state, MapState: { pins: [], error: error, loading: false } };
  case TOGGLE_COLOR:
    console.log("changing pin color");
    var new_pins = new Array();
    for (pin in state.MapState.pins){
      new_pins.push(state.MapState.pins[pin]);
      if (state.MapState.pins[pin].id == action.pin_id){
        if (state.MapState.pins[pin].color == 'green'){
          new_pins[pin].color = 'red';
        }else if (state.MapState.pins[pin].color =='red'){
          new_pins[pin].color = 'green';
        }
      }
    }
    console.log("pin id to change:");
    console.log(JSON.stringify(action.pin_id));
    console.log(JSON.stringify(new_pins));
    //return { ...state, MapState: newMapState.pins };
    return { ...state, MapState: { pins: new_pins, error: error, loading: false } };
  default:
    return state;
  }
}
