import { getEntityName } from "@utils/decorators/entityName";
import { ModelCreator } from "@models/creator";
import { Entity } from "@models/entity/baseEntity";
import { IFiltroConsulta, IRepositorio } from "@services/interfaces/IRepositorio";
import { useApi } from "@utils/hooks/useApi";
import { RepositorioMock } from "./RepositorioMock";

const useMock = false;
export class RepositorioFactory<T extends Entity> implements IRepositorio<T>{
	private constructor(
		private readonly entityType: new () => T,
		private readonly controller: ReturnType<typeof useApi>
	){}

	static Fabricar<T extends Entity>(entity: new () => T) : IRepositorio<T>{
		const entityName = getEntityName(entity);
    	if(!entityName)
    		throw new Error("EntityName não definido para o repositorio");

		const controller = useApi(`Repositorio/${entityName}`);
    	return useMock
			? new RepositorioMock(entity)
			: new RepositorioFactory(entity, controller);
	}

	async deletar(id: number): Promise<boolean> {
		const response = await this.controller.delete(id.toString());
		return response.statusCode === 200;
	}

	async criar(registro: T): Promise<T>{
    	const corpo = this.criarPatchs(registro);
    	const response = await this.controller.post<T>(String.Empty, corpo);

    	return ModelCreator.createModel(this.entityType, response.data);
	}

	async criarMuitos(registros: T[]): Promise<T[]> {
    	const corpo = registros.map(r => this.criarPatchs(r));
    	const response = await this.controller.post<T[]>(String.Empty, corpo);

    	return response.data.map(registro => ModelCreator.createModel(this.entityType, registro));
	}

	async atualizar(id: number, registro: T): Promise<T> {
    	const corpo = this.criarPatchs(registro);
    	const response = await this.controller.put<T>(id.toString(), corpo);

    	return ModelCreator.createModel(this.entityType, response.data);
	}

	async atualizarParcial(id: number, registro: Partial<T>): Promise<T> {
    	const corpo = this.criarPatchs(registro);
    	const response = await this.controller.put<T>(id.toString(), corpo);

    	return ModelCreator.createModel(this.entityType, response.data);
	}

	async buscar<K extends keyof T>(filtros?: IFiltroConsulta<T, K>): Promise<T[]> {
    	let queryString = "?";

    	if(filtros != null){
    		const listaFiltros = Array.isArray(filtros.where)? filtros.where : [filtros.where];

    		if(filtros.joins && filtros.joins.length > 0)
    			queryString += "joins=" + filtros.joins.join(",") + "&";

    		queryString += "where=";
    		for (const filtro of listaFiltros) {
    			Object.keys(filtro).forEach((key: string) => {
    				const chave = key as keyof T;
    				const filtroDaChave = filtro[chave]!;
					if(filtroDaChave == null) return;

    				queryString +=
						encodeURIComponent(key)
						+ encodeURIComponent(filtroDaChave[0])
						+ encodeURIComponent(String(filtroDaChave[1] ?? null));
    			});

				if(filtro !== listaFiltros.last())
    				queryString += "|";
    		}
    	}

    	const response = await this.controller.get<T[]>(queryString);
    	return response.data.map(registro => ModelCreator.createModel(this.entityType, registro));
	}


	private criarPatchs(data: Partial<T>){
    	const dadosParaEnviar = ModelCreator.createModel(this.entityType, data);
    	const patchs: {op: string; path: string; value: Partial<T>[keyof T]}[] = [];

    	Object.keys(dadosParaEnviar as object).forEach(k => {
    		if (k === "setter")
    			return;

    		if(!Object.hasOwn(data, k))
    			return;

    		const ehFuncao = typeof(data[k as keyof typeof data]) === "function";
    		if(!ehFuncao){
    			const patch = { op: "replace", path: "/" + k, value: data[k as keyof typeof data] };
    			patchs.push(patch);
    		}
    	});

    	return patchs;
	}

}