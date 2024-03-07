import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";
import { NONE, NO_NAME } from "@/lib/constants";
import { IGameData } from "@/types/GameData";
import { ISlot } from "@/types/TeamBuilder";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import ItemIcon from "../../ItemIcon";

interface LightConeTabProps {
  gd: IGameData;
  data: ISlot;
  setData: React.Dispatch<React.SetStateAction<ISlot>>;
}

function LightConeTab({ gd, data, setData }: LightConeTabProps) {
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
    Object.values(gd.characters).find((character) => character.id === data.character.id)?.path ||
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
      (light_cone) => light_cone.id === data.light_cone.id
    )?.path;
    if (selectedPath != path) setData({ ...data, light_cone: { ...data.light_cone, id: null } });
  }, [data.character.id, showAllLightCones]);

  return (
    <TabsContent value="light_cone">
      <div className="flex flex-col">
        {lightConeOptions ? (
          <>
            <ItemIcon
              type="light_cone"
              id={data.light_cone.id}
            />
            <select
              value={data.light_cone.id || NO_NAME}
              onChange={(e) => {
                setData({
                  ...data,
                  light_cone: {
                    ...data.light_cone,
                    id: e.target.value == NONE ? null : e.target.value,
                  },
                });
              }}
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
              value={data.light_cone.level || undefined}
              type="number"
              onChange={(e) => {
                setData({
                  ...data,
                  light_cone: { ...data.light_cone, level: Number(e.target.value) },
                });
              }}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chk-show-all-light-cones"
                onCheckedChange={() => {
                  setShowAllLightCones(!showAllLightCones);
                }}
              />
              <Label htmlFor="chk-show-all-light-cones">Show all light cones</Label>
            </div>
          </>
        ) : (
          <p>Select character first</p>
        )}
      </div>
    </TabsContent>
  );
}

export default LightConeTab;
