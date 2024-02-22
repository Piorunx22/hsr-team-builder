import { CharacterDictionary } from "./Character";

export interface IGameData {
  version: string;
  timestamp: Date;
  characters: CharacterDictionary;
}
