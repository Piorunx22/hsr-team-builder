"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { useState } from "react";

export default function Main() {
  const [team, setTeam] = useState();
  return (
    <main>
      <TeamRow setTeam={setTeam} />
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </main>
  );
}
