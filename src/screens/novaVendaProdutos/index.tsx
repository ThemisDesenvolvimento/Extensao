import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { FlatList, TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { getProdutosNovaVendaCode } from "./code";
import { API } from "@services/Api";
import { Button } from "react-native-paper";

export function ProdutosDaNovaVenda(){
	const codeBehind = getProdutosNovaVendaCode();
	const model = codeBehind.model;

	React.useEffect(() => {
		codeBehind.obterDados();
	}, []);

	return (
		<View style={{ flex: 1, padding: 5 }}>
			<FlatList
				style={{ flexGrow: 1 }}
				data={model.produtos}
				keyExtractor={item => String(item.codigoProduto)}
				maxToRenderPerBatch={10}
				ItemSeparatorComponent={() =>
					<View
						style={{
							marginVertical: 5,
					  		borderBottomColor: "gray",
					  		borderBottomWidth: StyleSheet.hairlineWidth
						}}
					/>
				}
				renderItem={row =>
					<View
						style={{
							height: 100,
							flexDirection: "row",

							width: "100%"
						}}
					>
						<Image
							height={100}
							width={100}
							source={{
								uri: API.BaseURL + "/arquivoService/image?arquivo=produto" + row.item.codigoProduto,
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

							<Text>
							Preço: {row.item.preco.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</Text>
						</View>

						<View style={{ flexDirection: "row", gap: 10, alignSelf: "center" }}>
							<TouchableOpacity
								style={{ backgroundColor: "red", width: 25, height: 25, alignItems: "center", justifyContent: "center" }}
								onPress={() => {
									if(row.item.quantidade > 0){
										row.item.quantidade--;
										model.acceptChanges();
									}
								}}
							>
								<Feather name="minus" color={"white"}/>
							</TouchableOpacity>

							<Text>{row.item.quantidade}</Text>

							<TouchableOpacity
								style={{ backgroundColor: "green", width: 25, height: 25, alignItems: "center", justifyContent: "center" }}
								onPress={() => {
									row.item.quantidade = row.item.quantidade +1;
									model.acceptChanges();
								}}
							>
								<Feather name="plus" color={"white"}/>
							</TouchableOpacity>
						</View>
					</View>
				}
			/>

			<Button
				mode="elevated"
				buttonColor="green"
				textColor="white"
				onPress={() => codeBehind.confirmar()}
			>
				Confirma
			</Button>
		</View>
	);
}