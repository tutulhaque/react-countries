import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./features/countries/countriesSlice";
import profileReducer from "./features/profile/profileSlice";
import favouritesReducer from "./features/favourites/favouritesSlice";

// Connecting state
export const makeStore = () => {
    return configureStore({
        reducer: {
            countries: countriesReducer,
            profile: profileReducer,
            favourites: favouritesReducer,
        }
    })
}

