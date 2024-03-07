import { X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeButton?: boolean;
}
export default function Modal({ children, isOpen, setIsOpen, closeButton }: ModalProps) {
  return (
    <Dialog
      modal
      open={isOpen}
    >
      <DialogContent>
        {children}
        {closeButton && (
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:cursor-pointer hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
