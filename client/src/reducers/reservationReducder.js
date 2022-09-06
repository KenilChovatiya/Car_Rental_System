export const newReservationReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_RESERVSTION_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "CREATE_RESERVSTION_SUCCESS":
      return {
        loading: false,
        error: false,
        bookedCar: action.payload.bookcar,
      };

    case "CREATE_RESERVSTION_FAIL":
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

export const myBookedCarsReducer = (state = { bookedCars: [], loading: false, error: false }, action) => {
  switch (action.type) {
    case "MY_BOOKED_CAR_REQUEST":
      return {
        loading: true,
        error: false,
        bookedCars: []
      };

    case "MY_BOOKED_CAR_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        bookedCars: action.payload.rentalCars,
      };

    case "MY_BOOKED_CAR_FAIL":
      return {
        ...state,
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

export const allBookedCarsReducer = (state = { bookedCars: [], loading: false, error: false }, action) => {
  switch (action.type) {
    case "ALL_RESERVATIONS_REQUEST":
      return {
        bookedCars: [],
        loading: true,
        error: false,
      };

    case "ALL_RESERVATIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        bookedCars: action.payload.rentalCars,
      };

    case "ALL_RESERVATIONS_FAIL":
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

export const rentalCarReducer = (state = { loading: false, isUpdated: false, isDeleted: false, error: null }, action) => {
  switch (action.type) {
    case "UPDATE_RESERVATION_REQUEST":
    case "DELETE_RESERVATION_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_RESERVATION_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case "DELETE_RESERVATION_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case "UPDATE_RESERVATION_FAIL":
    case "DELETE_RESERVATION_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "UPDATE_RESERVATION_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_RESERVATION_RESET":
      return {
        ...state,
        isDeleted: false,
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

export const bookedCarDetailsReducer = (state = { bookedCar: {} }, action) => {
  switch (action.type) {
    case "BOOKED_CAR_DETAILS_REQUEST":
      return {
        loading: true,
      };

    case "BOOKED_CAR_DETAILS_SUCCESS":
      return {
        loading: false,
        bookedCar: action.payload.rentalCar,
      };

    case "BOOKED_CAR_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}