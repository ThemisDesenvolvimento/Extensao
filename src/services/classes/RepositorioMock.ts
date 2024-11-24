import { ModelCreator } from "@models/creator";
import { Entity } from "@models/entity/baseEntity";
import { FiltroRepositorio, IFiltroConsulta, IRepositorio } from "@services/interfaces/IRepositorio";

export class RepositorioMock<TEntity extends Entity> implements IRepositorio<TEntity> {
    private dataStore: TEntity[] = [];

    constructor(
		private readonly entityType: new () => TEntity,
    ){}

    criar(registro: TEntity): Promise<TEntity> {
    	return new Promise(resolve => {
    		this.dataStore.push(registro);
    		resolve(ModelCreator.createModel(this.entityType, registro));
    	});
    }

    async criarMuitos(registros: TEntity[]): Promise<TEntity[]> {
    	this.dataStore.push(...registros);
    	return registros.map(registro => ModelCreator.createModel(this.entityType, registro));
    }

    atualizar(id: number, registro: TEntity): Promise<TEntity> {
    	return new Promise(resolve => {
    		const index = this.dataStore.findIndex(entity => (entity as TEntity & { codigo: number }).codigo === id);
    		if (index !== -1) {
    			this.dataStore[index] = registro;
    			resolve(ModelCreator.createModel(this.entityType, registro));
    		}
    		throw new Error("Entity not found");
    	});
    }

    async atualizarParcial(id: number, registro: Partial<TEntity>): Promise<TEntity> {
    	const index = this.dataStore.findIndex(entity => (entity as TEntity & { codigo: number }).codigo! === id);
    	if (index !== -1) {
    		this.dataStore[index] = { ...this.dataStore[index], ...registro };
    		return this.dataStore[index];
    	}
    	throw new Error("Entity not found");
    }

    async deletar(id: number): Promise<boolean> {
    	const index = this.dataStore.findIndex(entity => (entity as TEntity & { codigo: number }).codigo === id);
    	if (index !== -1) {
    		this.dataStore.splice(index, 1);
    		return true;
    	}
    	return false;
    }

    buscar<K extends keyof TEntity>(filtro?: IFiltroConsulta<TEntity, K>): Promise<TEntity[]> {
    	return new Promise((resolve => {
    		if (!filtro) return this.dataStore;

    		resolve(this.dataStore.filter(entity => {
    			return filtro.where instanceof Array ?
    				filtro.where.every(cond => this.aplicarFiltro(entity, cond)) :
    				this.aplicarFiltro(entity, filtro.where);
    		}).map(registro => ModelCreator.createModel(this.entityType, registro)));
    	}));
    }

    private aplicarFiltro<K extends keyof TEntity>(entity: TEntity, filtro: Partial<Record<K, [FiltroRepositorio, TEntity[K]]>>): boolean {
    	for (const key in filtro) {
    		const [operador, valor] = filtro[key]!;
    		const entityValue = entity[key];

    		switch (operador) {
    		case FiltroRepositorio.Igual:
    			if (entityValue !== valor) return false;
    			break;
    		case FiltroRepositorio.Contem:
    			if (typeof entityValue === "string" && !entityValue.includes(valor as string)) return false;
    			break;
    		case FiltroRepositorio.EhMaior:
    			if (!(entityValue > valor)) return false;
    			break;
    		case FiltroRepositorio.EhMaiorOuIgual:
    			if (!(entityValue >= valor)) return false;
    			break;
    		case FiltroRepositorio.EhMenor:
    			if (!(entityValue < valor)) return false;
    			break;
    		case FiltroRepositorio.EhMenorOuIgual:
    			if (!(entityValue <= valor)) return false;
    			break;
    		default:
    			return false;
    		}
    	}
    	return true;
    }
}
