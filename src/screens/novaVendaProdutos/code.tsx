import { ItemDaVenda } from "@models/businessObject/itemDaVenda";
import { ProdutoEntity } from "@models/entity/produtoEntity";
import { RepositorioFactory } from "@services/classes/Repositorio";
import Hooks from "@utils/hooks";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const repositorio = RepositorioFactory.Fabricar(ProdutoEntity);
export function getProdutosNovaVendaCode(){
	const model = Hooks.useModel({
		produtos: [] as ItemDaVenda[]
	});
	return {
		model,

		async obterDados(){
			try {
				const produtos = await repositorio.buscar();
				model.produtos = produtos.map(x => ({
					codigoProduto: x.codigo,
					nome: x.nome,
					preco: x.preco,
					quantidade: 0
				}));
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: "Ops...",
					textBody: "Ocorreu um erro inesperado ao buscar os cadastros!",
					button: "OK"
				});
			}
		},

		confirmar(){
			const produtosParaAdicionar = model.produtos.filter(x => x.quantidade > 0);
			if(produtosParaAdicionar.length === 0){
				Dialog.show({
					type: ALERT_TYPE.INFO,
					title: "Informação",
					textBody: "Defina as quantidades que devem ser adicionadas",
					button: "OK"
				});
				return;
			}
		}
	};
}