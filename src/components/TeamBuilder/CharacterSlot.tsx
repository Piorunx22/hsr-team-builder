import { useEffect, useState } from "react";
import ItemIcon from "./ItemIcon";

function CharacterSlot({ data, setData }) {
  const [character, setCharacter] = useState<string>("1213");
  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
  };

  const [lightCone, setLightCone] = useState<string>("23015");
  const handleLightConeChange = (e) => {
    setLightCone(e.target.value);
  };

  const save = () => {
    const data = {
      character: character,
      light_cone: lightCone,
    };

    setData(data);
  };

  useEffect(() => save(), [character, lightCone]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-2">
        <ItemIcon
          type="character"
          id={character}
        />
        <ItemIcon
          type="light_cone"
          id={lightCone}
        />
      </div>

      <input
        className="border border-black"
        placeholder="Character ID"
        type="text"
        onChange={handleCharacterChange}
        value={character}
      />
      <input
        className="border border-black"
        placeholder="Light Cone ID"
        type="text"
        onChange={handleLightConeChange}
        value={lightCone}
      />
    </div>
  );
}

export default CharacterSlot;
