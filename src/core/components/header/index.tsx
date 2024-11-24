import { Text, View } from "react-native";
import { HeaderStyles } from "./styles";

export function Header(props: {
    title: string;
}){
	return (
		<View style={HeaderStyles.container}>
			<Text style={HeaderStyles.textContainer}>
				{props.title}
			</Text>
		</View>
	);
}