"use client";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TabsContent } from "@/components/ui/tabs";
import { useDictionary } from "@/contexts/DictionaryContext";
import { useGameData } from "@/contexts/GameDataContext";
import { useRef, useState } from "react";
import { toast } from "sonner";

function DeleteData() {
  const t = useDictionary();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const deleteData = () => {
    localStorage.clear();
    setIsDeleteModalOpen(false);
    toast.success(t("settings.data.delete.success"));
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <>
      <Button
        variant={"destructive"}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        {t("settings.data.button.delete")}
      </Button>
      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <DialogHeader>
          <DialogTitle>{t("settings.data.delete.header.title")}</DialogTitle>
          <DialogDescription>{t("settings.data.delete.header.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant={"secondary"}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => deleteData()}
          >
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </Modal>
    </>
  );
}

interface BackupFileSchema {
  version: {
    schema: number;
    gameData: string;
    app: string;
  };
  timestamp: number;
  theme: string;
  data: string; // stringified json
}

function DataTab() {
  const t = useDictionary();
  const gd = useGameData();

  const fileInput = useRef<HTMLInputElement>(null);

  const exportData = () => {
    try {
      const data = localStorage.getItem("data");
      const theme = localStorage.getItem("theme");
      if (!data || !theme) {
        toast.error(t("settings.data.export.error.generic"));
        return;
      }
      const date = new Date();
      const formattedDate = date
        .toISOString()
        .replace(/[-:.T]/g, "_")
        .slice(0, -5);

      const json: BackupFileSchema = {
        version: {
          schema: 1,
          gameData: gd.version,
          app: process.env.APP_VERSION || "err",
        },
        timestamp: date.getTime(),
        theme: theme,
        data: data,
      };

      const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.download = `HSRTeamBuilder_Backup_${formattedDate}.json`;
      link.click();
      toast.success(t("settings.data.export.success"));
      return;
    } catch (error) {
      console.error(error);
      toast.error(t("settings.data.export.error.generic"));
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      toast.error(t("settings.data.import.error.nofile"));
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (evt) => {
      try {
        const json: BackupFileSchema = JSON.parse(evt.target?.result as string);
        if (!json.version || !json.timestamp || !json.theme || !json.data) {
          toast.error(t("settings.data.import.error.invalid"));
          return;
        }
        localStorage.setItem("data", json.data);
        localStorage.setItem("theme", json.theme);
        toast.success(t("settings.data.import.success"));
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        console.log(error);
        toast.error(t("settings.data.import.error.generic"));
      }
    };

    reader.onerror = () => {
      toast.error(t("settings.data.import.error.read"));
    };
  };

  return (
    <TabsContent value="data">
      <div className="flex justify-between">
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={(event) => {
            importData(event);
          }}
        />
        <Button
          variant={"secondary"}
          onClick={exportData}
        >
          {t("settings.data.button.export")}
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            fileInput.current?.click();
          }}
        >
          {t("settings.data.button.import")}
        </Button>
        <DeleteData />
      </div>
    </TabsContent>
  );
}
export default DataTab;
