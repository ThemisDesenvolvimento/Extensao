/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";

export function NavigatorButton(){
	const navigation = useNavigation();
	const [open, setState] = React.useState(false);

	const onStateChange = () => setState(prev => !prev);

	return (
		<FAB.Group
			style={{ zIndex: 1 }}
			open={open}
			visible
			icon={open ? "close" : "plus"}
			actions={[
				{
					icon: "email",
					label: "Relatório",
					onPress: () => console.log("Pressed email"),
				},
				{
					icon: "plus",
					label: "Nova Venda",
					onPress: () => {
						navigation.navigate(("Vendas" as never, {
							screen: "novaVenda",
							name: "novaVenda",
						}) as never);
					}
				},
			]}
			onStateChange={() => onStateChange()}
		/>

	);
}