const descriptions: {
	[k: string]: {
		[k2: string | number]: string;
	};
} = {};

export function setEnumDescription(enumerador: object, value: string | number, description: string) {
	const enumType = JSON.stringify(enumerador);
	if (descriptions[enumType] === undefined)
		descriptions[enumType] = {};

	descriptions[enumType][value] = description;
}

export function getEnumDescription<T extends object>(enumerador: T, value: keyof T | unknown): string{
	const enumType = JSON.stringify(enumerador);
	const descricao = descriptions[enumType];

	if (!descricao) {
		const descricaoPadrao = enumerador[value as keyof T];
		return String(descricaoPadrao);
	}

	let valor = descricao[String(value)];
	if(!valor && typeof(value) === "number"){
		const char = String.fromCharCode(value);
		valor = descricao[char];
	}


	return valor ?? enumerador[value as keyof T];
}

export function getEnumData<T extends object>(enumerador: T) {
	const estados = Object.keys(enumerador).filter(k => typeof enumerador[k as unknown as keyof typeof enumerador] === "number");
	const dados = estados.map(p => {
		const value = enumerador[p as keyof typeof enumerador];
		return {
			label: getEnumDescription(enumerador, value),
			value: value
		};
	});

	return dados ;
}

export function getStringEnumData<T extends object>(enumerador: T) {
	const estados = Object.keys(enumerador).filter(k => typeof enumerador[k as unknown as keyof typeof enumerador] === "string");
	const dados = estados.map(p => {
		const value = enumerador[p as keyof typeof enumerador];
		return {
			label: getEnumDescription(enumerador, value),
			value: value
		};
	});

	return dados;
}

export function getEnumArray<T extends object>(enumerador: T) {
	const data = getEnumData(enumerador);
	const array = data.map(d => d.value);
	return array;
}