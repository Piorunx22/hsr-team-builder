//
// Version before refactoring
// ! Only use as fallback in case of new one not working
//

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameData } from "@/contexts/GameDataContext";
import { validateLevel } from "@/lib/levels";
import { cn } from "@/lib/shadcn";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ItemIcon from "./ItemIcon";
import { IGameData } from "@/types/GameData";

interface SlotEditorProps {
  states: {
    character: { id: string | null; level: number };
    light_cone: { id: string | null; level: number };
  };
  stateSetters: {
    character: {
      id: React.Dispatch<React.SetStateAction<string | null>>;
      level: React.Dispatch<React.SetStateAction<number>>;
    };
    light_cone: {
      id: React.Dispatch<React.SetStateAction<string | null>>;
      level: React.Dispatch<React.SetStateAction<number>>;
    };
  };
  isOpen: {
    value: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const NONE = "none";
const NO_NAME = "-";

function SlotEditorAIO({ states, stateSetters, isOpen }: SlotEditorProps) {
  function getCharacterOptions(gameData: IGameData) {
    const options = [
      ...Object.values(gameData.characters)
        .filter((character) => character.name !== "{NICKNAME}")
        .map((character) => {
          return { name: character.name, id: character.id };
        }),
      { name: NO_NAME, id: NONE },
    ].sort((a, b) => a.name.localeCompare(b.name));

    setCharacterOptions(options);
  }

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

  const [characterOptions, setCharacterOptions] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
  const [lightConeOptions, setLightConeOptions] = useState<
    | {
        name: string;
        id: string;
        path: string;
      }[]
    | null
  >(null);

  const [showAllLightCones, setShowAllLightCones] = useState<boolean>(false);

  const [selectedCharacterID, setSelectedCharacterID] = useState<string | null>(
    states.character.id
  );
  const [selectedLightConeID, setSelectedLightConeID] = useState<string | null>(
    states.light_cone.id
  );
  const [characterLevel, setCharacterLevel] = useState<number>(states.character.level);
  const [lightConeLevel, setLightConeLevel] = useState<number>(states.light_cone.level);

  const gd = useGameData();

  const path =
    Object.values(gd.characters).find((character) => character.id === selectedCharacterID)?.path ||
    NONE;

  useEffect(() => {
    getCharacterOptions(gd);
  }, []);

  useEffect(() => {
    getLightConeOptions(gd, path);
    const selectedPath = Object.values(gd.light_cones).find(
      (light_cone) => light_cone.id === selectedLightConeID
    )?.path;
    if (selectedPath != path) setSelectedLightConeID(null);
  }, [selectedCharacterID]);

  const loadSlotData = () => {
    setSelectedCharacterID(states.character.id);
    setSelectedLightConeID(states.light_cone.id);

    setCharacterLevel(states.character.level);
    setLightConeLevel(states.light_cone.level);
  };

  const openModal = () => {
    loadSlotData();
    isOpen.set(true);
  };

  const closeModal = () => {
    isOpen.set(false);
  };

  const save = () => {
    stateSetters.character.id(selectedCharacterID == NONE ? null : selectedCharacterID);

    const validCharacterLevel = validateLevel(characterLevel);
    stateSetters.character.level(validCharacterLevel);

    stateSetters.light_cone.id(selectedLightConeID == NONE ? null : selectedLightConeID);

    const validLightConeLevel = validateLevel(lightConeLevel);
    stateSetters.light_cone.level(validLightConeLevel);

    closeModal();
  };

  return (
    <>
      <button
        className="p-2"
        onClick={openModal}
      >
        Edit
      </button>
      <Dialog
        open={isOpen.value}
        modal
      >
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className={cn(
            "max-w-full h-full sm:h-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7x;"
          )}
        >
          <Tabs defaultValue="character">
            <DialogHeader className="mb-2">
              <DialogTitle>{selectedCharacterID ? "Edit character" : "Add character"}</DialogTitle>
            </DialogHeader>
            <TabsList className="flex">
              <TabsTrigger value="character">Character</TabsTrigger>
              <TabsTrigger value="light_cone">Light Cone</TabsTrigger>
            </TabsList>
            <TabsContent value="character">
              <div className="flex flex-col">
                <ItemIcon
                  type="character"
                  id={selectedCharacterID}
                />
                <select
                  value={selectedCharacterID || NONE}
                  onChange={(e) =>
                    setSelectedCharacterID(e.target.value == NONE ? null : e.target.value)
                  }
                >
                  {characterOptions.map((character) => (
                    <option
                      key={character.id}
                      value={character.id}
                    >
                      {character.name}
                    </option>
                  ))}
                </select>
                <input
                  value={characterLevel || undefined}
                  type="number"
                  onChange={(e) => setCharacterLevel(Number(e.target.value))}
                />
              </div>
            </TabsContent>
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
                  </>
                ) : (
                  <p>Select character first</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="justify-end">
            {/* <DialogClose> */}
            <Button
              type="button"
              variant="destructive"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={save}
            >
              Save
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SlotEditorAIO;
