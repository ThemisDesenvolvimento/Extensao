/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";

interface InjectedServiceData{
	serviceName: string,
	scopeId?: ScopeKey;
}

const formatMetadataKey = Symbol("DependencyInjection");

function Inject<T>(serviceType: abstract new () => T) {
	const data: InjectedServiceData = {
		serviceName: serviceType.name
	};

	return Reflect.metadata(formatMetadataKey, data);
}

function InjectScoped<T>(scopeId: ScopeKey, serviceType: abstract new () => T) {
	const data: InjectedServiceData = {
		serviceName: serviceType.name,
		scopeId
	};


	return Reflect.metadata(formatMetadataKey, data);
}


function getInjectedServiceData<T extends object>(target: T, propertyKey: string): InjectedServiceData {
	return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export type ScopeKey = string | number;
export { Inject, InjectScoped, getInjectedServiceData };