"use client";
import TeamRow from "@/components/TeamBuilder/TeamRow";
import { Locale } from "@/i18n-config";
import { useState } from "react";

export default function Main({
  params,
}: {
  params: {
    lang: Locale;
  };
}) {
  const [team, setTeam] = useState();
  return (
    <main>
      <TeamRow setTeam={setTeam} />
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </main>
  );
}
