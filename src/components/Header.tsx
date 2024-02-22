"use client";
import { useDictionary } from "@/contexts/DictionaryContext";

function Header() {
  const t = useDictionary();
  return (
    <header className="flex items-center justify-between p-2 sticky top-0 backdrop-blur-md">
      <h1 className="text">{t("header.title")}</h1>
      <div>
        {t("header.dataVersion")}
        <b>2.0.0</b>
      </div>
    </header>
  );
}

export default Header;
