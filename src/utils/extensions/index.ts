import { ConfigureArrayExtensions } from "./array";
import { ConfigureNumberExtensions } from "./number";
import { ConfigureStringExtensions } from "./string";

export function ConfigurarExtensions(){
	ConfigureStringExtensions();
	ConfigureArrayExtensions();
	ConfigureNumberExtensions();
}