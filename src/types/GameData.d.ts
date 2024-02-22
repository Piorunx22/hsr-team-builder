import { CharacterDictionary } from "./Character";
import { LightConeDictionary } from "./LightCone";

export interface IGameData {
  version: string;
  timestamp: Date;
  characters: CharacterDictionary;
  light_cones: LightConeDictionary;
}
