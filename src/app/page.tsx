"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_TEAM, SAMPLE_TEAM } from "@/data/sampleTeam";
import { ITeam } from "@/types/TeamBuilder";
import { randomBytes } from "crypto";
import { PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Main() {
  const [currentTab, setCurrentTab] = useState(0);
  const initializeTeams = (): ITeam[] => {
    const savedData = localStorage.getItem("data");
    return savedData
      ? JSON.parse(savedData)
      : [{ id: randomBytes(20).toString("hex"), name: "Team 1", team: SAMPLE_TEAM }];
  };

  const [teams, setTeams] = useState<ITeam[]>(initializeTeams);

  const addTeam = () => {
    const arr = [...teams];
    const teamCount = teams.length;
    arr.push({
      id: randomBytes(20).toString("hex"),
      name: `Team ${teamCount + 1}`,
      team: EMPTY_TEAM,
    });
    setTeams(arr);
    setCurrentTab(arr.length - 1);
  };

  const deleteTeam = (uuid: string) => {
    const arr = [...teams];
    const index = arr.findIndex((team) => team.id == uuid);
    arr.splice(index, 1);

    if (index === currentTab && index !== 0) {
      setCurrentTab(index - 1);
    } else if (index < currentTab) {
      setCurrentTab(currentTab - 1);
    }

    if (arr.length == 0) {
      setTeams([{ id: randomBytes(20).toString("hex"), name: "Team 1", team: EMPTY_TEAM }]);
    } else {
      setTeams(arr);
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(teams));
  }, [teams]);

  const updateTeam = (index: number, updatedTeam: ITeam) => {
    setTeams((prevTeams) => prevTeams.map((team, i) => (i === index ? updatedTeam : team)));
  };

  return (
    <main>
      <Tabs value={String(currentTab)}>
        <TabsList>
          {teams.map((team, index) => (
            <TabsTrigger
              onClick={() => setCurrentTab(index)}
              className="flex items-center justify-center gap-1"
              key={index}
              value={String(index)}
            >
              <span>{team.name}</span>

              <Trash2
                className=""
                size={15}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTeam(team.id);
                }}
              />
            </TabsTrigger>
          ))}
          <button
            value="btn-add-team"
            id="btn-add-team"
            className="ms-1 inline-flex items-center justify-center rounded-sm px-3 py-1.5 ring-offset-background transition-all hover:bg-background hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
      {process.env.NODE_ENV == "development" && (
        <pre className="font-mono font-medium">{JSON.stringify(teams, null, 2)}</pre>
      )}
    </main>
  );
}
