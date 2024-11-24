import { UsuarioEntity } from "@models/entity/usuarioEntity";
import React from "react";

export interface IAuthContext{
    usuarioLogado: UsuarioEntity;
    loginFoiValidado: boolean;
    autenticar(login: string, senha: string): Promise<void>;
    validarTokenAutenticacao(): Promise<boolean>;
}

export const Context = React.createContext<IAuthContext | null>(null);
export const useAuth = () => React.useContext(Context) as IAuthContext;