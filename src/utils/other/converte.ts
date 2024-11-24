export class Converte {
	static StringToInt(value: string) {
		const valorString = value.replace(",", ".");
		return parseInt(valorString) as number;
	}

	static StringToDecimal(value: string) {
		const valorString = value.replace(",", ".");
		return parseFloat(valorString) as number;
	}
}