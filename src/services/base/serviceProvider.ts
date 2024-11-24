import { ScopeKey } from "@utils/decorators/inject";
import { ServiceCollection } from "./serviceCollection";

export const ServiceProvider = {
	collection: new ServiceCollection(),
	getService<T>(serviceType: abstract new () => T, scopeId?: ScopeKey){
		const serviceName = serviceType.name;
		const serviceConstructor = this.collection.transientClasses.get(serviceName);
		if(serviceConstructor != null)
			return new serviceConstructor() as T;
        
		if(scopeId){
			return this.collection.scopeInstances.get(serviceName) as T; 
		}

		return this.collection.singletonInstances.get(serviceName) as T;
	},

	getServiceByName<T>(serviceName: string, scopeId?: ScopeKey){
		const ServiceConstructor = this.collection.transientClasses.get(serviceName);
		if(ServiceConstructor != null)
			return new ServiceConstructor() as T;
        
		if(scopeId){
			return this.collection.scopeInstances.get(scopeId)?.[serviceName] as T;
		}

		return this.collection.singletonInstances.get(serviceName) as T;
	}
};

