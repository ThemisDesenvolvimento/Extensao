export class ModelCreator {
	static createModel<T>(model: new () => T, data?: Partial<T>, converteFuncoes?: boolean) {
		const destino = new model();
		if(data){
			Object.keys(destino as object).forEach((k) => {
				const key = k as keyof T;
				const descritor = Object.getOwnPropertyDescriptor(destino, key);

				if(typeof(destino[key]) === "function" && !converteFuncoes)
					return;

				destino[key] = data[key] as never;
			});
		}

		return destino;
	}
}