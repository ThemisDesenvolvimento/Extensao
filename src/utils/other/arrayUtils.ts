export const ArrayUtils = {
	pegarItensAleatorios: <T>(array: T[], quantidadeDeItens: number) => {
		const itensAleatorios: T[] = [];
		quantidadeDeItens = Math.min(quantidadeDeItens, array.length);
		while (itensAleatorios.length < quantidadeDeItens) {
			const indiceAleatorio = Math.floor(Math.random() * array.length);
			const itemAleatorio = array[indiceAleatorio];
        
			// Verifique se o item já foi selecionado antes de adicioná-lo 
			if (!itensAleatorios.includes(itemAleatorio)) {
				itensAleatorios.push(itemAleatorio);
			}
		}

		return itensAleatorios;
	},

	ordenaPor: <T> (a: T, b: T, key: keyof T) => {
		const nomeA = String(a[key]).toUpperCase(); // Ignorar diferenças de maiúsculas e minúsculas
		const nomeB = String(b[key]).toUpperCase();
		
		if (nomeA < nomeB) {
			return -1;
		}
		if (nomeA > nomeB) {
			return 1;
		}
		return 0;
	}
};