"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_TEAM, SAMPLE_TEAM } from "@/data/sampleTeam";
import { ITeam } from "@/types/TeamBuilder";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Main() {
  const initializeTeams = (): ITeam[] => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : [{ name: "Team 1", team: SAMPLE_TEAM }];
  };

  const [teams, setTeams] = useState<ITeam[]>(initializeTeams);

  const addTeam = () => {
    const arr = [...teams];
    const teamCount = teams.length;
    arr.push({ name: `Team ${teamCount + 1}`, team: EMPTY_TEAM });
    setTeams(arr);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(teams));
  }, [teams]);

  const updateTeam = (index: number, updatedTeam: ITeam) => {
    setTeams((prevTeams) => prevTeams.map((team, i) => (i === index ? updatedTeam : team)));
  };

  return (
    <main>
      <Tabs defaultValue="0">
        <TabsList>
          {teams.map((team, index) => (
            <TabsTrigger
              key={index}
              value={String(index)}
            >
              {team.name}
            </TabsTrigger>
          ))}
          <button
            value="btn-add-team"
            id="btn-add-team"
            className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 ms-1 hover:bg-background hover:text-foreground hover:shadow-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            // className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background shadow-sm hover:text-foreground"
            onClick={addTeam}
          >
            <PlusCircle size={20} />
          </button>
        </TabsList>
        {teams.map((team, index) => (
          <TabsContent
            key={index}
            value={String(index)}
          >
            <TeamRow
              teamData={team}
              setTeamData={(updatedTeam: any) => updateTeam(index, updatedTeam)}
            />
          </TabsContent>
        ))}
      </Tabs>
      {process.env.NODE_ENV == "development" && <pre>{JSON.stringify(teams, null, 2)}</pre>}
    </main>
  );
}
