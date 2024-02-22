"use client";

import { Locale } from "@/i18n-config";
import Lang from "@/models/Lang";
import { CharacterDictionary } from "@/types/Character";
import { IGameData } from "@/types/GameData";

const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 3600 },
};

const client_getGameData = async (locale: Locale): Promise<IGameData> => {
  const fetchLang = new Lang(locale).fetchPath;
  const getDataVersion = async (): Promise<string> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_DATA_URL}/info.json`, FETCH_OPTIONS);
    const json = await res.json();
    const v = json.version;
    return v;
  };

  const getCharacters = async (): Promise<CharacterDictionary> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DATA_URL}/index_min/${fetchLang}/characters.json`,
      FETCH_OPTIONS
    );
    return await res.json();
  };

  console.log("Fetching game data");

  const ts = new Date();

  const data = {
    version: await getDataVersion(),
    timestamp: ts,
    characters: await getCharacters(),
  };

  return data;
};

export default client_getGameData;
