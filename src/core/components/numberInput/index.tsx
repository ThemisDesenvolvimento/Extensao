import React from "react";
import { NumberInputCode } from "./code";
import { Props } from "./interface";
import { TextInput } from "react-native-paper";

export function NumberInput(props: Props){
	const id = React.useId();
	const codeBehind = new NumberInputCode(props);
	const controleInterno = codeBehind.interno;
	const componenteID = props.id ?? id;

	React.useEffect(() => {
		if(props.value !== controleInterno.valor){
			const multiplicador = Math.pow(10, props.casasDecimais ?? 2);
			const novoValor = props.value * multiplicador;
			codeBehind.definirValorDoInput(novoValor.toString());
		}
	}, [props.value]);

	return (
		<TextInput
			id={componenteID}
			mode={props.mode}
			disabled={props.disabled}
			placeholder={props.placeholder}
			label={props.label}
			value={controleInterno.valorInput ?? String.Empty}
			onChangeText={(v) => codeBehind.definirValorDoInput(v)}
			onFocus={() => codeBehind.aoFocarNoInput()}
			onBlur={() => codeBehind.aoSairDoInput()}
			keyboardType="numeric"
		/>
	);
}