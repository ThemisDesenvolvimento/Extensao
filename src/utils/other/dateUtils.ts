import { DateTime } from "luxon";

export const DateUtils = {
	dataEhValida: (dateString: string, formato: string) => {
		const dateTime = DateTime.fromFormat(dateString, formato, { zone: "utc-3" });
		return dateTime.isValid;
	},

	trocarFormatacao: (dateString: string, formatoAtual: string, novoFormato: string) => {
		const dateTime = DateTime.fromFormat(dateString, formatoAtual, { zone: "utc-3" });
		return dateTime.toFormat(novoFormato);
	},

	stringParaDate: (dateString: string, formato: string) => {
		const dateTime = DateTime.fromFormat(dateString, formato, { zone: "utc-3" });
		return dateTime.toJSDate();
	},

	calcularDiferencaDias: (dataInicial: Date, dataFinal: Date) => {
		const dataInicio = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate());
		const dataFim = new Date(dataFinal.getFullYear(), dataFinal.getMonth(), dataFinal.getDate());

		// Calcular a diferença em milissegundos entre as datas
		const diferencaMilissegundos = dataFim.getTime() - dataInicio.getTime();
		
		// Converter a diferença de milissegundos para dias
		const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));
		return diferencaDias;
	}
};