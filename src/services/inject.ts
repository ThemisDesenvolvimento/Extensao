import { ServiceProvider as Provider } from "./base/serviceProvider";
import { UsuarioServiceMock } from "./classes/UsuarioServiceMock";
import { IUsuarioService } from "./interfaces/IUsuarioService";


export function ConfigurarServicos() {
	globalThis.ServiceProvider = Provider;

	ServiceProvider.collection.addSingleton(IUsuarioService, UsuarioServiceMock);
}
