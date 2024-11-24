import { ItemDaVenda } from "@models/businessObject/itemDaVenda";
import { vendaService } from "@services/classes/vendaService";
import Hooks from "@utils/hooks";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export function getVendaCode(){
	const model = Hooks.useModel({
		itens: [] as ItemDaVenda[]
	});
	return {
		model,

		adicionarItens(itens: ItemDaVenda[]){
			for (const element of itens) {
				const itemDaLista = model.itens.find(x => x.codigoProduto === element.codigoProduto);
				if(itemDaLista != null)
					itemDaLista.quantidade += element.quantidade;
				else
					model.itens.push(element);

				model.acceptChanges();
			}
		},

		async finalizarVenda(){
			try {

				await vendaService.finalizarVenda(model.itens);
				Dialog.show({
					type: ALERT_TYPE.SUCCESS,
					title: "Sucesso!",
					textBody: "A venda foi concluida com sucesso",
					button: "OK"
				});
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.INFO,
					title: "Erro",
					textBody: "Ocorreu um problema ao finalizar a venda",
					button: "OK"
				});
			}
		}
	};
}