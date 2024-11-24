import Hooks from "@utils/hooks";
import { IVenda, IVendaService } from "./interface";

const controller = Hooks.useApi("vendaService");
export const v1 : IVendaService = {
	async finalizarVenda(itens) {
		await controller.post("", {
			itens
		});
	},

	async obtenhaVendasDoDia(dataISO) {
		return (await controller.get<IVenda[]>("obtenhaVendasDoDia?data=" + dataISO)).data;
	},
};