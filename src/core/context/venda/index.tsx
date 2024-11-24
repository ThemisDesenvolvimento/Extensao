import React from "react";
import { getVendaCode } from "./code";

const Contexto = React.createContext<ReturnType<typeof getVendaCode> | null>(null);
export function VendaProvider(props: { children: React.ReactNode }){
	const code = getVendaCode();
	return (
		<Contexto.Provider value={code}>
			{props.children}
		</Contexto.Provider>
	);
}

export const useVenda = () => React.useContext(Contexto);