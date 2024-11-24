import React from "react";
import { View } from "react-native";

export function FlexContainer(props: {
    children?: React.ReactNode;
    direction?: "row" | "column";
    justify?: "center" | "space-between";
}){
	return (
		<View
			style={{
				flex: 1,
				width: "100%",
				flexDirection: props.direction,
				justifyContent: props.justify
			}}
		>
			{props.children}
		</View>
	);
}