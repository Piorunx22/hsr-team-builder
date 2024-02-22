"use client";

import { useEffect, useState } from "react";
import CharacterSlot from "./CharacterSlot";

function TeamRow({ team, setTeam }) {
  const [slots, setSlots] = useState(Array(4).fill(null));

  const updateSlot = (index: any, updatedSlot: any) => {
    setSlots((prevSlots) => prevSlots.map((slot, i) => (i === index ? updatedSlot : slot)));
  };

  const saveTeamData = () => {
    setTeamData({ name: teamData.name, team: slots });
  };

  const handleTeamNameChange = (e) => {
    const updatedTeam = team;
    updatedTeam.teamName = e.target.value;
    setTeam(updatedTeam);
  };

  useEffect(() => saveTeam(), [slots]);

  return (
    <div>
      <input
        className="border border-black"
        placeholder="Team name"
        type="text"
        onChange={handleTeamNameChange}
      />
      <span>{team.teamName}</span>
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
