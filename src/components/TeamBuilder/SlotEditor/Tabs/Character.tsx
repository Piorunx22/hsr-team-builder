import { TabsContent } from "@/components/ui/tabs";
import ItemIcon from "../../ItemIcon";
import { NONE, NO_NAME } from "@/lib/constants";
import { IGameData } from "@/types/GameData";
import { useEffect, useState } from "react";

interface CharacterTabProps {
  gd: IGameData;
  selectedCharacterID: string | null;
  setSelectedCharacterID: React.Dispatch<React.SetStateAction<string | null>>;
  characterLevel: number;
  setCharacterLevel: React.Dispatch<React.SetStateAction<number>>;
}
function CharacterTab({
  gd,
  selectedCharacterID,
  setSelectedCharacterID,
  characterLevel,
  setCharacterLevel,
}: CharacterTabProps) {
  function getCharacterOptions(gameData: IGameData) {
    const options = [
      ...Object.values(gameData.characters)
        .filter((character) => character.name !== "{NICKNAME}")
        .map((character) => {
          return { name: character.name, id: character.id };
        }),
      { name: NO_NAME, id: NONE },
    ].sort((a, b) => a.name.localeCompare(b.name));

    setCharacterOptions(options);
  }

  useEffect(() => {
    getCharacterOptions(gd);
  }, []);

  const [characterOptions, setCharacterOptions] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);

  return (
    <TabsContent value="character">
      <div className="flex flex-col">
        <ItemIcon
          type="character"
          id={selectedCharacterID}
        />
        <select
          value={selectedCharacterID || NONE}
          onChange={(e) => setSelectedCharacterID(e.target.value == NONE ? null : e.target.value)}
        >
          {characterOptions.map((character) => (
            <option
              key={character.id}
              value={character.id}
            >
              {character.name}
            </option>
          ))}
        </select>
        <input
          value={characterLevel || undefined}
          type="number"
          onChange={(e) => setCharacterLevel(Number(e.target.value))}
        />
      </div>
    </TabsContent>
  );
}

export default CharacterTab;
