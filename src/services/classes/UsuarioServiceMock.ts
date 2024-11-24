import { ModelCreator } from "@models/creator";
import { UsuarioEntity } from "@models/entity/usuarioEntity";
import { IRetornoAutenticacao, IUsuarioService } from "@services/interfaces/IUsuarioService";
import { StrUtils } from "@utils/other/strUtils";

export class UsuarioServiceMock implements IUsuarioService{
    usuario = ModelCreator.createModel(UsuarioEntity, {
    	codigo: 1
    });

    async autenticar(_login: string, _senha: string): Promise<IRetornoAutenticacao> {
    	return {
    		token: StrUtils.generateRandomUUID(),
    		usuario: this.usuario
    	};
    }

    async obterDadosDoUsuario(): Promise<UsuarioEntity> {
    	return this.usuario;
    }
}