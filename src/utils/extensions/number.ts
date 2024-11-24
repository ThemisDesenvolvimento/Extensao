declare global {
    interface Number {
      	toMoeda(prefix?: string, casasDecimais?: number) : string;
    }
}

export function ConfigureNumberExtensions(){
	Number.prototype.toMoeda = function(prefix, casasDecimais){
		const numero = this as number;
		const numeroString = numero.toLocaleString("pt-BR", {
			maximumFractionDigits: casasDecimais ?? 2,
			minimumFractionDigits: casasDecimais ?? 2
		});

		if(!prefix)
			return numeroString;

		return prefix + " " + numeroString;
	};
}