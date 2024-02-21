"use client";

import { useEffect, useState } from "react";
import CharacterSlot from "./CharacterSlot";

function TeamRow({ setTeam }) {
  const [slot1, setSlot1] = useState();
  const [slot2, setSlot2] = useState();
  const [slot3, setSlot3] = useState();
  const [slot4, setSlot4] = useState();

  const saveTeam = () => {
    const obj = [slot1, slot2, slot3, slot4];

    setTeam(obj);
  };

  useEffect(() => saveTeam(), [slot1, slot2, slot3, slot4]);

  return (
    <div className="grid grid-cols-4 justify-items-center">
      <CharacterSlot
        data={slot1}
        setData={setSlot1}
      />
      <CharacterSlot
        data={slot2}
        setData={setSlot2}
      />
      <CharacterSlot
        data={slot3}
        setData={setSlot3}
      />
      <CharacterSlot
        data={slot4}
        setData={setSlot4}
      />
    </div>
  );
}

export default TeamRow;
