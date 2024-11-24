import React from "react";
import { View, BackHandler } from "react-native";
import { useLoginScreenCode } from "./code";
import { CustomTextInput } from "@components/textInput";
import { LoginStyles } from "./styles";
import { Button } from "react-native-paper";
import { LogoApp } from "@components/logo";
import { Form } from "@components/form";
import { SubmitButton } from "@components/button";

export function LoginScreen(){
	const codeBehind = useLoginScreenCode();
	const model = codeBehind.model;

	React.useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", codeBehind.handleBackButton);

		return () => {
			BackHandler.removeEventListener("hardwareBackPress", codeBehind.handleBackButton);
		};
	}, []);


	return (
		<View style={LoginStyles.container}>
			<LogoApp
				size={200}
			/>

			<Form onSubmit={() => {
				codeBehind.fazerLogin();
			}}>
				<CustomTextInput
					required
					label="Login"
					value={model.login}
					setValue={v => model.login = v}
				/>

				<CustomTextInput
					required
					label="Senha"
					type="password"
					value={model.senha}
					setValue={v => model.senha = v}
				/>

				<SubmitButton
					disabled={model.carregando}
					text="Entrar com a conta"
				/>
			</Form>
		</View>
	);
}