import Hooks from "@utils/hooks";
import { BackHandler, ToastAndroid } from "react-native";

export function useLoginScreenCode(){
	const autenticacao = Hooks.useAuth();
	const model = Hooks.useModel({
		login: "",
		senha: "",
		backButtonClicks: 0,
		carregando: false
	});

	return {
		model,

		handleBackButton(){
			if(model.backButtonClicks > 0)
				BackHandler.exitApp();

			model.backButtonClicks += 1;
			setTimeout(() => {
				model.backButtonClicks = 0;
			}, 3000);

			ToastAndroid.show("Pressione mais uma vez para sair", ToastAndroid.SHORT);
			return model.backButtonClicks > 0;
		},

		fazerLogin(){
			model.carregando = true;
			autenticacao.autenticar(model.login, model.senha)
				.finally(() => model.carregando = false);
		}
	};
}