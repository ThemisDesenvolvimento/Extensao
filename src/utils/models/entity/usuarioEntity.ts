import { EntityName } from "@utils/decorators/entityName";
import { Entity } from "./baseEntity";

@EntityName("UsuarioEntity")
export class UsuarioEntity extends Entity{
    codigo: number;

    nome: string;

    login: string;

    foto?: string;
}