"use client";

import { Locale } from "@/i18n-config";
import client_getGameData from "@/lib/client_getGameData";
import { IGameData } from "@/types/GameData";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const GameDataContext = createContext<IGameData | null>(null);

export function GameDataProvider({ children }: { children: ReactNode }) {
  const [gameData, setGameData] = useState<IGameData>();

  useEffect(() => {
    async function fetchGameData() {
      const locale: Locale = (localStorage.getItem("lang") as Locale) || "en";
      const data = await client_getGameData(locale);
      setGameData(data);
    }

    fetchGameData();
  }, []);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return <GameDataContext.Provider value={gameData}>{children}</GameDataContext.Provider>;
}

export function useGameData() {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error("useGameData must be used within a GameDataProvider");
  }

  if (context === null) {
    throw new Error("context is null");
  }

  return context;
}
