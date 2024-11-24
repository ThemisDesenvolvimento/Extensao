import React from "react";
import { Text, View } from "react-native";
import { useHomeScreenCode } from "./code";
import Hooks from "@utils/hooks";

export function HomeScreen(){
	const codeBehind = useHomeScreenCode();
	const { usuarioLogado } = Hooks.useAuth();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Bem-vindo(a) ao Sales Power!</Text>
			<Text>{usuarioLogado.nome}</Text>
		</View>
	);
}