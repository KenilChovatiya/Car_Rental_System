import axios from "axios";
import { getToken } from "./getToken";

//  Get All Cars
export const getCars = (keyword="",rent = [0, 100000], carType, seats = 0) => async (dispatch) => {
    dispatch({ type: "ALL_CARS_REQUEST" });
    try {
        let link = `http://localhost:4000/api/car/cars?dailyRentalRate[gt]=${rent[0]}&dailyRentalRate[lt]=${rent[1]}&numOfSeats[gte]=${seats}&keyword=${keyword}`;

        if (carType?.length > 0) {
            carType = carType.join("_");

            link = `http://localhost:4000/api/car/cars?dailyRentalRate[gt]=${rent[0]}&dailyRentalRate[lt]=${rent[1]}&type=${carType}&numOfSeats[gte]=${seats}&keyword=${keyword}`;
        }

        const { data } = await axios.get(link);
        dispatch({
            type: "ALL_CARS_SUCCESS",
            payload: data,
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
}

//  Get Car Details
export const getCarDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "CAR_DETAILS_REQUEST" });

        const { data } = await axios.get(`http://localhost:4000/api/car/${id}`);

        dispatch({
            type: "CAR_DETAILS_SUCCESS",
            payload: data
        })

    } catch (error) {
        dispatch({ type: "CAR_DETAILS_FAIL" })
    }
};

// Create Car --Admin
export const createCar = (carData) => async (dispatch) => {
    try {
        dispatch({ type: "NEW_CAR_REQUEST" });

        const config = {
            headers: { "Content-Type": "application/json", "auth-token": getToken() },
        };

        const { data } = await axios.post(
            `http://localhost:4000/api/car/new`,
            carData,
            config
        );

        dispatch({
            type: "NEW_CAR_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({ type: "NEW_CAR_FAIL" });
    }
};

// Get All Cars For Admin
export const getAdminCars = () => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_CAR_REQUEST" });

        const { data } = await axios.get("http://localhost:4000/api/car/cars");

        dispatch({
            type: "ADMIN_CAR_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ADMIN_CAR_FAIL"
        });
    }
};

// Update CAR --Admin
export const updateCar = (id, carData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_CAR_REQUEST" });

        

        const config = {
            headers: { "Content-Type": "application/json", "auth-token": getToken() },
        };

        const { data } = await axios.put(
            `http://localhost:4000/api/car/${id}`,
            carData,
            config
        );

        dispatch({
            type: "UPDATE_CAR_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({ type: "UPDATE_CAR_FAIL" });
    }
};

// Delete CAR --Admin
export const deleteCar = (id) => async (dispatch) => {
    try {
        dispatch({ type: " DELETE_CAR_REQUEST" });


        const config = {
            headers: { "Content-Type": "application/json", "auth-token": getToken() },
        };

        const { data } = await axios.delete(`http://localhost:4000/api/car/${id}`, config);

        dispatch({ type: "DELETE_CAR_SUCCESS", payload: data });

    } catch (error) {
        dispatch({ type: "DELETE_CAR_FAIL" });
    }
};

//  Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
}