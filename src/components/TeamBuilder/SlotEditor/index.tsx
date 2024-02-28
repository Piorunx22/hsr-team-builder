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
import { ISlot } from "@/types/TeamBuilder";
import { useState } from "react";
import CharacterTab from "./Tabs/Character";
import LightConeTab from "./Tabs/LightCone";

interface SlotEditorProps {
  data: ISlot;
  setData: React.Dispatch<React.SetStateAction<ISlot>>;
  isOpen: {
    value: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

function SlotEditor({ data, setData, isOpen }: SlotEditorProps) {
  const [pendingData, setPendingData] = useState<ISlot>({
    character: {
      id: data.character.id,
      level: data.character.level,
    },
    light_cone: {
      id: data.light_cone.id,
      level: data.light_cone.level,
    },
  });

  const gd = useGameData();

  const loadSlotData = () => {
    setPendingData({
      character: {
        id: data.character.id,
        level: data.character.level,
      },
      light_cone: {
        id: data.light_cone.id,
        level: data.light_cone.level,
      },
    });
  };

  const openModal = () => {
    loadSlotData();
    isOpen.set(true);
  };

  const closeModal = () => {
    isOpen.set(false);
  };

  const save = () => {
    setData({
      character: {
        id: pendingData.character.id == NONE ? null : pendingData.character.id,
        level: validateLevel(pendingData.character.level),
      },
      light_cone: {
        id: pendingData.light_cone.id == NONE ? null : pendingData.light_cone.id,
        level: validateLevel(pendingData.light_cone.level),
      },
    });

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
            <DialogTitle>
              {pendingData.character.id ? "Edit character" : "Add character"}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="character">
            <TabsList className="flex justify-evenly">
              <TabsTrigger value="character">Character</TabsTrigger>
              <TabsTrigger value="light_cone">Light Cone</TabsTrigger>
            </TabsList>
            <CharacterTab
              gd={gd}
              data={pendingData}
              setData={setPendingData}
            />
            <LightConeTab
              gd={gd}
              data={pendingData}
              setData={setPendingData}
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
