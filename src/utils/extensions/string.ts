import { Converte } from "../other/converte";

declare global {
	interface StringConstructor{
		readonly Empty: string;
	}

    interface String {
      toInt(): number;
      toDecimal(): number;
	  toNumberString(): string;
	  isNullOrEmpty(): boolean;
	  removeAll(...args: string[]): string;
    }
}

export function ConfigureStringExtensions(){
	String.prototype.toInt = function(){
		const value = String(this);
		return Converte.StringToInt(value);
	};

	String.prototype.toDecimal = function(){
		const value = String(this);
		return Converte.StringToDecimal(value);
	};

	String.prototype.toNumberString = function(){
		const value = String(this);
		const regex = /[a-zA-Z,.]/g;
		if(regex.test(value))
			return value.replace(/\D/g, "");

		return value;
	};

	String.prototype.removeAll = function(...args: string[]){
		let value = String(this);
		args.forEach(item => {
			value = value.replaceAll(item, "");
		});

		return value;
	};

	String.prototype.isNullOrEmpty = function (){
		return this == null || this.length === 0;
	};

	Object.defineProperty(String, "Empty", {
		value: ""
	});
}