export const StrUtils = {
	stringIncluiValor: (str1: string, str2: string) => {
		const removerAcentos = (str: string) => {
			return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		};
		
		// Converter ambas as strings removendo acentos e colocando em lowercase
		const str1SemAcentos = removerAcentos(str1.toLowerCase());
		const str2SemAcentos = removerAcentos(str2.toLowerCase());

		return str1SemAcentos.includes(str2SemAcentos);
	},

	aplicarMascara: (mask: string, number: number | string) => {
		const s = String(number);
		let r = "";
		for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
			r += mask.charAt(im) == "#" ? s.charAt(is++) : mask.charAt(im);
		}

		return r;
	},
    
	removerMascara: (mask: string, text: string) => {
		const maskLength = mask.split("").filter(c => c === "#").length;
		const s = text;
		let r = "";
		for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
			const canAdd = s.charAt(im) !== mask.charAt(im);

			r += canAdd ? s[is] : "";
			is++;

			if(r.length === maskLength && is === s.length-1){
				r += s[is];
			}
		}

		return r;
	},

	objetoParaQueryString(obj: object){
		const queryStringParts: string[] = [];
		Object.keys(obj).forEach(key => {
			const value = obj[key as keyof typeof obj];

			if(value !== undefined && typeof(value) !== "function" && typeof(value) !== "object")
				queryStringParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
		});

		return queryStringParts.join("&");
	},

	montarQueryStringParaCrudGenerico<T>(filtro: object, joins?: (keyof T)[]){
		const whereKeys: string[] = [];
		Object.keys(filtro).forEach(key => {
			const value = filtro[key as keyof typeof filtro];
			whereKeys.push(`${encodeURIComponent(key)}:${encodeURIComponent(value)}`);
		});

		let queryString = "where=" + whereKeys.join(",");

		if(joins && joins.length > 0)
			queryString += "&joins=" + joins.join(",");

		return queryString;
	},

	generateRandomUUID() {
		// Cria um array de caracteres hexadecimal para representar os dígitos do UUID
		const hexDigits = "0123456789abcdef";
	  
		// Gera um UUID no formato xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
		let uuid = "";
		for (let i = 0; i < 36; i++) {
			if (i === 8 || i === 13 || i === 18 || i === 23) {
				uuid += "-";
			} else if (i === 14) {
				uuid += "4"; // Define o 13º caractere como 4 (versão 4 UUID)
			} else if (i === 19) {
				uuid += hexDigits[(Math.random() * 4) | 8]; // Define o 19º caractere como 8, 9, A ou B (variante 8)
			} else {
				uuid += hexDigits[Math.floor(Math.random() * 16)];
			}
		}
	  
		return uuid;
	}
};