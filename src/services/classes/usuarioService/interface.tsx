import { UsuarioEntity } from "@models/entity/usuarioEntity";

export interface IUsuarioService{
    autenticar(login: string, senha: string): Promise<IRetornoAutenticacao>;
    obterDadosDoUsuario(): Promise<UsuarioEntity>;
}

export type IRetornoAutenticacao = {
    token: string;
    usuario: UsuarioEntity;
}