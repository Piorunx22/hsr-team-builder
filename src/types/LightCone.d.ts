export interface ILightCone {
  id: string;
  name: string;
  rarity: number;
  path: Path;
  desc: string;
  icon: string;
  preview: string;
  portrait: string;
}

export interface LightConeDictionary {
  [key: string]: ILightCone;
}
