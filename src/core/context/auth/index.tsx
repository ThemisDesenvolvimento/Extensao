import React from "react";
import { getAuthCode } from "./codeV2";
import { Context } from "./context";

export function AutheticationProvider(props: { children: React.ReactNode }){
	const codeBehind = getAuthCode();

	React.useEffect(() => {
		codeBehind.validarTokenAutenticacao();
	}, []);
	return (
		<Context.Provider value={codeBehind}>
			{props.children}
		</Context.Provider>
	);
}