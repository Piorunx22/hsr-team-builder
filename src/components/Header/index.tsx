"use client";
import { useDictionary } from "@/contexts/DictionaryContext";
import SettingsModal from "./SettingsModal";

function Header() {
  const t = useDictionary();
  return (
    <header className="sticky top-0 flex items-center justify-between p-2 backdrop-blur-md">
      <h1 className="text">{t("header.title")}</h1>
      <SettingsModal />
    </header>
  );
}

export default Header;
