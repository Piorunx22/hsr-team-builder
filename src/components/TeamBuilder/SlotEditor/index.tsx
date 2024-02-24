import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGameData } from "@/contexts/GameDataContext";
import { NONE } from "@/lib/constants";
import { validateLevel } from "@/lib/levels";
import { cn } from "@/lib/shadcn";
import { useState } from "react";
import CharacterTab from "./Tabs/Character";
import LightConeTab from "./Tabs/LightCone";

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

function SlotEditor({ states, stateSetters, isOpen }: SlotEditorProps) {
  const [selectedCharacterID, setSelectedCharacterID] = useState<string | null>(
    states.character.id
  );
  const [selectedLightConeID, setSelectedLightConeID] = useState<string | null>(
    states.light_cone.id
  );
  const [characterLevel, setCharacterLevel] = useState<number>(states.character.level);
  const [lightConeLevel, setLightConeLevel] = useState<number>(states.light_cone.level);

  const gd = useGameData();

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
          <DialogHeader>
            <DialogTitle>{selectedCharacterID ? "Edit character" : "Add character"}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="character">
            <TabsList className="flex justify-evenly">
              <TabsTrigger value="character">Character</TabsTrigger>
              <TabsTrigger value="light_cone">Light Cone</TabsTrigger>
            </TabsList>
            {/* find a better way to pass props ? */}
            <CharacterTab
              gd={gd}
              selectedCharacterID={selectedCharacterID}
              setSelectedCharacterID={setSelectedCharacterID}
              characterLevel={characterLevel}
              setCharacterLevel={setCharacterLevel}
            />
            <LightConeTab
              gd={gd}
              selectedCharacterID={selectedCharacterID}
              selectedLightConeID={selectedLightConeID}
              setSelectedLightConeID={setSelectedLightConeID}
              lightConeLevel={lightConeLevel}
              setLightConeLevel={setLightConeLevel}
            />
          </Tabs>
          <DialogFooter className="justify-end">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SlotEditor;
