import { IUsuarioService } from "@services/interfaces/IUsuarioService";
import { UsuarioServiceV1 } from "./implement";

export const usuarioService: IUsuarioService = UsuarioServiceV1;