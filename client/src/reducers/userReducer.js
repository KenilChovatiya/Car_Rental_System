// User Reducer
export const userReducer = (state = { user: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_USER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
        error: false
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        user: action.payload.user
      };

    case "LOGOUT_SUCCESS":
      localStorage.clear();
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case "LOGIN_FAIL":
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case "LOAD_USER_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOGOUT_FAIL":
      return {
        ...state,
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

// User Profile Update
export const profileReducer = (state = { user: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
    case "UPDATE_PASSWORD_REQUEST":
    case "UPDATE_USER_REQUEST":
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_PROFILE_SUCCESS":
    case "UPDATE_PASSWORD_SUCCESS":
      if (action.payload.token) {
        JSON.parse(localStorage.getItem('profile')).token = action.payload.token;
        let data = JSON.parse(localStorage.getItem('profile'));
        localStorage.setItem("profile", JSON.stringify(data));
      }
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success
      };

    case "UPDATE_PROFILE_FAIL":
    case "UPDATE_PASSWORD_FAIL":
    case "UPDATE_USER_FAIL":
    case "DELETE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_PROFILE_RESET":
    case "UPDATE_PASSWORD_RESET":
    case "UPDATE_USER_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_USER_RESET":
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };

    case "ALL_USERS_FAIL":
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