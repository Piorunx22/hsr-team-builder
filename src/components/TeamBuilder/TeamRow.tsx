"use client";

import { useEffect, useState } from "react";
import CharacterSlot from "./CharacterSlot";
import { ISlot, ITeam } from "@/types/TeamBuilder";

interface TeamRowProps {
  teamData: ITeam;
  setTeamData: React.Dispatch<React.SetStateAction<ITeam>>;
}

function TeamRow({ teamData, setTeamData }: TeamRowProps) {
  const updateSlot = (index: number, updatedSlot: ISlot) => {
    const newTeamData = teamData.team;
    newTeamData[index] = updatedSlot;
    setTeamData({ ...teamData, team: newTeamData });
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData({ ...teamData, name: e.target.value });
  };

  return (
    <div>
      <p>{teamData.name}</p>
      <input
        className="border border-black"
        placeholder="New name"
        type="text"
        onChange={handleTeamNameChange}
      />

      <div className="grid grid-cols-1 justify-items-center gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {teamData.team.map((slot, index) => (
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
