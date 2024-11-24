import Feather from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native";
import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigatorButton } from "../../core/navigation/navigator";


export function VendasScreen(){
	const valor = 200;
	return (
		<View style={{ flex: 1,  backgroundColor: "white" }}>
			<NavigatorButton/>
			<View
				style={{
					padding: 5,
					height: 50,
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					marginBottom: "5%",
					borderBottomWidth: StyleSheet.hairlineWidth
				}}
			>
				<TouchableOpacity>
					<Feather name="arrow-left-circle" size={25}/>
				</TouchableOpacity>

				<Text style={{ fontSize: 20 }}>Hoje</Text>

				<TouchableOpacity>
					{false &&
                    <Feather name="arrow-right-circle" size={25}/>
					}
				</TouchableOpacity>
			</View>

			<ScrollView
				contentContainerStyle={{
					minHeight: 300,
					padding: 5,
					alignItems: "center",
					flexGrow: 1
				}}

				style={{

					width: "100%"
				}}
			>
				<View
					style = {{
						width: Dimensions.get("window").width * 0.7,
						height: Dimensions.get("window").width * 0.7,
						justifyContent: "space-evenly",
						alignItems: "center",
						borderRadius: Math.round(Dimensions.get("window").width + Dimensions.get("window").height) / 2,
						borderWidth: 8,
						borderColor: "#a200ffd1",
						marginBottom: "5%"
					}}
				>
					<Text></Text>
					<Text style={{ fontSize: 48, fontWeight: "300", }}>
						{valor.toMoeda("R$")}
					</Text>

					<Text style={{ fontSize: 20, fontWeight: "400", color: "#a200ffd1" }} >
                        Total em Vendas
					</Text>
				</View>

				<Text
					style={{
						fontSize: 20,
						borderWidth: 1,
						width: "100%",
						textAlign: "center",
						borderColor: "#a200ffd1",
					}}
				>
                    Detalhamento de Vendas Realizadas
				</Text>
				<View
					style={{
						width: "100%",
						minHeight: 200,
						flexGrow: 1,
						borderWidth: 1,
						borderColor: "#a200ffd1",
					}}
				>

				</View>
			</ScrollView>
		</View>
	);
}