"use client";

import { darkTheme, lightTheme } from "@/core/theme";
import { useThemeStore } from "@/store";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { useMemo } from "react";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();

  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
