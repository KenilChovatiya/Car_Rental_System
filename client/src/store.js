import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { carReducer, carDetailsReducer, newCarReducer, CarReducer } from "./reducers/carReducer";
import { allBookedCarsReducer, bookedCarDetailsReducer, myBookedCarsReducer, newReservationReducer, rentalCarReducer } from "./reducers/reservationReducder";
import { allUsersReducer, profileReducer, userReducer } from "./reducers/userReducer";

export const reducers = combineReducers({
    cars: carReducer,
    carDetails: carDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    reservation: newReservationReducer,
    myRentalCars: myBookedCarsReducer,
    bookedCarDetails: bookedCarDetailsReducer,
    newCar: newCarReducer,
    car: CarReducer,
    allBookedCars: allBookedCarsReducer,
    rentalCar: rentalCarReducer,
    allUsers: allUsersReducer,
});

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
