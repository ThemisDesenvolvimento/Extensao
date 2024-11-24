interface Response<T> {
	data?: T;
	statusCode: number;
}

interface ErrorResponse {
	message?: string;
	errors?: string[];
}

globalThis.ehAmbienteDesenvolvimento = process.env.NODE_ENV === "development";

export const API = {
	token: "",
	BaseURL: process.env.EXPO_PUBLIC_API_URL,

	enviarRequisicao: async (url: string, method: string, body?: unknown) => {
		try {
			const headers = new Headers();
			headers.append("rotina", "0");
			headers.append("Content-Type", "application/json");
			headers.append("Authorization", API.token);
			headers.append("ApiKey", String(process.env.EXPO_PUBLIC_API_KEY));

			const requisicao = await fetch(API.BaseURL + url, {
				method: method,
				credentials: "include",
				headers: headers,
				body: body? JSON.stringify(body) : undefined
			});

			if(requisicao.status === 404 && requisicao.headers.get("Content-Length") === "0"){
				throw new Error("Rota não encontrada no servidor: " + url);
			}

			return requisicao;
		} catch (error) {
			if((error as Error).message.includes("Rota não encontrada")){
				throw error;
			}

			throw new Error("Falha ao se comunicar com o servidor");
		}
	},

	get: async <T>(url: string) => {
		const responseBody: Response<T> = { statusCode: 0 };
		const response = await API.enviarRequisicao(url, "GET");

		if (response.status === 400)
			throw new Error("A requisição está em um formato inválido");

		const contentLength = Number(response.headers.get("content-length"));
		if (contentLength > 0)
			responseBody.data = await response.json();

		if ([500, 401, 404, 403, 405].includes(response.status)) {
			const failedResponseBody = responseBody.data as ErrorResponse;
			throw new Error(failedResponseBody.message ?? failedResponseBody.errors?.join(", "));
		}

		return {
			data: responseBody.data! as T,
			statusCode: response.status
		};
	},

	post: async <T>(url: string, body: unknown) => {
		const responseBody: Response<T> = { statusCode: 0 };
		const response = await API.enviarRequisicao(url, "POST", body);

		if (response.status === 400)
			throw new Error("A requisição está em um formato inválido");

		const contentLength = Number(response.headers.get("content-length"));
		if (contentLength > 0)
			responseBody.data = await response.json();

		if ([500, 401, 404, 403, 405].includes(response.status)) {
			const failedResponseBody = responseBody.data as ErrorResponse;
			throw new Error(failedResponseBody.message ?? failedResponseBody.errors?.join(", "));
		}

		return {
			data: responseBody.data! as T,
			statusCode: response.status
		};
	},

	put: async <T>(url: string, body: unknown) => {
		const responseBody: Response<T> = { statusCode: 0 };
		const response = await API.enviarRequisicao(url, "PUT", body);

		if (response.status === 400)
			throw new Error("A requisição está em um formato inválido");

		const contentLength = Number(response.headers.get("content-length"));
		if (contentLength > 0)
			responseBody.data = await response.json();

		if (([500, 401, 404, 403, 405].includes(response.status))) {
			const failedResponseBody = responseBody.data as ErrorResponse;
			throw new Error(failedResponseBody.message ?? failedResponseBody.errors?.join(", "));
		}

		return {
			data: responseBody.data! as T,
			statusCode: response.status
		};
	},

	patch: async <T>(url: string, body: unknown) => {
		const responseBody: Response<T> = { statusCode: 0 };
		const response = await API.enviarRequisicao(url, "PATCH", body);

		if (response.status === 400)
			throw new Error("A requisição está em um formato inválido");

		const contentLength = Number(response.headers.get("content-length"));
		if (contentLength > 0)
			responseBody.data = await response.json();

		if ([500, 401, 404, 403, 405].includes(response.status)) {
			const failedResponseBody = responseBody.data as ErrorResponse;
			throw new Error(failedResponseBody.message ?? failedResponseBody.errors?.join(", "));
		}

		return {
			data: responseBody.data! as T,
			statusCode: response.status
		};
	},

	delete: async <T>(url: string) => {
		const responseBody: Response<T> = { statusCode: 0 };
		const response = await API.enviarRequisicao(url, "DELETE");

		if (response.status === 400)
			throw new Error("A requisição está em um formato inválido");

		const contentLength = Number(response.headers.get("content-length"));
		if (contentLength > 0)
			responseBody.data = await response.json();

		if ([500, 401, 404, 403, 405].includes(response.status)) {
			const failedResponseBody = responseBody.data as ErrorResponse;
			throw new Error(failedResponseBody.message ?? failedResponseBody.errors?.join(", "));
		}

		return {
			data: responseBody.data! as T,
			statusCode: response.status
		};
	}
};