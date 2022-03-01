import { AppAlertDialog, AppAlertDialogProps } from "../util/AlertDialog";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface PageContextProps {
  children: ReactNode;
}

interface PageState {
  alert: (props: AppAlertDialogProps) => void;
}

const PageContext = createContext<PageState | undefined>(undefined);

function PageContextProvider({ children }: PageContextProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [appDialogProps, setAppDialogProps] = useState<AppAlertDialogProps>();

  return (
    <PageContext.Provider
      value={{
        alert: (props) => {
          onOpen();
          setAppDialogProps({
            ...props,
            onConfirm: () => {
              onClose();
              props.onConfirm();
            },
            onCancel: () => {
              onClose();
              props.onCancel();
            },
          });
        },
      }}
    >
      {children}
      {isOpen && appDialogProps && <AppAlertDialog {...appDialogProps} />}
    </PageContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContext");
  }
  return context.alert;
}

export { PageContextProvider };
