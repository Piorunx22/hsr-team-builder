"use client";

import { useEffect, useState } from "react";
import CharacterSlot from "./CharacterSlot";
import { ISlot, ITeam } from "@/types/TeamBuilder";

interface TeamRowProps {
  teamData: ITeam;
  setTeamData: React.Dispatch<React.SetStateAction<ITeam>>;
}

function TeamRow({ teamData, setTeamData }: TeamRowProps) {
  const [slots, setSlots] = useState<ISlot[]>(teamData.team || Array(4).fill(null));

  const updateSlot = (index: number, updatedSlot: ISlot) => {
    setSlots((prevSlots: ISlot[]) =>
      prevSlots.map((slot, i) => (i === index ? updatedSlot : slot))
    );
  };

  const saveTeamData = () => {
    setTeamData({ name: teamData.name, team: slots });
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTeamData = teamData;
    updatedTeamData.name = e.target.value;
    setTeamData(updatedTeamData);
  };

  useEffect(() => saveTeamData(), [slots]);

  return (
    <div>
      <p>{teamData.name}</p>
      <input
        className="border border-black"
        placeholder="New name"
        type="text"
        onChange={handleTeamNameChange}
      />

      <div className="grid grid-cols-4 justify-items-center">
        {slots.map((slot, index) => (
          <CharacterSlot
            key={index}
            data={slot}
            setData={(updatedSlot: any) => updateSlot(index, updatedSlot)}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamRow;
