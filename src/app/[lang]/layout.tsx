import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { DictionaryProvider } from "@/contexts/DictionaryContext";
import { GameDataProvider } from "@/contexts/GameDataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Locale } from "@/i18n-config";
import Lang from "@/models/Lang";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "HSR Team Builder",
  description: "",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  const lang = new Lang(params.lang);
  return (
    <html lang={lang.htmlLang}>
      <body className={lang.font.className}>
        <Analytics />
        <SpeedInsights />
        {/* ThemeProvider causes Warning: Extra attributes from the server: class,style at html  */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <GameDataProvider locale={lang.locale}>
            <DictionaryProvider locale={lang.locale}>
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
