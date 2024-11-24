export const Calc = {
	arredondarPara2Casas(numero: number){
		const numeroString = numero.toString();
		const casasDecimais = numeroString.split(".")[1] ?? String.Empty;
		const casasAposAVirgula = casasDecimais.length ?? 0;
		
		if(casasAposAVirgula <= 2)
			return numero;

		// Arredonda o número com base no último dígito decimal
		const ultimoDigitoDecimal = parseInt(casasDecimais[2], 10);
		let novoNumero: number;

		if (ultimoDigitoDecimal >= 5) {
			novoNumero = Math.ceil(numero * 100) / 100;
		} else {
			novoNumero = Math.floor(numero * 100) / 100;
		}

		return novoNumero;
	}
};