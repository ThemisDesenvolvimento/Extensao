import Hooks from "@utils/hooks";
import * as SecureStore from "expo-secure-store";
import { UsuarioEntity } from "@models/entity/usuarioEntity";
import { IAuthContext } from "./context";
import { API } from "@services/Api";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { usuarioService } from "@services/classes/usuarioService";

const inferAs = <U,>() => <T extends U>(v:T) => v;
export function getAuthCode(){
	const usuarioLogado = Hooks.useModel<UsuarioEntity>();
	const model = Hooks.useModel({
		loginValidado: false
	});

	return inferAs<IAuthContext>()({
		usuarioLogado,
		loginFoiValidado: model.loginValidado,

		async autenticar(login, senha) {
			try {
				const retorno = await usuarioService.autenticar(login, senha);
				API.token = retorno.token;

				await SecureStore.setItemAsync("token", retorno.token);
				await this.obterDadosDoUsuario();

				model.loginValidado = true;
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: "Ops...",
					textBody: (error as Error).message
				});
			}
		},

		async validarTokenAutenticacao(): Promise<boolean> {
			try {
				const token = await SecureStore.getItemAsync("token");
				if (token != null) {
					API.token = token;
					await this.obterDadosDoUsuario();

					return true;
				}

				return false;
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: "Ops...",
					textBody: (error as Error).message
				});

				return false;
			} finally {
				model.loginValidado = true;
			}
		},

		async obterDadosDoUsuario(){
			const dados = await usuarioService.obterDadosDoUsuario();
			usuarioLogado.setValues(dados);
		}
	});
}