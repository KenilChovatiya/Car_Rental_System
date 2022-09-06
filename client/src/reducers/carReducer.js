// Cars Reducers
export const carReducer = (
  state = { cars: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "ALL_CARS_REQUEST":
    case "ADMIN_CAR_REQUEST":
      return { cars: [], error: false, loading: true };

    case "ALL_CARS_SUCCESS":
    case "ADMIN_CAR_SUCCESS":
      return {
        ...state,
        cars: action.payload.cars,
        loading: false,
        error: false
      };

    case "ALL_CARS_FAIL":
    case "ADMIN_CAR_FAIL":
      return { ...state, loading: false, error: true };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


// SIngle CAR Details Reducer
export const carDetailsReducer = (state = { car: {}, loading: false, error: false }, action) => {
  switch (action.type) {
    case "CAR_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "CAR_DETAILS_SUCCESS":
      return {
        loading: false,
        error: false,
        car: action.payload.car,
      };
    case "CAR_DETAILS_FAIL":
      return {
        loading: false,
        error: true,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//  Create new Car for admin
export const newCarReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case "NEW_CAR_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "NEW_CAR_SUCCESS":
      return {
        loading: false,
        success: action.payload.success,
        car: action.payload.car,
      };
    case "NEW_CAR_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "NEW_CAR_RESET":
      return {
        ...state,
        success: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Update and Delete Car Reducer --Admin
export const CarReducer = (state = { loading: false, isDeleted: false, isUpdated: false, error: false }, action) => {
  switch (action.type) {
    case "DELETE_CAR_REQUEST":
    case "UPDATE_CAR_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_CAR_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case "UPDATE_CAR_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };
    case "DELETE_CAR_FAIL":
    case "UPDATE_CAR_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "DELETE_CAR_RESET":
      return {
        ...state,
        isDeleted: false,
      };
    case "UPDATE_CAR_RESET":
      return {
        ...state,
        isUpdated: false,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
