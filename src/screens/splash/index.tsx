import Hooks from "@utils/hooks";
import React from "react";
import { Text, View } from "react-native";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold, Poppins_500Medium_Italic } from "@expo-google-fonts/poppins";

export function SplashScreen(){
	const autenticacao = Hooks.useAuth();
	const navegacao = Hooks.useNavigation();
	const [fontsAreLoaded] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_700Bold,
		Poppins_500Medium_Italic
	});

	React.useEffect(() => {
		if(fontsAreLoaded && autenticacao.loginFoiValidado)
			(async () => {
				navegacao.navigate("login");
			})();
	}, [fontsAreLoaded, autenticacao.loginFoiValidado]);

	return (
		<View style={{ backgroundColor: "red", flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Splash</Text>
		</View>
	);
}