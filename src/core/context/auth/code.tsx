import Hooks from "@utils/hooks";
import * as SecureStore from "expo-secure-store";
import { UsuarioEntity } from "@models/entity/usuarioEntity";
import { IAuthContext } from "./context";
import { API } from "@services/Api";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { usuarioService } from "@services/classes/usuarioService";
import React from "react";


export class Autenticacao implements IAuthContext{
	loginFoiValidado: boolean = false;
    usuarioLogado = Hooks.useModel<UsuarioEntity>();
	model = Hooks.useModel({
		loginValidado: false
	});

	login = React.useState(false);
	async autenticar(login: string, senha: string): Promise<void> {
    	try {
    		const retorno = await usuarioService.autenticar(login, senha);
    		API.token = retorno.token;

    		await SecureStore.setItemAsync("token", retorno.token);
    		await this.obterDadosDoUsuario();

			this.model.loginValidado = true;
    	} catch (error) {
    		Dialog.show({
    			type: ALERT_TYPE.DANGER,
    			title: "Ops...",
    			textBody: (error as Error).message
    		});
    	}
	}

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
			this.model.loginValidado = true;
		}
	}

	private async obterDadosDoUsuario(){
    	const dados = await usuarioService.obterDadosDoUsuario();
    	this.usuarioLogado.setValues(dados);
	}
}