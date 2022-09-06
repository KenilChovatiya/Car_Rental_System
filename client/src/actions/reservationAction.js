import axios from "axios";
import { getToken } from "./getToken";

// Create Reservation
export const createReservation = (bookCar) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_RESERVATION_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.post("http://localhost:4000/api/rental/bookCar", bookCar, config);

    dispatch({ type: "CREATE_RESERVATION_SUCCESS", payload: data });

  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_RESERVATION_FAIL" });
  }
};


// My Booked Cars
export const myBookedCars = () => async (dispatch) => {
  try {
    dispatch({ type: "MY_BOOKED_CAR_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.get("http://localhost:4000/api/rental/me", config);

    dispatch({ type: "MY_BOOKED_CAR_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "MY_BOOKED_CAR_FAIL" });
  }
};

// Get All Reservations (admin)
export const getAdminReservations = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_RESERVATIONS_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.get("http://localhost:4000/api/rental/rentalCars", config);

    dispatch({ type: "ALL_RESERVATIONS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ALL_RESERVATIONS_FAIL"
    });
  }
};


// Update Rental Car Status --Admin
export const updateRentalStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_RESERVATION_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.put(
      `http://localhost:4000/api/rental/${id}`,
      {status},
      config
    );

    console.log(data);
    dispatch({ type: "UPDATE_RESERVATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_RESERVATION_FAIL",
      payload: error.response.data.message,
    });
  }
};


// Delete Rental Cars --Admin
export const deleteRentalCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_RESERVATION_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.delete(`http://localhost:4000/api/rental/${id}`, config);

    dispatch({ type: "DELETE_RESERVATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_RESERVATION_FAIL"});
  }
};

// Get Order Details
export const getBookedCarDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "BOOKED_CAR_DETAILS_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };
    const { data } = await axios.get(`http://localhost:4000/api/rental/${id}`, config);

    dispatch({ type: "BOOKED_CAR_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "BOOKED_CAR_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Rental Cars --user
export const cancelRentalCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_RESERVATION_REQUEST" });

    const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

    const { data } = await axios.delete(`http://localhost:4000/api/rental/me/${id}`, config);

    dispatch({ type: "DELETE_RESERVATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_RESERVATION_FAIL"});
  }
};

//  Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
}