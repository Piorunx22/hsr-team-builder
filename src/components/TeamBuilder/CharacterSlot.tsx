import { useEffect, useState } from "react";
import ItemIcon from "./ItemIcon";

function CharacterSlot({ data, setData }) {
  const [character, setCharacter] = useState<string>("");
  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
  };

  const [characterLevel, setCharacterLevel] = useState<number>(80);
  const handleCharacterLevelChange = (e) => {
    setCharacterLevel(Number(e.target.value));
  };

  const [lightCone, setLightCone] = useState<string>("");
  const handleLightConeChange = (e) => {
    setLightCone(e.target.value);
  };

  const [lightConeLevel, setLightConeLevel] = useState<number>(80);
  const handleLightConeLevelChange = (e) => {
    setLightConeLevel(Number(e.target.value));
  };

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
    <div className="flex flex-col">
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

      <input
        className="border border-black"
        placeholder="Character ID"
        type="text"
        onChange={handleCharacterChange}
      />
      <input
        className="border border-black"
        placeholder="Character Level"
        type="text"
        onChange={handleCharacterLevelChange}
      />

      <input
        className="border border-black"
        placeholder="Light Cone ID"
        type="text"
        onChange={handleLightConeChange}
      />
      <input
        className="border border-black"
        placeholder="Light Cone Level"
        type="text"
        onChange={handleLightConeLevelChange}
      />
    </div>
  );
}

export default CharacterSlot;
