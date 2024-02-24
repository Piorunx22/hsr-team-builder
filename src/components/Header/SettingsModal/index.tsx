import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CogIcon, XIcon } from "lucide-react";
import { useState } from "react";
import AboutTab from "./Tabs/AboutTab";
function SettingsModal() {
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
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <XIcon
              className="h-4 w-4 absolute right-6 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </DialogHeader>
          <>
            <Tabs>
              <TabsList className="flex justify-evenly">
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <>
                <AboutTab />
              </>
            </Tabs>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SettingsModal;
