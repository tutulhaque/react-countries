"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          mb: 3,
          background: "linear-gradient(to right, #7e5bef, #5b21b6)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            py: 1.5,
          }}
        >
          <Button
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => router.push("/countries")}
          >
            Countries
          </Button>
          <Button
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => router.push("/example")}
          >
            Example
          </Button>
          <Button
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => router.push("/protected")}
          >
            Protected
          </Button>

          {user ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button sx={{ color: "white" }} onClick={() => signOut()}>
                Logout
              </Button>
              <Button
                sx={{ color: "white" }}
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            </Box>
          ) : (
            <Button
              sx={{ color: "white", fontWeight: 600 }}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}
          <Button
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => router.push("/favourites")}
          >
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </Button>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};

export default Navigation;
