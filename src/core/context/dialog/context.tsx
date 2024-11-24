import { createContext, useContext } from "react";

const Context = createContext<IDialog | null>(null);
function useDialog(){
	return useContext(Context) as IDialog;
}

interface IDialog{
    showMessage: (message: string) => void;
    showQuestion: (message: string) => Promise<boolean>;
    showComponent: (render: React.ReactNode) => void;
    hideModal: () => void;
}

export { useDialog, Context, IDialog };