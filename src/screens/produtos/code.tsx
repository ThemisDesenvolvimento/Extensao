import Hooks from "@utils/hooks";
import { ProdutoEntity } from "@models/entity/produtoEntity";
import { RepositorioFactory } from "@services/classes/Repositorio";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const repositorio = RepositorioFactory.Fabricar(ProdutoEntity);
export function getProdutosCode(){
	const produto = Hooks.useModel<ProdutoEntity>({ ativo: true });
	const crud = Hooks.useModel({
		estaIncluindo: false,
		estaEditando: false,
		lista: [] as ProdutoEntity[]
	});

	return {
		crud,
		produto,

		async obterLista(){
			try {
				crud.lista = await repositorio.buscar();
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: "Ops...",
					textBody: "Ocorreu um erro inesperado ao buscar os cadastros!",
					button: "OK"
				});
			}
		},

		aoCriar(){
			crud.estaIncluindo = true;
			crud.estaEditando = false;
		},

		aoEditar(valor: ProdutoEntity){
			crud.estaIncluindo = false;
			crud.estaEditando = true;
			produto.setValues(valor);
		},

		voltar(){
			crud.estaIncluindo = false;
			crud.estaEditando = false;
			produto.clear();
			this.obterLista();
		},

		async salvar(){
			try {
				if(crud.estaIncluindo)
					await repositorio.criar(produto);
				else
					await repositorio.atualizar(produto.codigo, produto);

				this.voltar();
				Dialog.show({
					type: ALERT_TYPE.SUCCESS,
					title: "Sucesso!",
					textBody: "Produto salvo com sucesso!",
					button: "OK"
				});
			} catch (error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: "Ops...",
					textBody: "Ocorreu um erro inesperado ao salvar!",
					button: "OK"
				});
			}
		}
	};
}