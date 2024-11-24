import { useAuth } from "@context/auth/context";
import { useModel } from "./useModel";
import { useApi } from "./useApi";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const HooksObject = {
	useModel,
	useAuth,
	useApi,
	useNavigation,
	//useDialog
};

namespace Hooks {
    export const useAuth = HooksObject.useAuth;
	export const useApi = HooksObject.useApi;
	export const useModel = HooksObject.useModel;
	//export const useDialog = HooksObject.useDialog;
	export const useNavigation = HooksObject.useNavigation<NativeStackNavigationProp<RootStackParamList>>;
}

export default Hooks;