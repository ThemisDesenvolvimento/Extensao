import { EntityName } from "@utils/decorators/entityName";
import { Entity } from "./baseEntity";

@EntityName("ProdutoEntity")
export class ProdutoEntity extends Entity{
    codigo: number = undefined as never;

    nome: string = undefined as never;

    estoque: number = undefined as never;

    preco: number = undefined as never;

    ativo: boolean = undefined as never;
}