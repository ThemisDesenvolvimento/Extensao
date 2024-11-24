import { useForm } from "@components/form";
import { Button } from "react-native-paper";

export function SubmitButton(props: {
	text: string;
	disabled?: boolean;
	mode?: "text" | "contained" | "outlined" | "elevated" | "contained-tonal";
	style?: object;
	color?: string;
}){
	const form = useForm();

	return (
		<Button
			disabled={props.disabled}
			mode={props.mode ?? "contained"}
			style={props.style ?? { marginVertical: 20 }}
			onPress={() => {
				form?.submit();
			}}
			buttonColor={props.color}
		>
			{props.text}
		</Button>
	);
}