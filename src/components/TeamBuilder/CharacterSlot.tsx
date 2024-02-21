import Image from "next/image";
import { useState, useEffect } from "react";

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
        <Image
          width={100}
          height={100}
          src={process.env.NEXT_PUBLIC_BASE_DATA_URL + `/icon/character/${character}.png`}
          alt={character}
        />
        <img
          width={100}
          height={100}
          src={process.env.NEXT_PUBLIC_BASE_DATA_URL + `/icon/light_cone/${lightCone}.png`}
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
