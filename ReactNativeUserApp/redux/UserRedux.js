import { foodRecommedApi } from "../constants/AxiosConfig";

const types = {
  GET_CURRENT_LOCATION: "GET_CURRENT_LOCATION",
  GET_CURRENT_LOCATION_FAIL: "GET_CURRENT_LOCATION_FAIL",
  LOADING_GET_LOCATION: "LOADING_GET_LOCATION",
  ON_CHANGE_MAP_RANGE: "ON_CHANGE_MAP_RANGE",
  ON_CHANGE_MAP_REGION: "ON_CHANGE_MAP_REGION",
  INIT_USERID: "INIT_USERID"
};

export const getCurrentLocation = userRegion => dispatch => {
  dispatch({
    type: types.GET_CURRENT_LOCATION,
    payload: userRegion
  });
};

export const userDenyGetCurrentLocation = () => dispatch => {
  dispatch({
    type: types.GET_CURRENT_LOCATION_FAIL,
    payload: {
      hasLocation: false
    }
  });
};

export const waitForGetLocation = () => dispatch => {
  dispatch({
    type: types.LOADING_GET_LOCATION,
    payload: {
      isLoading: true
    }
  });
};

export const changeMapRange = range => dispatch => {
  dispatch({
    type: types.ON_CHANGE_MAP_RANGE,
    payload: range
  });
};

export const changeMapRegion = region => dispatch => {
  dispatch({
    type: types.ON_CHANGE_MAP_REGION,
    payload: region
  });
};

export const initUserId = userId => dispatch => {
  dispatch({
    type: types.INIT_USERID,
    payload: userId
  });
};

export const getUserId = email => {
  return foodRecommedApi
    .post("/api/account/getuserid", {
      email: email
    })
};

const initState = {
  hasLocation: false,
  isLoading: true,
  region: {},
  userId: null
};

export const reducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_CURRENT_LOCATION:
      return {
        ...state,
        region: payload,
        isLoading: false,
        hasLocation: true
      };
    case types.GET_CURRENT_LOCATION_FAIL:
      return {
        ...state,
        region: {},
        hasLocation: false,
        isLoading: false
      };
    case types.LOADING_GET_LOCATION:
      return {
        ...state,
        isLoading: true
      };
    case types.ON_CHANGE_MAP_RANGE:
      return {
        ...state,
        region: {
          ...state.region,
          latitudeDelta: payload,
          longitudeDelta: payload
        }
      };
    case types.ON_CHANGE_MAP_REGION:
      return {
        ...state,
        region: {
          ...state.region,
          latitude: payload.latitude,
          longitude: payload.longitude
        }
      };
    case types.INIT_USERID:
      return {
        ...state,
        userId: payload
      };
    default:
      return state;
  }
};
