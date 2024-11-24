import React from "react";
import { Button, Switch } from "react-native-paper";
import { getProdutosCode } from "./code";
import { ListaDeProdutos } from "./lista";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NumberInput } from "@components/numberInput";
import { Form } from "@components/form";
import { SubmitButton } from "@components/button";
import { CustomTextInput } from "@components/textInput";
import { API } from "@services/Api";

export function Produtos(){
	const codeBehind = getProdutosCode();
	const crud = codeBehind.crud;
	const produto = codeBehind.produto;

	useFocusEffect(
		React.useCallback(() => {
			codeBehind.obterLista();
		}, [])
	);

	return (
		!crud.estaEditando && !crud.estaIncluindo
			?
			<ListaDeProdutos
				lista={crud.lista}
				aoCriar={() => codeBehind.aoCriar()}
				aoEditar={produto => codeBehind.aoEditar(produto)}
			/>
			:
			<Form onSubmit={() => codeBehind.salvar()}>
				<View style={{ flex: 1, padding: 5 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between" ,
							marginBottom: 30
						}}
					>
						<Text style={{ fontSize: 24 }}>
							{crud.estaIncluindo && "Criando"}
							{crud.estaEditando && "Editando"}
						</Text>

						<View style={{ flexDirection: "row", width: "50%", gap: 1 }}>
							<Button
								mode="contained"
								buttonColor="#009dff"
								style={{
									borderRadius: 5,
									width: "50%"
								}}
								onPress={() => codeBehind.voltar()}
							>
								Voltar
							</Button>

							<SubmitButton
								text="Salvar"
								color="#2a8a00"
								style={{
									borderRadius: 5,
									width: "50%"
								}}
							/>
						</View>
					</View>

					<ScrollView contentContainerStyle={{ minHeight: "100%", paddingBottom: "100%", gap: 20 }}>
						<Image
							source={{
								uri: API.BaseURL + "/arquivoService/image?arquivo=produto" + produto.codigo,
							}}
							style={{
								resizeMode: "contain",
								borderColor: "black",
								borderWidth: 0.5,
								borderRadius: 5,
								width: "100%",
								height: "80%"
							}}
						/>

						<CustomTextInput
							label={"Codigo do Produto"}
							disabled

							value={produto.codigo?.toString()}
						/>

						<CustomTextInput
							label={"Nome do Produto"}
							required

							value={produto.nome}
							setValue={v => produto.nome = v}
						/>

						<NumberInput
							label="Estoque Atual"
							mode="outlined"
							casasDecimais={0}
							required
							value={produto.estoque}
							setValue={v => produto.estoque = v}
						/>

						<NumberInput
							label="Preço de Venda"
							mode="outlined"
							required
							value={produto.preco}
							setValue={v => produto.preco = v}
						/>

						<View style={{ flexDirection: "column", alignItems: "center"}}>
							<Text style={{ fontSize: 18, fontWeight: "500", marginEnd: 10 }}>
								Produto está ativo?
							</Text>

							<Switch
								style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
								color="blue"
								value={produto.ativo}
								onValueChange={v => {produto.ativo = v;}}
							/>
						</View>
					</ScrollView>
				</View>
			</Form>
	);
}