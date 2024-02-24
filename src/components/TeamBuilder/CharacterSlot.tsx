import { useEffect, useState } from "react";
import ItemIcon from "./ItemIcon";
import { ISlot } from "@/types/TeamBuilder";
import SlotEditor from "./SlotEditor";

interface CharacterSlotProps {
  data: ISlot;
  setData: any;
}

function CharacterSlot({ data, setData }: CharacterSlotProps) {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const [character, setCharacter] = useState<string | null>(data.character.id);
  const [characterLevel, setCharacterLevel] = useState<number>(data.character.level);

  const [lightCone, setLightCone] = useState<string | null>(data.light_cone.id);
  const [lightConeLevel, setLightConeLevel] = useState<number>(data.light_cone.level);

  const save = () => {
    const data = {
      character: {
        id: character,
        level: characterLevel,
      },
      light_cone: {
        id: lightCone,
        level: lightConeLevel,
      },
    };
    setData(data);
  };

  useEffect(() => save(), [character, characterLevel, lightCone, lightConeLevel]);

  return (
    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <div className="flex justify-center gap-2">
        <ItemIcon
          type="character"
          id={character}
          level={characterLevel}
        />
        <ItemIcon
          type="light_cone"
          id={lightCone}
          level={lightConeLevel}
        />
      </div>
      <SlotEditor
        states={{
          character: { id: character, level: characterLevel },
          light_cone: { id: lightCone, level: lightConeLevel },
        }}
        stateSetters={{
          character: { id: setCharacter, level: setCharacterLevel },
          light_cone: { id: setLightCone, level: setLightConeLevel },
        }}
        isOpen={{ value: isEditorOpen, set: setIsEditorOpen }}
      />
    </div>
  );
}

export default CharacterSlot;
