"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
