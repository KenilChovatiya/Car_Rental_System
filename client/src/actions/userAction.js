import axios from "axios";
import { getToken } from "./getToken";

//  Login
export const login = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`http://localhost:4000/api/auth/login`, formData, config);
        dispatch({ type: "LOGIN_SUCCESS", payload: data })

    } catch (error) {
        console.log(error);
        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
    }
}


//  Sign Up user
export const signUp = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_USER_REQUEST" });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`http://localhost:4000/api/auth/register`, formData, config);

        dispatch({ type: "REGISTER_USER_SUCCESS", payload: data })

    } catch (error) {
        dispatch({ type: "REGISTER_USER_FAIL", payload: error.response.data.message });
    }
}

// Log Out
export const logout = () => async (dispatch) => {
    dispatch({ type: "LOGOUT_SUCCESS" })
}


// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });

        const { data } = await axios.get(`http://localhost:4000/api/user/me`, {
            headers: {
                "auth-token": getToken()
            }
        });
        dispatch({ type: "LOAD_USER_SUCCESS", payload: data })

    } catch (error) {
        console.log(error);
        dispatch({ type: "LOAD_USER_FAIL", payload:error.response.data.message });
    }
}

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PROFILE_REQUEST" });
     
        const config = { headers: { "Content-Type": "multipart/form-data", "auth-token": getToken()}};
        const { data } = await axios.put('http://localhost:4000/api/user/me/updateProfile', userData, config);

        dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });

    } catch (error) {
        console.log(error);
        dispatch({ type: "UPDATE_PROFILE_FAIL" });
    }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

        const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };

        const { data } = await axios.put(
            `http://localhost:4000/api/user/me/updatePassword`,
            passwords,
            config
        );

        dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "UPDATE_PASSWORD_FAIL",
            payload:error.response.data.message
        });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_USERS_REQUEST" });
     
        const config = { headers: { "Content-Type": "application/json", "auth-token": getToken() } };
        const { data } = await axios.get(`http://localhost:4000/api/user/`, config);

        dispatch({ type: "ALL_USERS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ALL_USERS_FAIL" });
    }
};

// Update Uaer Admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json", "auth-token": getToken()  } };

        const { data } = await axios.put(
            `http://localhost:4000/api/user/${id}`,
            userData,
            config
        );

        dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
    } catch (error) {
        dispatch({type: "UPDATE_USER_FAIL"});
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json", "auth-token": getToken()  } };
        
        const { data } = await axios.delete(`http://localhost:4000/api/user/${id}`, config);

        dispatch({ type: "DELETE_USER_SUCCESS", payload: data });
    } catch (error) {
        dispatch({type: "DELETE_USER_FAIL"});
    }
};

//  Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
  }