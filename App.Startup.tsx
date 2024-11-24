import { ConfigurarServicos } from "@services/inject";
import { ConfigurarExtensions } from "@utils/extensions";


let configuracoesRealizadas = false;
export function Startup(){
	if(!configuracoesRealizadas){
		ConfigurarExtensions();
		ConfigurarServicos();

		configuracoesRealizadas = true;
	}
}