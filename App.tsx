import React from "react";
import { Startup } from "./App.Startup";
import { AutheticationProvider } from "@context/auth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigator } from "./src/core/navigation";
import { StatusBar } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { PaperProvider, Portal } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
	Startup();

	return (
		<SafeAreaProvider>
			<PaperProvider>
				<Portal>
					<NavigationContainer>
						<AlertNotificationRoot>
							<AutheticationProvider>
								<StatusBar/>
								<Navigator/>
							</AutheticationProvider>
						</AlertNotificationRoot>
					</NavigationContainer>
				</Portal>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
