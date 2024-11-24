import React from "react";
import Hooks from "@utils/hooks";
import { ProdutoEntity } from "@models/entity/produtoEntity";
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, TextInput, Text } from "react-native-paper";
import { API } from "@services/Api";


export function ListaDeProdutos(props: {
	lista: ProdutoEntity[];
	aoCriar(): void;
	aoEditar(produto: ProdutoEntity): void;
}){
	const model = Hooks.useModel({
		filtro: "",
		lista: [] as ProdutoEntity[],
		produtoSelecionado: undefined as ProdutoEntity | undefined
	});

	React.useEffect(() => {
		model.lista = model.filtro.length > 0
			? props.lista.filter(x =>
				x.codigo.toString().includes(model.filtro)
				|| x.nome.toUpperCase().includes(model.filtro.toUpperCase())
			)
			: props.lista;

	}, [model.filtro, props.lista]);

	return (
		<View style={{ flex: 1, padding: 5 }}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<Text style={{ fontSize: 24 }}>
					Produtos
				</Text>

				<Button
					mode="contained"
					buttonColor="green"
					icon={"plus"}
					style={{
						borderRadius: 5,
						width: "40%"
					}}
					onPress={props.aoCriar}
				>
					Novo Produto
				</Button>
			</View>

			<TextInput
				style={{ marginVertical: 10, padding: 0 }}
				placeholder="Digite para buscar"
				mode="outlined"
				value={model.filtro}
				onChangeText={v => model.filtro = v}
			/>

			<FlatList
				data={model.lista}
				ListEmptyComponent={() =>
					<Text style={{ textAlign: "center", marginTop: 100, fontSize: 24 }}>
						{"Não há produtos cadastrados\r\n\r\nClique em \"Novo Produto\" para adicionar"}
					</Text>
				}
				keyExtractor={item => String(item.codigo)}
				maxToRenderPerBatch={5}
				ItemSeparatorComponent={() =>
					<View
						style={{
							marginVertical: 5,
					  		borderBottomColor: "black",
					  		borderBottomWidth: StyleSheet.hairlineWidth
						}}
				  />}
				renderItem={row =>
					<TouchableOpacity
						style={{
							height: 100,
							flexDirection: "row",
							width: "100%"
						}}
						onPress={() => {
							props.aoEditar(row.item);
						}}
					>
						<Image
							height={100}
							width={100}
							source={{
								uri: API.BaseURL + "/arquivoService/image?arquivo=produto" + row.item.codigo,
							}}
						/>

						<View style={{ flexGrow: 1 }}>
							<Text
								style={{
									color: "#00b5ec",
									fontSize: 24,
									width: "65%",
									fontWeight: "500"
								}}
							>
								{row.item.nome}
							</Text>

							<Text>Estoque Atual: {row.item.estoque}</Text>
							<Text>
								Preço: {row.item.preco.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</Text>
						</View>
					</TouchableOpacity>
				}

			/>
		</View>
	);
}