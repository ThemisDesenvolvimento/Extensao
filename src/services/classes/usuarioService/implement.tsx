import { UsuarioEntity } from "@models/entity/usuarioEntity";
import { IRetornoAutenticacao, IUsuarioService } from "@services/interfaces/IUsuarioService";
import Hooks from "@utils/hooks";

const controller = Hooks.useApi("usuarioService");
export const UsuarioServiceV1 : IUsuarioService = {
	autenticar: async function (login: string, senha: string): Promise<IRetornoAutenticacao> {
		const response = await controller.post<IRetornoAutenticacao>("autenticar", {
			login,
			senha
		});

		return response.data;
	},

	obterDadosDoUsuario: async function (): Promise<UsuarioEntity> {
		const response = await controller.get<UsuarioEntity>("dadosUsuario");
		return response.data;
	}
};