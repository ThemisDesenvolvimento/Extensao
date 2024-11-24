import * as React from "react";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "./interface";
import { View } from "react-native";

export const CustomTextInput = (props: TextInputProps) => {
	const textLength = props.value? props.value.length : 0;
	return (
		<View style={{ width: "100%" }}>
			<TextInput
				label={props.label}
				value={props.value}
				disabled={props.disabled}
				onChangeText={text => props.setValue && props.setValue(text)}
				mode="outlined"
				secureTextEntry={props.type === "password"}
			/>
		</View>
	);
};