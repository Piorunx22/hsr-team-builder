import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { DictionaryProvider } from "@/contexts/DictionaryContext";
import { GameDataProvider } from "@/contexts/GameDataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HSR Team Builder",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Analytics />
        <SpeedInsights />
        {/* ThemeProvider causes Warning: Extra attributes from the server: class,style at html  */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <GameDataProvider>
            <DictionaryProvider>
              <Header />
              {children}
              <Toaster richColors />
            </DictionaryProvider>
          </GameDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
