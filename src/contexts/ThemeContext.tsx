"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Theme needs to be in localStorage to export data,
  // but isn't until user changes theme manually
  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) localStorage.setItem("theme", "light");
  });
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
