import { TabsContent } from "@/components/ui/tabs";
import { NONE, NO_NAME } from "@/lib/constants";
import { IGameData } from "@/types/GameData";
import { useEffect, useState } from "react";
import ItemIcon from "../../ItemIcon";

interface LightConeTabProps {
  gd: IGameData;
  selectedCharacterID: string | null;
  selectedLightConeID: string | null;
  setSelectedLightConeID: React.Dispatch<React.SetStateAction<string | null>>;
  lightConeLevel: number;
  setLightConeLevel: React.Dispatch<React.SetStateAction<number>>;
}

function LightConeTab({
  gd,
  selectedCharacterID,
  selectedLightConeID,
  setSelectedLightConeID,
  lightConeLevel,
  setLightConeLevel,
}: LightConeTabProps) {
  const [lightConeOptions, setLightConeOptions] = useState<
    | {
        name: string;
        id: string;
        path: string;
      }[]
    | null
  >(null);
  const [showAllLightCones, setShowAllLightCones] = useState<boolean>(false);

  const path =
    Object.values(gd.characters).find((character) => character.id === selectedCharacterID)?.path ||
    NONE;

  function getLightConeOptions(gameData: IGameData, path: string) {
    if (path == NONE) {
      setLightConeOptions(null);
      return;
    }
    const options = [
      ...Object.values(gameData.light_cones).map((light_cone) => {
        return { name: light_cone.name, id: light_cone.id, path: light_cone.path };
      }),
      { name: NO_NAME, id: NONE, path: NONE },
    ].sort((a, b) => a.name.localeCompare(b.name));

    if (showAllLightCones) {
      setLightConeOptions(options);
    } else {
      setLightConeOptions(
        options.filter((light_cone) => light_cone.path == path || light_cone.path == NONE)
      );
    }
  }

  useEffect(() => {
    getLightConeOptions(gd, path);
    const selectedPath = Object.values(gd.light_cones).find(
      (light_cone) => light_cone.id === selectedLightConeID
    )?.path;
    if (selectedPath != path) setSelectedLightConeID(null);
  }, [selectedCharacterID, showAllLightCones]);

  return (
    <TabsContent value="light_cone">
      <div className="flex flex-col">
        {lightConeOptions ? (
          <>
            <ItemIcon
              type="light_cone"
              id={selectedLightConeID}
            />
            <select
              value={selectedLightConeID || NO_NAME}
              onChange={(e) =>
                setSelectedLightConeID(e.target.value == NONE ? null : e.target.value)
              }
            >
              {lightConeOptions.map((light_cone) => (
                <option
                  key={light_cone.id}
                  value={light_cone.id}
                >
                  {light_cone.name}
                </option>
              ))}
            </select>
            <input
              value={lightConeLevel || undefined}
              type="number"
              onChange={(e) => setLightConeLevel(Number(e.target.value))}
            />
            <label>
              <input
                id="check-show-all-light-cones"
                type="checkbox"
                onChange={(e) => {
                  setShowAllLightCones(!showAllLightCones);
                }}
              />
              Show all light cones
            </label>
          </>
        ) : (
          <p>Select character first</p>
        )}
      </div>
    </TabsContent>
  );
}

export default LightConeTab;
