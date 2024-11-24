import React from "react";
import Hooks from "@utils/hooks";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens/home";
import { LoginScreen } from "@screens/login";
import { SplashScreen } from "@screens/splash";
import { Produtos } from "@screens/produtos";
import { PerfilScreen } from "@screens/perfil";
import { VendasScreen } from "@screens/vendas";
import { NovaVendaScreen } from "@screens/novaVenda";
import { ProdutosDaNovaVenda } from "@screens/novaVendaProdutos";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function VendasNavigation(){
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="lista" component={VendasScreen}/>
			<Stack.Screen name="novaVenda" component={NovaVendaScreen}/>
			<Stack.Screen name="novaVendaProdutos" component={ProdutosDaNovaVenda}/>
		</Stack.Navigator>
	);
}

export function Navigator(){
	const autenticacao = Hooks.useAuth();
	const estaAutenticado = autenticacao.usuarioLogado.codigo != null;

	return (
		!estaAutenticado
			?
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="splash" component={SplashScreen} />
				<Stack.Screen name="login" component={LoginScreen} />
			</Stack.Navigator>
			:
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarLabelStyle: {
						fontSize: 14
					}
				}}
			>
				<Tab.Screen
					name="Inicio"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color, size }) =>
							<AntDesign name="home" size={size} color={color} />
					}}
				/>

				<Tab.Screen
					name="Produtos"
					component={Produtos}
					options={{
						tabBarIcon: ({ color, size }) =>
							<Feather name="box" color={color} size={size}/>
					}}
				/>

				<Tab.Screen
					name="Vendas"
					component={VendasNavigation}
					options={{
						tabBarIcon: ({ color, size }) =>
							<Feather name="dollar-sign" color={color} size={size}/>

					}}
				/>

				<Tab.Screen
					name="Perfil"
					component={PerfilScreen}
					options={{
						tabBarIcon: ({ color, size }) =>
							<Feather name="user" color={color} size={size}/>

					}}
				/>
			</Tab.Navigator>
	);
}