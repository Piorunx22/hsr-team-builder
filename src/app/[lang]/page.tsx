"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { SAMPLE_TEAM } from "@/data/sampleTeam";
import { ITeam } from "@/types/TeamBuilder";
import { useEffect, useState } from "react";

export default function Main() {
  const initializeTeams = (): ITeam[] => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : SAMPLE_TEAM;
  };

  const [teams, setTeams] = useState<ITeam[]>(initializeTeams);

  const emptyTeam = Array(4).fill({
    character: {
      id: null,
      level: 0,
    },
    light_cone: {
      id: null,
      level: 0,
    },
  });

  const addTeam = () => {
    const arr = [...teams];
    arr.push({ name: "team", team: emptyTeam });
    setTeams(arr);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(teams));
  }, [teams]);

  const updateTeam = (index: number, updatedTeam: ITeam) => {
    setTeams((prevTeams) => prevTeams.map((team, i) => (i === index ? updatedTeam : team)));
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main>
      {teams.map((team, index) => (
        <TeamRow
          key={index}
          teamData={team}
          setTeamData={(updatedTeam: any) => updateTeam(index, updatedTeam)}
        />
      ))}
      <button onClick={addTeam}>Add team</button>
      <pre>{JSON.stringify(teams, null, 2)}</pre>
    </main>
  );
}
