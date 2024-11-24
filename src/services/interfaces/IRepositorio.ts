import { Entity } from "@models/entity/baseEntity";

type GetArrayType<T extends Entity[]> = T extends (infer U)[] ? U : never;
type IValorFiltro<T> = [FiltroRepositorio, T]

type EntityJoinKey<T> =
    T extends Entity ? {
      [K in keyof T as T[K] extends (Entity | Entity[]) ? K : never]: `${Exclude<K, symbol>}${"" | `.${JoinPaths<T[K]>}`}`
    }
    :
    T extends Entity[] ? {
      [K in keyof GetArrayType<T> as GetArrayType<T>[K] extends (Entity | Entity[]) ? K : never]: `${Exclude<K, symbol>}${"" | `.${JoinPaths<GetArrayType<T>[K]>}`}`
    }
    :
    never;

type JoinPaths<T> = EntityJoinKey<T>[keyof EntityJoinKey<T>];
type IFiltroRepositorio<T, K extends keyof T> = Partial<{ [key in keyof T]: IValorFiltro<T[K]> }>

export type IFiltroConsulta<TEntity, TKey extends keyof TEntity> = {
    where: IFiltroRepositorio<TEntity, TKey> | IFiltroRepositorio<TEntity, TKey>[];
    joins?: JoinPaths<TEntity>[];
}

export interface IRepositorio<TEntity>{
	  criar(registro: TEntity): Promise<TEntity>;
    criarMuitos(registro: TEntity[]): Promise<TEntity[]>;
    atualizar(id: number, registro: TEntity): Promise<TEntity>;
    atualizarParcial(id: number, registro: Partial<TEntity>): Promise<TEntity>;
    deletar(id: number): Promise<boolean>;
    buscar<K extends keyof TEntity>(filtro?: IFiltroConsulta <TEntity, K>): Promise<TEntity[]>;
}

export enum FiltroRepositorio{
  Igual = "=",
  Contem = "%%",
  EhMaior = ">",
  EhMaiorOuIgual = ">=",
  EhMenor = "<",
  EhMenorOuIgual = "<="
}