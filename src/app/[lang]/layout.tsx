import Header from "@/components/Header";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lang/getDictionary";
import Lang from "@/models/Lang";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "HSR Team Builder",
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  const lang = new Lang(params.lang);
  const dict = await getDictionary(params.lang);
  return (
    <html lang={lang.htmlLang}>
      <body className={lang.font.className}>
        <Header dictionary={dict} />
        {children}
      </body>
    </html>
  );
}
