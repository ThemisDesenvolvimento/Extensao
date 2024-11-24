declare global {
    interface Array<T> {
        last(): T; 
    }
}

export function ConfigureArrayExtensions(){
	Array.prototype.last = function <T>(){
		const lista = this as Array<T>;
		if(lista.length > 0)
			return lista[lista.length -1 ];
		else 
			return null;
	};
}