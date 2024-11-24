import React from "react";
import { ModelCreator } from "../models/creator";


export function useModel<T extends object>(valorInicial?: Partial<T>, inicializador?: new () => T) {
	const valorPadrao = 
		inicializador
			? ModelCreator.createModel(inicializador, valorInicial ?? {}) 
			: valorInicial ?? {} as T;
	
	const [modelValues, setModelValues] = React.useState(valorPadrao as T);
	const updateIndividualValues = (hook: T, newValues: Partial<T>) => {
		Object.keys(newValues).forEach(k => {
			hook[k as keyof T] = newValues[k as keyof T] as never;
		});

		Object.keys(hook).forEach(k => {
			if((typeof(hook[k as keyof T]) !== "function") && (k !== "values"))
				hook[k as keyof T] = newValues[k as keyof T] as never;
		});

		setProxyForArrayKeys();
	};

	const setProxyForArrayKeys = () => {
		Object.keys(modelValues).forEach(k => {
			if(Array.isArray(modelValues[k as keyof typeof modelValues])){
				modelValues[k as keyof Partial<T>] = new Proxy(modelValues[k as keyof Partial<T>]!, {
					set: function(target, property, value, _receiver) {
						target[property as keyof typeof target] = value;
						setModelValues(_ => modelValues);

						return true;
					},

					get(target, property, _receiver) {
						if(property === "isProxy")
							return true;

						return target[property as never];
					},
				});
			}			
		});
	};

	setProxyForArrayKeys();

	const hook = { 
		...modelValues,

		setValues(newValues: Partial<T>) {
			updateIndividualValues(this, newValues);
			setModelValues(_prev => newValues as T);
		}, 

		updateValue<K extends keyof typeof modelValues>(key: K, value: T[K] | undefined | null) {
			this[key] = value as never;
			updateIndividualValues(this, { ...this, [key]: value });
			setModelValues(prev => ({ ...prev, [key]: value }));
		}, 

		acceptChanges() {
			setModelValues({ ...this });
		},

		clear() {
			updateIndividualValues(this, valorPadrao);
			setModelValues(valorPadrao as T);
		}
	};

	const proxy = new Proxy(hook, {
		get(target, property) {
			return target[property as keyof T];
		},

		set(_target, property, value) {
			hook.updateValue(property as keyof T, value);
		  	return true;
		},
	});

	return proxy;
}