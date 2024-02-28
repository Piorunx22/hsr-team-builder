import { TabsContent } from "@/components/ui/tabs";
import { NONE, NO_NAME } from "@/lib/constants";
import { IGameData } from "@/types/GameData";
import { ISlot } from "@/types/TeamBuilder";
import { useEffect, useState } from "react";
import ItemIcon from "../../ItemIcon";

interface CharacterTabProps {
  gd: IGameData;
  data: ISlot;
  setData: React.Dispatch<React.SetStateAction<ISlot>>;
}
function CharacterTab({ gd, data, setData }: CharacterTabProps) {
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
          id={data.character.id}
        />
        <select
          value={data.character.id || NONE}
          onChange={(e) => {
            setData({
              ...data,
              character: { ...data.character, id: e.target.value == NONE ? null : e.target.value },
            });
          }}
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
          value={data.character.level || undefined}
          type="number"
          onChange={(e) => {
            setData({
              ...data,
              character: { ...data.character, level: Number(e.target.value) },
            });
          }}
        />
      </div>
    </TabsContent>
  );
}

export default CharacterTab;
