import { FlexContainer } from "@components/container";
import { useVenda } from "@context/venda";
import { ProdutoEntity } from "@models/entity/produtoEntity";
import { useNavigation } from "@react-navigation/native";
import { API } from "@services/Api";
import { Image, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";

export function NovaVendaScreen(){
	const navigation = useNavigation();
	const venda = useVenda();
	const itens = venda?.model.itens ?? [];

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<View style={{ flexGrow: 1, width: "100%", borderStyle: "solid", borderWidth: 1, padding: 5 }}>
				<FlatList
					data={[] as ProdutoEntity[]}
					ListEmptyComponent={() =>
						<Text style={{ textAlign: "center", marginTop: 100, fontSize: 24 }}>
							{"Adicione produtos no botão abaixo"}
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

			<View style={{ height: "30%", width: "100%", borderStyle: "solid", borderWidth: 1, padding: 5 }}>
				<FlexContainer direction="row" justify="space-between">
					<Text style={{ fontWeight: "900", fontSize: 18 }}>Valor do Itens</Text>
					<Text style={{ fontWeight: "600", fontSize: 18 }}>{(itens.reduce((total, current) => total + current.preco, 0)).toMoeda("R$")}</Text>
				</FlexContainer>

				<FlexContainer direction="row" justify="space-between">
					<Text style={{ fontWeight: "900", fontSize: 18 }}>Desconto</Text>
					<Text style={{ fontWeight: "600", fontSize: 18 }}>{(0).toMoeda("R$")}</Text>
				</FlexContainer>

				<FlexContainer direction="row" justify="space-between">
					<Text style={{ fontWeight: "900", fontSize: 18 }}>Total da Venda</Text>
					<Text style={{ fontWeight: "600", fontSize: 18 }}>{(itens.reduce((total, current) => total + current.preco, 0)).toMoeda("R$")}</Text>
				</FlexContainer>

				<Button mode="contained" onPress={() => {
					navigation.navigate(("Vendas" as never, {
						screen: "novaVendaProdutos",
						name: "novaVendaProdutos",
					}) as never);
				}}>
					Adicionar Produtos
				</Button>

				<Button mode="contained" onPress={() => venda?.finalizarVenda()}>
					Finalizar
				</Button>
			</View>
		</View>
	);
}