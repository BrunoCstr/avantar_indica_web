import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
}

export function AlertModal({
  open,
  setOpen,
  title,
  description,
}: AlertModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-2 border-blue rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-tertiary-purple font-bold cursor-pointer border-none hover:bg-white hover:text-tertiary-purple transition-all duration-500">FECHAR</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
