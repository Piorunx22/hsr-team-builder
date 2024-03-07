import Modal from "@/components/Modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDictionary } from "@/contexts/DictionaryContext";
import { CogIcon } from "lucide-react";
import { useState } from "react";
import AboutTab from "./Tabs/AboutTab";
import DataTab from "./Tabs/DataTab";
import GeneralTab from "./Tabs/GeneralTab";
function SettingsModal() {
  const t = useDictionary();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <CogIcon />
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <>
          <Tabs defaultValue="general">
            <TabsList className="flex justify-evenly">
              <TabsTrigger value="general">{t("settings.tab.general")}</TabsTrigger>
              <TabsTrigger value="data">{t("settings.tab.data")}</TabsTrigger>
              <TabsTrigger value="about">{t("settings.tab.about")}</TabsTrigger>
            </TabsList>
            <>
              <GeneralTab />
              <DataTab />
              <AboutTab />
            </>
          </Tabs>
        </>
      </Modal>
    </>
  );
}

export default SettingsModal;
