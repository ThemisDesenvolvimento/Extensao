/* eslint-disable @typescript-eslint/no-explicit-any */

import { getInjectedServiceData } from "./inject";

export function Injectable() {
	return function(target: any) {
		const original = target;
		const instancia = function (this: any, ...args: any[]) {
			Object.assign(this, new original(args));
			Object.keys(this).forEach(k => {
				const data = getInjectedServiceData(this, k);
				if(data)
					this[k] = ServiceProvider.getServiceByName(data.serviceName, data.scopeId);
			});
		};

		instancia.prototype = original.prototype;
		return instancia;
	};
}