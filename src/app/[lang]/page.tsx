"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { useState } from "react";

export default function Main() {
  const [teams, setTeams] = useState([{ teamName: "team", team: [] }]);

  const addTeam = () => {
    const arr = [...teams];
    arr.push({ teamName: "team", team: [] });
    setTeams(arr);
  };

  const updateTeam = (index: any, updatedTeam: any) => {
    setTeams((prevTeams) => prevTeams.map((team, i) => (i === index ? updatedTeam : team)));
  };
  return (
    <main>
      {teams.map((team, index) => (
        <TeamRow
          key={index}
          teamIndex={index}
          team={team}
          setTeam={(updatedTeam: any) => updateTeam(index, updatedTeam)}
        />
      ))}
      <button onClick={addTeam}>Add team</button>
      <pre>{JSON.stringify(teams, null, 2)}</pre>
    </main>
  );
}
