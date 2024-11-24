import React from "react";
import Hooks from "@utils/hooks";
import { Text, View } from "react-native";

export function PerfilScreen(){
	const { usuarioLogado } = Hooks.useAuth();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Perfil de {usuarioLogado.nome}</Text>
		</View>
	);
}