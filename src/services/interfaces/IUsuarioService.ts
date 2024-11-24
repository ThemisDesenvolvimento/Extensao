import { UsuarioEntity } from "@models/entity/usuarioEntity";

export abstract class IUsuarioService{
    abstract autenticar(login: string, senha: string): Promise<IRetornoAutenticacao>;
    abstract obterDadosDoUsuario(): Promise<UsuarioEntity>;
}

export type IRetornoAutenticacao = {
    token: string;
    usuario: UsuarioEntity;
}