"use client";

import { Locale } from "@/i18n-config";
import Lang from "@/models/Lang";
import { CharacterDictionary } from "@/types/Character";
import { IGameData } from "@/types/GameData";
import { LightConeDictionary } from "@/types/LightCone";

const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 3600 },
};

const client_getGameData = async (locale: Locale): Promise<IGameData> => {
  const fetchLang = new Lang(locale).fetchPath;
  const getResourceInfo = async (): Promise<{
    version: string;
    folder: string;
    timestamp: number;
  }> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_DATA_URL}/info.json`, FETCH_OPTIONS);
    const json = await res.json();
    return json;
  };

  const info = await getResourceInfo();

  console.log(info);

  const _fetchDataJSON = async (file: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DATA_URL}/${info.folder}/${fetchLang}/${file}.json`,
      FETCH_OPTIONS
    );
    return await res.json();
  };

  const getCharacters = async (): Promise<CharacterDictionary> => {
    return await _fetchDataJSON("characters");
  };

  const getLightCones = async (): Promise<LightConeDictionary> => {
    return await _fetchDataJSON("light_cones");
  };

  const ts = new Date();

  const data: IGameData = {
    version: info.version,
    timestamp: ts,
    characters: await getCharacters(),
    light_cones: await getLightCones(),
  };

  return data;
};

export default client_getGameData;
