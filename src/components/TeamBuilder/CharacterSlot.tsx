import { ISlot } from "@/types/TeamBuilder";
import { useState } from "react";
import ItemIcon from "./ItemIcon";
import SlotEditor from "./SlotEditor";

interface CharacterSlotProps {
  data: ISlot;
  setData: React.Dispatch<React.SetStateAction<ISlot>>;
}

function CharacterSlot({ data, setData }: CharacterSlotProps) {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col bg-secondary">
      <div className="flex justify-center gap-2">
        <ItemIcon
          type="character"
          id={data.character.id}
          level={data.character.level}
        />
        <ItemIcon
          type="light_cone"
          id={data.light_cone.id}
          level={data.light_cone.level}
        />
      </div>
      <SlotEditor
        data={data}
        setData={setData}
        isOpen={{ value: isEditorOpen, set: setIsEditorOpen }}
      />
    </div>
  );
}

export default CharacterSlot;
