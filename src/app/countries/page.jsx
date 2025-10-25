"use client";
import {
  CardContent,
  Grid,
  Typography,
  Card,
  CardActionArea,
  TextField,
  InputAdornment,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Countries = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);

  const [visibleCount, setVisibleCount] = useState(16);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  const getCurrencies = (country) => {
    if (!country.currencies) return NaN;
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(",");
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  // Filter countries by search term & region
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (region === "" || country.region === region)
  );

  return (
    <>
      {/* Search + Filter */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ width: "100%", py: 4, flexWrap: "wrap" }}
      >
        {/* Search */}
        <TextField
          variant="outlined"
          placeholder="Search countries..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 400,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filter by Region */}
        <FormControl
          size="small"
          sx={{
            width: 200,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <InputLabel>Filter by Region</InputLabel>
          <Select
            value={region}
            label="Filter by Region"
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Country Grid */}
      <Grid container spacing={3} justifyContent="center">
        {filteredCountries.slice(0, visibleCount).map((country) => (
          <Card key={country.name.common} sx={{ width: 300, height: "auto" }}>
            <CardActionArea
              onClick={() => handleCountryClick(country.name.common)}
            >
              <CardContent>
                <img
                  src={country.flags.svg}
                  alt="flag"
                  className="object-cover w-[100px] h-[50px]"
                />
                <Typography variant="h5">{country.name.common}</Typography>
                <Typography variant="h6">{country.population}</Typography>
                <Typography variant="h6">{getCurrencies(country)}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>

      {/* Load More Button */}
      {visibleCount < filteredCountries.length && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            sx={{
              px: 4,
              py: 1.5,
              background: "linear-gradient(to right, #7e5bef, #5b21b6)",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(to right, #6d28d9, #4c1d95)",
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default Countries;
