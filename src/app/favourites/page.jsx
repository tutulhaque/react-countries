"use client";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { fetchFavourites } from "@/lib/features/favourites/favouritesSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const { favourites, loading } = useSelector((state) => state.favourites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  if (authLoading || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography variant="h6" color="text.secondary">
          Please log in to view your favourite countries.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        My Favourite Countries
      </Typography>

      {favourites.length === 0 ? (
        <Typography textAlign="center" variant="h6" color="text.secondary">
          No favourites found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map((fav) => {
            const country = fav.country_data;
            const name = fav.country_name;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={fav.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.04)" },
                  }}
                >
                  <CardActionArea
                    onClick={() =>
                      router.push(`/countries/${encodeURIComponent(name)}`)
                    }
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "300px",
                        height: 180,
                        borderBottom: "1px solid #eee",
                        borderRadius: "12px 12px 0 0",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={
                          country?.flags?.svg ||
                          country?.flags?.png ||
                          "/placeholder.png"
                        }
                        alt={name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center", py: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {country?.region || "Unknown Region"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default FavouritesPage;
