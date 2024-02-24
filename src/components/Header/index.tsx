"use client";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";

function Header() {
  const t = useDictionary();
  const gameData = useGameData();
  return (
    <header className="flex items-center justify-between p-2 sticky top-0 backdrop-blur-md">
      <h1 className="text">{t("header.title")}</h1>
      <div>
        {t("header.dataVersion")}
        <b>{gameData.version}</b>
      </div>
    </header>
  );
}

export default Header;
