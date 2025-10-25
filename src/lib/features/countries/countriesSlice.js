import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ RECOMMENDED - One API call with all data
const api =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies,capital,languages,region,subregion,area,timezones";

const initialState = {
  countries: [],
  selectedCountry: null, // NEW: For single country data
  loading: false, // NEW: Loading state
  error: null, // NEW: Error handling
};

export const fetchCountries = createAsyncThunk(
  "countries/countries",
  async () => {
    const response = await axios.get(api);
    console.log("Response status:", response.status);
    return response.data;
  }
);

export const selectCountryByName = (state, countryName) => {
  return state.countries.countries.find(
    (country) =>
      country.name.common.toLowerCase() === countryName.toLowerCase() ||
      country.name.official.toLowerCase() === countryName.toLowerCase()
  );
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // NEW: Set selected country from existing data
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.error = null;
    },
    // Clear selected country when navigating away
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

export const { setSelectedCountry, clearSelectedCountry } =
  countriesSlice.actions;

export default countriesSlice.reducer;
