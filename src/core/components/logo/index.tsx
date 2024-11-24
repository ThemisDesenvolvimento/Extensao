import { Image } from "react-native";

export function LogoApp(props: { size: number }){
	return (
		<Image
			source={require("./logo.png")}
			style={{
				width: props.size,
				height: props.size
			}}
		/>
	);
}