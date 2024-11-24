/* eslint-disable @typescript-eslint/no-unused-vars */

import { ScopeKey } from "@utils/decorators/inject";



type Constructor<T> = new () => T;
type AbstractConstructor<T> = abstract new () => T;

export class ServiceCollection{
    singletonInstances = new Map<string, object>();
    scopeInstances = new Map<ScopeKey, Record<string, object>>();
    transientClasses = new Map<string, new () => object>();
    private scopeClasses = new Map<ScopeKey, new () => object>();
    
    addSingleton<TInterface extends object>(serviceInterface: AbstractConstructor<TInterface>, serviceClass: Constructor<TInterface>){
    	const instancia = new serviceClass();
    	this.singletonInstances.set(serviceInterface.name, instancia);
    }

    addTransient<TInterface extends object>(serviceInterface: AbstractConstructor<TInterface>, serviceClass: Constructor<TInterface>){
    	this.transientClasses.set(serviceInterface.name, serviceClass);
    }

    addScoped<TInterface extends object>(serviceInterface: AbstractConstructor<TInterface>, serviceClass: Constructor<TInterface>){
    	this.scopeClasses.set(serviceInterface.name, serviceClass);
    }

    initScopeInstances(scopeId: ScopeKey){
    	const classes: Record<string, object> = {};
    	for (const iterator of this.scopeClasses) {
    		const [serviceName, ServiceConstructor] = iterator;
    		classes[serviceName] = new ServiceConstructor();
    	}

    	this.scopeInstances.set(scopeId, classes);
    }

    getScopeInstances(scopeId: ScopeKey){
    	return this.scopeInstances.get(scopeId);
    }
}