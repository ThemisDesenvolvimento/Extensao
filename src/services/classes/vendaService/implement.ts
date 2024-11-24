import Hooks from "@utils/hooks";
import { IVendaService } from "./interface";

const controller = Hooks.useApi("vendaService");
export const vendaServiceV1 : IVendaService = {
	async finalizarVenda(itens) {
		await controller.post("", {
			itens
		});
	},
};