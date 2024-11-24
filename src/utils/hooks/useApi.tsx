import { API } from "@services/Api";


export function useApi(controller: string){
	const controllerPath = "/" + controller + "/";
	const BaseURL = API.BaseURL + "/" + controller;
	return{
		BaseURL,

		get<T>(path: string){
			return API.get<T>(controllerPath + path);
		},

		post<T>(path: string, body: unknown){
			return API.post<T>(controllerPath + path, body);
		},

		put<T>(path: string, body: unknown){
			return API.put<T>(controllerPath + path, body);
		},

		patch<T>(path: string, body: unknown){
			return API.patch<T>(controllerPath + path, body);
		},

		delete<T>(path: string){
			return API.delete<T>(controllerPath + path);
		},
	};
}